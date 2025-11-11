'use client';
import React, { useState } from 'react';

import Image from 'next/image';

export default function HospitalAppointment() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Appointment request submitted!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"></div>
      
      {/* Background Image on left side */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 opacity-30 hidden lg:block">
        <Image
          src="/images/contact-form-bg.jpg"
          alt="Hospital Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-100/20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Form */}
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Book Your Appointment at The Best Private Hospital in Ajmer
            </h1>

            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-800/40 border border-blue-600/50 rounded text-white placeholder-blue-300/70 focus:outline-none focus:border-blue-400 transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-800/40 border border-blue-600/50 rounded text-white placeholder-blue-300/70 focus:outline-none focus:border-blue-400 transition"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-800/40 border border-blue-600/50 rounded text-white placeholder-blue-300/70 focus:outline-none focus:border-blue-400 transition"
              />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-800/40 border border-blue-600/50 rounded text-white focus:outline-none focus:border-blue-400 transition appearance-none cursor-pointer"
              >
                <option value="" className="bg-blue-900">Select Department*</option>
                <option value="cardiology" className="bg-blue-900">Cardiology</option>
                <option value="orthopedics" className="bg-blue-900">Orthopedics</option>
                <option value="neurology" className="bg-blue-900">Neurology</option>
                <option value="pediatrics" className="bg-blue-900">Pediatrics</option>
                <option value="general" className="bg-blue-900">General Medicine</option>
              </select>

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-blue-800/40 border border-blue-600/50 rounded text-white placeholder-blue-300/70 focus:outline-none focus:border-blue-400 transition resize-none"
              />

              <button
                onClick={handleSubmit}
                className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-900 transition duration-300 transform hover:scale-105"
              >
                Book An Appointment
              </button>
            </div>
          </div>

          {/* Right Column - Timeline and Info */}
          {/* Right Column - Google Map and Info */}
          <div className="w-full space-y-6">
            {/* Google Map */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.1680511603363!2d74.60461757488017!3d26.48253347844607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be73e8a3211ef%3A0x7ac5154a134f812e!2sDr%20Rajkumar%20Khasgiwala%20(Paras%20Urology%20And%20Multispeciality%20Hospital)%20-%20Urologist%20in%20Ajmer%2FKidney%20Stone%2FProstate%2FAndrologist!5e0!3m2!1sen!2sin!4v1762839093967!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Hospital Info */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Best Multi Speciality Hospital in Ajmer, Rajasthan
              </h2>

              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <span className="text-sm sm:text-base">
                    Empanelled with Chiranjeevi Swasthya Bima Yojana, RGHS, ESIC, CGHS, ECHS, Railways
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <span className="text-sm sm:text-base">
                    Cashless treatment for selected government & private schemes
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <span className="text-sm sm:text-base">
                    Latest technology and state-of-the-art infrastructure
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <span className="text-sm sm:text-base">
                    Affordable treatment & personalized care
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}