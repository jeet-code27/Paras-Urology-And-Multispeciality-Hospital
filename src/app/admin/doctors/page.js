'use client';

import { useState, useEffect } from 'react';
import { Upload, Loader2, Trash2, Edit, Plus, X, Save, User } from 'lucide-react';
import { getDoctors, addDoctor, updateDoctor, deleteDoctor } from '@/lib/firebase/doctors';
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from '@/lib/cloudinary/upload';
import toast from 'react-hot-toast';

export default function DoctorManagementPanel() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    education: '',
    college: '',
    experience: '',
    expertise: '',
    achievements: '',
    about: '',
    timing: '',
    memberships: '',
    imageUrl: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    const result = await getDoctors();
    if (result.success) {
      setDoctors(result.data);
    } else {
      toast.error(result.error || 'Failed to load doctors');
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      toast.success('Image selected');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      education: '',
      college: '',
      experience: '',
      expertise: '',
      achievements: '',
      about: '',
      timing: '',
      memberships: '',
      imageUrl: ''
    });
    setImageFile(null);
    setImagePreview('');
    setEditingDoctor(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.education || !formData.college || 
        !formData.experience || !formData.expertise || !formData.timing || 
        !formData.achievements) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!editingDoctor && !imageFile && !formData.imageUrl) {
      toast.error('Please upload a doctor image');
      return;
    }

    setUploading(true);
    const uploadToast = toast.loading(editingDoctor ? 'Updating doctor...' : 'Adding doctor...');

    try {
      let imageUrl = formData.imageUrl;
      let oldImageUrl = editingDoctor?.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        toast.loading('Uploading new image...', { id: uploadToast });
        const uploadResult = await uploadToCloudinary(imageFile);
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload image');
        }
        
        imageUrl = uploadResult.url;

        // If updating and there's an old image, delete it from Cloudinary
        if (editingDoctor && oldImageUrl) {
          const oldPublicId = extractPublicId(oldImageUrl);
          if (oldPublicId) {
            toast.loading('Removing old image...', { id: uploadToast });
            const deleteResult = await deleteFromCloudinary(oldPublicId);
            if (!deleteResult.success) {
              console.warn('Failed to delete old image from Cloudinary:', deleteResult.error);
              // Continue anyway - we don't want to fail the update just because old image deletion failed
            }
          }
        }
      }

      // Prepare doctor data
      const doctorData = {
        name: formData.name.trim(),
        education: formData.education.trim(),
        college: formData.college.trim(),
        experience: formData.experience.trim(),
        expertise: formData.expertise.trim(),
        achievements: formData.achievements.trim(),
        about: formData.about.trim(),
        timing: formData.timing.trim(),
        memberships: formData.memberships
          .split('\n')
          .map(m => m.trim())
          .filter(m => m.length > 0),
        imageUrl
      };

      let result;
      if (editingDoctor) {
        result = await updateDoctor(editingDoctor.id, doctorData);
      } else {
        result = await addDoctor(doctorData);
      }

      if (result.success) {
        await loadDoctors();
        resetForm();
        toast.success(
          editingDoctor ? 'Doctor updated successfully!' : 'Doctor added successfully!',
          { id: uploadToast }
        );
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error saving doctor profile', { id: uploadToast });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name || '',
      education: doctor.education || '',
      college: doctor.college || '',
      experience: doctor.experience || '',
      expertise: doctor.expertise || '',
      achievements: doctor.achievements || '',
      about: doctor.about || '',
      timing: doctor.timing || '',
      memberships: Array.isArray(doctor.memberships) 
        ? doctor.memberships.join('\n') 
        : (doctor.memberships || ''),
      imageUrl: doctor.imageUrl || ''
    });
    setImagePreview(doctor.imageUrl || '');
    setShowForm(true);
  };

  const handleDelete = async (id, name, imageUrl) => {
    if (!confirm(`Are you sure you want to delete Dr. ${name}? This will also delete their image from Cloudinary.`)) {
      return;
    }

    const deleteToast = toast.loading('Deleting doctor...');
    
    try {
      // First, delete image from Cloudinary if it exists
      if (imageUrl) {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          toast.loading('Deleting image from Cloudinary...', { id: deleteToast });
          const cloudinaryResult = await deleteFromCloudinary(publicId);
          
          if (!cloudinaryResult.success) {
            console.warn('Failed to delete image from Cloudinary:', cloudinaryResult.error);
            // Continue with doctor deletion even if image deletion fails
          }
        }
      }

      // Then delete doctor from Firestore
      toast.loading('Deleting doctor profile...', { id: deleteToast });
      const result = await deleteDoctor(id);
      
      if (result.success) {
        await loadDoctors();
        toast.success('Doctor and image deleted successfully!', { id: deleteToast });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Error deleting doctor', { id: deleteToast });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
            <p className="text-gray-600 mt-2">Manage doctor profiles and information</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Doctor
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
                disabled={uploading}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education *
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="MBBS, MS"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="SMS Medical College, Jaipur"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="40+ Years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expertise *
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Laparoscopic Surgery, Hernia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timing *
                  </label>
                  <input
                    type="text"
                    name="timing"
                    value={formData.timing}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Monday to Saturday (10:00 AM - 01:00 PM)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements/Recognition *
                </label>
                <input
                  type="text"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Experience of doing more than 65000 procedures"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Doctor (Optional)
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  disabled={uploading}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Brief description about the doctor..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Memberships (Optional - One per line)
                </label>
                <textarea
                  name="memberships"
                  value={formData.memberships}
                  onChange={handleInputChange}
                  disabled={uploading}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  placeholder="Life Member of Association of Surgeons India&#10;Indian Medical Association&#10;Indian Society of Critical Care Medicine"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Image * {editingDoctor && '(Upload new to replace)'}
                </label>
                {imagePreview && (
                  <div className="mb-4 relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg border-2 border-blue-500"
                    />
                    {editingDoctor && imageFile && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Will Replace
                      </div>
                    )}
                  </div>
                )}
                <label className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {editingDoctor ? 'Click to upload new image' : 'Click to upload doctor image'}
                  </span>
                  <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                  {editingDoctor && (
                    <span className="text-xs text-yellow-600 mt-1">Old image will be deleted from Cloudinary</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={uploading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                    </>
                  )}
                </button>
                <button
                  onClick={resetForm}
                  disabled={uploading}
                  className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            All Doctors ({doctors.length})
          </h2>

          {doctors.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <User className="w-16 h-16 mb-4" />
              <p className="text-lg">No doctors added yet</p>
              <p className="text-sm">Click "Add Doctor" to create a profile</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    {doctor.imageUrl ? (
                      <img
                        src={doctor.imageUrl}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-20 h-20 text-blue-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-blue-600 mb-3">{doctor.education}</p>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p><span className="font-medium">College:</span> {doctor.college}</p>
                      <p><span className="font-medium">Experience:</span> {doctor.experience}</p>
                      <p><span className="font-medium">Expertise:</span> {doctor.expertise}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(doctor)}
                        className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id, doctor.name, doctor.imageUrl)}
                        className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}