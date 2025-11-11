'use client';   
import { useState, useEffect } from 'react';
import { Upload, Loader2, Trash2, Edit, Plus, X, Save, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { getEmpanelments, addEmpanelment, updateEmpanelment, deleteEmpanelment } from '@/lib/firebase/empanelments';
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from '@/lib/cloudinary/upload';
import toast from 'react-hot-toast';

export default function EmpanelmentsAdminPanel() {
  const [empanelments, setEmpanelments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('government');
  const [lightboxImage, setLightboxImage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'government',
    imageUrl: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadEmpanelments();
  }, []);

  const loadEmpanelments = async () => {
    setLoading(true);
    const result = await getEmpanelments();
    if (result.success) {
      setEmpanelments(result.data);
    } else {
      toast.error(result.error || 'Failed to load empanelments');
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
      toast.success('Logo selected');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'government',
      imageUrl: ''
    });
    setImageFile(null);
    setImagePreview('');
    setEditingItem(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!editingItem && !imageFile && !formData.imageUrl) {
      toast.error('Please upload a logo image');
      return;
    }

    setUploading(true);
    const uploadToast = toast.loading(editingItem ? 'Updating empanelment...' : 'Adding empanelment...');

    try {
      let imageUrl = formData.imageUrl;
      let oldImageUrl = editingItem?.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        toast.loading('Uploading new logo...', { id: uploadToast });
        const uploadResult = await uploadToCloudinary(imageFile);
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload logo');
        }
        
        imageUrl = uploadResult.url;

        // If updating and there's an old image, delete it from Cloudinary
        if (editingItem && oldImageUrl) {
          const oldPublicId = extractPublicId(oldImageUrl);
          if (oldPublicId) {
            toast.loading('Removing old logo...', { id: uploadToast });
            const deleteResult = await deleteFromCloudinary(oldPublicId);
            if (!deleteResult.success) {
              console.warn('Failed to delete old logo from Cloudinary:', deleteResult.error);
              // Continue anyway
            }
          }
        }
      }

      // Prepare empanelment data
      const empanelmentData = {
        name: formData.name.trim(),
        category: formData.category,
        imageUrl
      };

      let result;
      if (editingItem) {
        result = await updateEmpanelment(editingItem.id, empanelmentData);
      } else {
        result = await addEmpanelment(empanelmentData);
      }

      if (result.success) {
        await loadEmpanelments();
        resetForm();
        toast.success(
          editingItem ? 'Empanelment updated successfully!' : 'Empanelment added successfully!',
          { id: uploadToast }
        );
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error saving empanelment', { id: uploadToast });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || 'government',
      imageUrl: item.imageUrl || ''
    });
    setImagePreview(item.imageUrl || '');
    setShowForm(true);
  };

  const handleDelete = async (id, name, imageUrl) => {
    if (!confirm(`Are you sure you want to delete ${name}? This will also delete their logo from Cloudinary.`)) {
      return;
    }

    const deleteToast = toast.loading('Deleting empanelment...');
    
    try {
      // First, delete image from Cloudinary if it exists
      if (imageUrl) {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          toast.loading('Deleting logo from Cloudinary...', { id: deleteToast });
          const cloudinaryResult = await deleteFromCloudinary(publicId);
          
          if (!cloudinaryResult.success) {
            console.warn('Failed to delete logo from Cloudinary:', cloudinaryResult.error);
            // Continue with empanelment deletion even if image deletion fails
          }
        }
      }

      // Then delete empanelment from Firestore
      toast.loading('Deleting empanelment...', { id: deleteToast });
      const result = await deleteEmpanelment(id);
      
      if (result.success) {
        await loadEmpanelments();
        toast.success('Empanelment and logo deleted successfully!', { id: deleteToast });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Error deleting empanelment', { id: deleteToast });
    }
  };

  const getCategoryEmpanelments = (category) => {
    return empanelments.filter(item => item.category === category);
  };

  const categories = [
    { id: 'government', name: 'Government Insurance & TPAs', color: 'blue' },
    { id: 'private', name: 'Private Insurance Companies', color: 'green' },
    { id: 'corporate', name: 'Corporate Empanelments', color: 'purple' }
  ];

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
            <h1 className="text-3xl font-bold text-gray-800">Empanelments Management</h1>
            <p className="text-gray-600 mt-2">Manage insurance companies, TPAs, and corporate empanelments</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Empanelment
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editingItem ? 'Edit Empanelment' : 'Add New Empanelment'}
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
                    Company/Organization Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="government">Government Insurance & TPAs</option>
                    <option value="private">Private Insurance Companies</option>
                    <option value="corporate">Corporate Empanelments</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Image * {editingItem && '(Upload new to replace)'}
                </label>
                {imagePreview && (
                  <div className="mb-4 relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-40 h-40 object-contain rounded-lg border-2 border-blue-500 bg-white p-2 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setLightboxImage({ url: imagePreview, name: 'Preview' })}
                    />
                    <button
                      onClick={() => setLightboxImage({ url: imagePreview, name: 'Preview' })}
                      className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition-colors"
                      title="View full size"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    {editingItem && imageFile && (
                      <div className="absolute bottom-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Will Replace
                      </div>
                    )}
                  </div>
                )}
                <label className="flex flex-col items-center justify-center h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {editingItem ? 'Click to upload new logo' : 'Click to upload logo'}
                  </span>
                  <span className="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</span>
                  {editingItem && (
                    <span className="text-xs text-yellow-600 mt-1">Old logo will be deleted from Cloudinary</span>
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
                      {editingItem ? 'Update Empanelment' : 'Add Empanelment'}
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

        {/* Tabbed View */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {categories.map((cat) => {
              const count = getCategoryEmpanelments(cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                    activeTab === cat.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {categories.map((cat) => {
              if (activeTab !== cat.id) return null;
              
              const items = getCategoryEmpanelments(cat.id);
              
              return (
                <div key={cat.id}>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    {cat.name}
                  </h2>

                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <ImageIcon className="w-16 h-16 mb-4" />
                      <p className="text-lg">No empanelments added yet</p>
                      <p className="text-sm">Click "Add Empanelment" to create one</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {items.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                          <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 relative group">
                            {item.imageUrl ? (
                              <>
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-contain cursor-pointer"
                                  onClick={() => setLightboxImage({ url: item.imageUrl, name: item.name })}
                                />
                                <button
                                  onClick={() => setLightboxImage({ url: item.imageUrl, name: item.name })}
                                  className="absolute top-2 right-2 bg-blue-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700"
                                  title="View full size"
                                >
                                  <ZoomIn className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <ImageIcon className="w-12 h-12 text-gray-300" />
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-medium text-gray-800 mb-3 line-clamp-2 min-h-[2.5rem]">
                              {item.name}
                            </h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="flex-1 bg-blue-50 text-blue-600 py-1.5 rounded font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 text-xs"
                              >
                                <Edit className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.id, item.name, item.imageUrl)}
                                className="flex-1 bg-red-50 text-red-600 py-1.5 rounded font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-1 text-xs"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={lightboxImage.url}
              alt={lightboxImage.name}
              className="max-w-full max-h-[80vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-lg mt-4 text-center">{lightboxImage.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}