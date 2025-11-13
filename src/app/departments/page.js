'use client';

import { useState, useEffect } from 'react';
import OtherHeroSection from "@/components/OtherHeroSection";
import { getDepartments } from '@/lib/firebase/departments';
import { Loader2, Building2, Stethoscope, Heart, Users } from 'lucide-react';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // For full-screen view
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    const loadDepartments = async () => {
      const result = await getDepartments();
      if (result.success) {
        setDepartments(result.data);
      }
      setLoading(false);
    };
    loadDepartments();
  }, []);

  // icon rotation
  const getIcon = (index) => {
    const icons = [Stethoscope, Heart, Users, Building2];
    const Icon = icons[index % icons.length];
    return <Icon className="w-6 h-6" />;
  };

  // ============================
  // CARD COMPONENT (INLINE)
  // ============================
  function DepartmentCard({ department, index }) {
    return (
      <div
        onClick={() => setSelectedDepartment(department)}
        className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-400 hover:-translate-y-2"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          {department.imageUrl ? (
            <img
              src={department.imageUrl}
              alt={department.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-indigo-200">
              <Building2 className="w-20 h-20 text-blue-400" />
            </div>
          )}

          {/* Icon badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full text-blue-600 shadow-lg">
            {getIcon(index)}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-[-20px] left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg text-center">
              {department.title}
            </h3>
          </div>
        </div>

        {/* Brief description */}
        <div className="p-6">
          {/* <p className="text-gray-600 leading-relaxed text-wrap line-clamp-2">
            {department.description}
          </p> */}

          <span className="text-blue-600 text-sm font-semibold mt-3 inline-block">
            View details →
          </span>
        </div>

        <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    );
  }

  // ============================
  // FULL-SCREEN MODAL
  // ============================
  const FullScreenView = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease] relative">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedDepartment(null)}
          className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white rounded-full px-3 py-1 text-sm"
        >
          ✕
        </button>

        {/* Image */}
        <div className="h-72 w-full overflow-hidden">
          {selectedDepartment.imageUrl ? (
            <img
              src={selectedDepartment.imageUrl}
              alt={selectedDepartment.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-indigo-300">
              <Building2 className="w-20 h-20 text-blue-500" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedDepartment.title}
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
            {selectedDepartment.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {selectedDepartment && <FullScreenView />}

      <OtherHeroSection title="Our Departments" imageUrl="/images/hero.jpg" />

      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Medical Departments
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert care across multiple specialties with state-of-the-art
              facilities and experienced medical professionals.
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading departments...</p>
            </div>
          ) : departments.length === 0 ? (
            /* Empty */
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg">
              <Building2 className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-500">No departments available</p>
              <p className="text-sm text-gray-400 mt-2">Check back later for updates</p>
            </div>
          ) : (
            /* Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((department, index) => (
                <DepartmentCard
                  key={department.id}
                  department={department}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
