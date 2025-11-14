'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDoctors } from '@/lib/firebase/doctors';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-gray-200 animate-pulse">
    {/* Image Skeleton */}
    <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-100" />
    
    {/* Info Skeleton */}
    <div className="p-6 text-center space-y-3">
      {/* Name */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
      {/* Education */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      {/* Expertise */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto" />
      </div>
    </div>
  </div>
);

export default function DoctorsSlider() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    const result = await getDoctors();
    if (result.success) {
      setDoctors(result.data);
    } else {
      console.error('Failed to load doctors:', result.error);
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Meet Doctors from Top Hospital of Ajmer
          </h2>
          <motion.div
            className="w-24 h-1 bg-blue-600 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Slider / Skeleton Loader */}
        {loading ? (
          // Skeleton Loading State
          <motion.div
            className="relative px-12"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </motion.div>
        ) : doctors.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No doctors available at the moment</p>
          </div>
        ) : (
          // Actual Slider
          <motion.div
            className="relative px-12"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-custom',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={doctors.length > 3}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="doctors-swiper"
            >
              {doctors.map((doctor, i) => (
                <SwiperSlide key={doctor.id}>
                  <motion.div
                    className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-blue-600 hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/doctors/${doctor.slug}`} className="block">
                      {/* Doctor Image */}
                      <div className="relative h-80 bg-gradient-to-br from-blue-100 to-blue-50">
                        {doctor.imageUrl ? (
                          <img
                            src={doctor.imageUrl}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-32 h-32 text-blue-300" />
                          </div>
                        )}
                      </div>

                      {/* Doctor Info */}
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium text-sm mb-3">
                          {doctor.education}
                        </p>
                        {doctor.expertise && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {doctor.expertise}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 group">
              <ChevronLeft className="w-6 h-6 text-blue-600 group-hover:text-white" />
            </button>
            <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 group">
              <ChevronRight className="w-6 h-6 text-blue-600 group-hover:text-white" />
            </button>

            {/* Custom Pagination */}
            <div className="swiper-pagination-custom mt-8 flex justify-center gap-2"></div>
          </motion.div>
        )}
      </div>

      {/* Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 6px;
          background: #2563eb;
        }

        .doctors-swiper {
          padding-bottom: 20px;
        }
      `}</style>
    </section>
  );
}