'use client';

import DepartmentsSlider from '@/components/HomePage/DepartmentsSlider';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle, Stethoscope, Heart, Shield } from 'lucide-react';

export default function BookConsultationPage() {
  const handleCall = () => {
    window.location.href = "tel:+919521894263";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Book Your Consultation</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Expert Medical Care is Just a Phone Call Away
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-lg mb-6">Call us now to schedule your appointment</p>
              <button 
                onClick={handleCall}
                className="bg-white text-blue-600 px-12 py-5 rounded-full text-2xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl"
              >
                📞 +91-95218-94263
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Why Choose Us Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive healthcare services with experienced medical professionals dedicated to your wellbeing
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Doctors</h3>
              <p className="text-gray-600">
                Highly qualified and experienced medical professionals across all specialties
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Personalized Care</h3>
              <p className="text-gray-600">
                Individualized treatment plans tailored to your specific health needs
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                State-of-the-art facilities with the highest standards of medical care
              </p>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-12 text-white mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Book Your Consultation?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Our friendly staff is available to help you schedule an appointment at your convenience
              </p>
              
              <button 
                onClick={handleCall}
                className="bg-white text-blue-600 px-12 py-5 rounded-full text-2xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
              >
                Call Now: +91-95218-94263
              </button>
              <p className="text-blue-200 mt-6">Available Monday to Saturday, 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Information Cards */}
         <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* 24/7 Availability */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Availability</h3>
              </div>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <div className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full mb-4">
                    <span className="text-3xl font-bold">24/7</span>
                  </div>
                  <p className="text-gray-600 text-lg font-medium">Open All Day, Every Day</p>
                  <p className="text-gray-500 mt-2">We're here for you around the clock</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Contact Information</h3>
              </div>
              <div className="space-y-5">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">Appointments & Emergencies</p>
                  <p className="text-2xl font-bold text-gray-800">+91-95218-94263</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">Email</p>
                  <a 
                    href="mailto:parasurologyhospital@gmail.com" 
                    className="text-lg font-semibold text-blue-600 hover:text-blue-700"
                  >
                    parasurologyhospital@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Departments Section */}
         <DepartmentsSlider/>

          {/* Emergency Section */}
          <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-2xl p-10 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">24/7 Emergency Services</h3>
              <p className="text-xl text-red-100 mb-6">
                For medical emergencies, call us immediately or visit our emergency department
              </p>
              <button 
                onClick={handleCall}
                className="bg-white text-red-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-red-50 transition-all transform hover:scale-105 shadow-xl"
              >
                Emergency: +91-95218-94263
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "How do I book a consultation?",
                  a: "Simply call us at +91-95218-94263 and our staff will help you schedule an appointment at your preferred time."
                },
                {
                  q: "Can I choose my doctor?",
                  a: "Yes, you can request a specific doctor when booking. We'll do our best to accommodate your preference."
                },
                {
                  q: "What should I bring to my appointment?",
                  a: "Please bring your ID, insurance card, and any relevant medical records or test results."
                },
                {
                  q: "Do you accept walk-ins?",
                  a: "While we accept walk-ins, scheduled appointments are prioritized. We recommend calling ahead to ensure availability."
                },
                {
                  q: "How far in advance should I book?",
                  a: "We recommend booking at least 1-2 weeks in advance for routine appointments, but we can often accommodate urgent requests."
                },
                {
                  q: "Can I reschedule my appointment?",
                  a: "Yes, please call us at least 24 hours before your scheduled appointment to reschedule without any charges."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Don't Wait - Book Your Consultation Today
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step towards better health. Our medical team is ready to assist you.
            </p>
            <button 
              onClick={handleCall}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-12 py-5 rounded-full text-2xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105 shadow-2xl"
            >
              📞 Call +91-95218-94263
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}