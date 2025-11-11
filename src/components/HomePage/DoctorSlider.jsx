'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { User, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDoctors } from '@/lib/firebase/doctors';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

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

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading doctors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No doctors available at the moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Meet Doctors from Top Hospital of Ajmer
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Slider */}
        <div className="relative px-12">
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
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="doctors-swiper"
          >
            {doctors.map((doctor) => (
              <SwiperSlide key={doctor.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-blue-600 hover:shadow-xl transition-shadow duration-300">
                  <Link
                   href={`/doctors/${doctor.slug}`}
                  className="block"
                  >

                  
                  
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
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {doctor.name}
                    </h3>
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
                </div>
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
        </div>
      </div>

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
    </div>
  );
}