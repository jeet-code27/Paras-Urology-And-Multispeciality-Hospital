'use client';

import { useState, useEffect } from 'react';
import { User, Clock, Award, BookOpen, Users, ArrowRight } from 'lucide-react';
import { getDoctors } from '@/lib/firebase/doctors';
import Link from 'next/link';
import OtherHeroSection from '@/components/OtherHeroSection';

// Skeleton Card Component
const DoctorCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full animate-pulse">
    <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-400/70 to-transparent p-4">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>

    <div className="p-6">
      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded mt-1 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded mt-1 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded mt-1 flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="h-5 bg-gray-300 rounded w-40"></div>
      </div>
    </div>
  </div>
);

export default function AllDoctorsPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section - Always visible */}
      <OtherHeroSection title={'Our Doctors'} imageUrl={'/images/hero.jpg'} />

      {/* Doctors Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <>
            {/* Loading State */}
            <div className="text-center mb-12">
              <div className="h-9 bg-gray-300 rounded w-80 mx-auto mb-3 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))}
            </div>
          </>
        ) : doctors.length === 0 ? (
          <div className="text-center py-20">
            <User className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No doctors available at the moment</p>
            <p className="text-gray-400 mt-2">Please check back later</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Expert Medical Professionals
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our doctors bring years of experience and expertise to ensure you receive the best possible care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <Link
                  key={doctor.id}
                  href={`/doctors/${doctor.slug}`}
                  className="block"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full">
                    <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200">
                      {doctor.imageUrl ? (
                        <img
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-24 h-24 text-blue-400" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-2xl font-bold text-white">{doctor.name}</h3>
                        <p className="text-blue-200">{doctor.education}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">College</p>
                            <p className="font-medium text-gray-800 line-clamp-2">{doctor.college}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Experience</p>
                            <p className="font-medium text-gray-800">{doctor.experience}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Expertise</p>
                            <p className="font-medium text-gray-800 line-clamp-2">{doctor.expertise}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between text-blue-600 font-semibold group">
                          <span>View Full Profile</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      {!loading && doctors.length > 0 && (
        <div className="bg-blue-600 text-white py-16 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need to Book an Appointment?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our friendly staff is ready to help you schedule a consultation with any of our expert doctors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Book Appointment
              </button>
              <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}