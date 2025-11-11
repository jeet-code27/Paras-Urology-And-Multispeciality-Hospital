'use client';
import { useState, useEffect } from 'react';
import { Shield, Building2, Users, ZoomIn, X } from 'lucide-react';
import { getEmpanelments } from '@/lib/firebase/empanelments';
import OtherHeroSection from '@/components/OtherHeroSection';

// Skeleton Components
const EmpanelmentCardSkeleton = () => (
  <div className="group border border-gray-200 rounded-lg p-4 bg-white animate-pulse">
    <div className="aspect-square flex items-center justify-center bg-gray-200 rounded"></div>
    <div className="mt-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
  </div>
);

const CategorySkeleton = () => (
  <div>
    <div className="h-9 bg-gray-300 rounded w-96 mb-8 animate-pulse"></div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {[...Array(12)].map((_, index) => (
        <EmpanelmentCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default function EmpanelmentsPage() {
  const [empanelments, setEmpanelments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    loadEmpanelments();
  }, []);

  const loadEmpanelments = async () => {
    setLoading(true);
    const result = await getEmpanelments();
    if (result.success) {
      setEmpanelments(result.data);
    } else {
      console.error('Failed to load empanelments:', result.error);
    }
    setLoading(false);
  };

  const getCategoryEmpanelments = (category) => {
    return empanelments.filter(item => item.category === category);
  };

  const categories = [
    {
      id: 'government',
      title: 'Government Insurance Companies and TPAs',
      icon: Shield,
    },
    {
      id: 'private',
      title: 'Private Insurance Companies',
      icon: Building2,
    },
    {
      id: 'corporate',
      title: 'Corporate Empanelments',
      icon: Users,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section - Always visible */}
      <OtherHeroSection title={'Our Empanelments'} imageUrl={'/images/hero.jpg'} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {loading ? (
          /* Loading State - Show skeletons for all categories */
          <div className="space-y-16">
            {categories.map((category) => (
              <CategorySkeleton key={category.id} />
            ))}
          </div>
        ) : empanelments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <Shield className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No empanelments available at the moment</p>
            <p className="text-gray-400 mt-2">Please check back later</p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => {
              const items = getCategoryEmpanelments(category.id);
              if (items.length === 0) return null;
              
              return (
                <div key={category.id}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    {category.title}
                  </h2>

                  {/* Logo Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="group border border-gray-200 rounded-lg p-4 hover:shadow-xl hover:border-blue-300 transition-all duration-300 bg-white relative"
                        title={item.name}
                      >
                        <div className="aspect-square flex items-center justify-center cursor-pointer" onClick={() => setLightboxImage({ url: item.imageUrl, name: item.name })}>
                          {item.imageUrl ? (
                            <>
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/200x200/F0F0F0/AAAAAA?text=Image+Not+Found`; }}
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLightboxImage({ url: item.imageUrl, name: item.name });
                                }}
                                className="absolute top-2 right-2 bg-blue-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700"
                                title="View full size"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-center mt-3 text-gray-700 font-medium line-clamp-2">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        {!loading && empanelments.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Have Questions About Insurance Coverage?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Our team is here to help you understand your insurance benefits and cashless hospitalization process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Contact Insurance Desk
                </button>
                <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors border-2 border-white">
                  View All Services
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trust Indicators */}
      {!loading && empanelments.length > 0 && (
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {getCategoryEmpanelments('government').length}+
                </div>
                <p className="text-gray-700 font-medium">Government Insurance & TPAs</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {getCategoryEmpanelments('private').length}+
                </div>
                <p className="text-gray-700 font-medium">Private Insurance Companies</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {getCategoryEmpanelments('corporate').length}+
                </div>
                <p className="text-gray-700 font-medium">Corporate Partners</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/70 bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
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