'use client';
import { useState, useEffect } from 'react';
import { Camera, ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getGalleries } from '@/lib/firebase/galleries';

export default function GallerySlider() {
  const [galleries, setGalleries] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState(null);

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    const result = await getGalleries();
    if (result.success) {
      // Filter to only show galleries with images
      const galleriesWithImages = result.data.filter(
        gallery => gallery.images && gallery.images.length > 0
      );
      setGalleries(galleriesWithImages);
    } else {
      console.error('Failed to load galleries:', result.error);
    }
  };

  const openLightbox = (gallery, imageIndex) => {
    setCurrentGallery(gallery);
    setLightboxIndex(imageIndex);
    setLightboxImage({
      url: gallery.images[imageIndex].url,
      title: gallery.title,
      date: gallery.date
    });
  };

  const nextImage = () => {
    if (currentGallery && currentGallery.images) {
      const newIndex = (lightboxIndex + 1) % currentGallery.images.length;
      setLightboxIndex(newIndex);
      setLightboxImage({
        url: currentGallery.images[newIndex].url,
        title: currentGallery.title,
        date: currentGallery.date
      });
    }
  };

  const prevImage = () => {
    if (currentGallery && currentGallery.images) {
      const newIndex = (lightboxIndex - 1 + currentGallery.images.length) % currentGallery.images.length;
      setLightboxIndex(newIndex);
      setLightboxImage({
        url: currentGallery.images[newIndex].url,
        title: currentGallery.title,
        date: currentGallery.date
      });
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setCurrentGallery(null);
    setLightboxIndex(0);
  };

  // Get all images from all galleries for the slider
  const allImages = galleries.flatMap(gallery => 
    gallery.images.map(image => ({
      ...image,
      galleryTitle: gallery.title,
      galleryDate: gallery.date,
      galleryId: gallery.id,
      gallery: gallery
    }))
  );

  if (allImages.length === 0) {
    return null; // Return nothing if no gallery images
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-10 text-center">
          Gallery Highlights
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-2"></div>
        </h2>

        {/* Slider Container */}
        <div className="relative bg-white rounded-xl shadow-lg p-4 md:p-8">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={15}
            slidesPerView={1}
            navigation={{
              prevEl: '.gallery-swiper-button-prev',
              nextEl: '.gallery-swiper-button-next',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={allImages.length > 4}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
            className="gallery-swiper"
          >
            {allImages.map((image, index) => {
              const imageIndexInGallery = image.gallery.images.findIndex(img => img.url === image.url);
              
              return (
                <SwiperSlide key={`${image.galleryId}-${index}`}>
                  <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 bg-white h-full">
                    <div 
                      className="aspect-[4/3] relative cursor-pointer overflow-hidden"
                      onClick={() => openLightbox(image.gallery, imageIndexInGallery)}
                    >
                      <img
                        src={image.url}
                        alt={image.galleryTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/400x300/F0F0F0/AAAAAA?text=Image+Not+Found`;
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                          <p className="text-xs md:text-sm font-semibold line-clamp-2">
                            {image.galleryTitle}
                          </p>
                          <p className="text-[10px] md:text-xs text-gray-300 mt-1">
                            {new Date(image.galleryDate).toLocaleDateString('en-IN', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      {/* Zoom Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(image.gallery, imageIndexInGallery);
                        }}
                        className="absolute top-2 right-2 bg-blue-600 text-white p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700 z-10"
                        title="View full size"
                      >
                        <ZoomIn className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="gallery-swiper-button-prev absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <button className="gallery-swiper-button-next absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-blue-600 text-white p-1.5 md:p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-6 md:mt-8">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Camera className="w-5 h-5" />
            View Full Gallery
          </a>
        </div>
      </div>

      {/* Lightbox Modal with Navigation */}
      {lightboxImage && currentGallery && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          {currentGallery.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next Button */}
          {currentGallery.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image Counter */}
          {currentGallery.images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full z-50">
              {lightboxIndex + 1} / {currentGallery.images.length}
            </div>
          )}

          {/* Image */}
          <div className="max-w-7xl max-h-[90vh] flex flex-col items-center">
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-w-full max-h-[80vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-center mt-4 px-4">
              <p className="text-white text-lg font-medium">{lightboxImage.title}</p>
              <p className="text-gray-300 text-sm mt-1">
                {new Date(lightboxImage.date).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Keyboard Navigation Hint */}
          {currentGallery.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
              Use arrow keys to navigate
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .gallery-swiper {
          padding: 15px 40px 40px;
        }
        
        .gallery-swiper .swiper-pagination {
          bottom: 10px;
        }
        
        .gallery-swiper .swiper-pagination-bullet {
          background: #2563eb;
          opacity: 0.5;
        }
        
        .gallery-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .gallery-swiper {
            padding: 10px 30px 35px;
          }
          
          .gallery-swiper .swiper-pagination {
            bottom: 5px;
          }
        }
      `}</style>
    </div>
  );
}