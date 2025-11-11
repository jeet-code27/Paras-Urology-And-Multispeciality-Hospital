'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Career', href: '/career' },
    { name: 'News Media', href: '/news' },
    { name: 'Contact us', href: '/contact' },
    { name: 'Photo Gallery', href: '/gallery/photos' },
    { name: 'Video Gallery', href: '/gallery/videos' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg inline-block">
              <div className="relative w-48 h-16">
                <Image
                  src="/images/logo.jpg"
                  alt="Paras Hospital Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              We have been dedicated to providing exceptional healthcare since 2000 . Our premiere, multi-specialty tertiary care hospital is renowned for its medical excellence, compassionate healthcare workers, and a dedicated team of consultants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="mr-2 text-yellow-400">⚬</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              <a 
                href="tel:+919521894263" 
                className="flex items-start space-x-3 text-blue-100 hover:text-white transition-colors duration-200 group"
              >
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-400" />
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                  +91-95218-94263
                </span>
              </a>
              
              <a 
                href="mailto:relationship@parashospital.com" 
                className="flex items-start space-x-3 text-blue-100 hover:text-white transition-colors duration-200 group"
              >
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-400" />
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200 break-all">
                  relationship@parashospital.com
                </span>
              </a>
              
              <div className="flex items-start space-x-3 text-blue-100">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-400" />
                <span className="text-sm">
                  Calgiri Road, Malviya Nagar, Jaipur, Rajasthan - 302017
                </span>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="bg-blue-700/50 hover:bg-yellow-400 p-2.5 rounded-full transition-all duration-300 hover:scale-110 group"
                      >
                        <Icon className="w-5 h-5 text-white group-hover:text-blue-900" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-950/50 border-t border-blue-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start space-x-2 text-yellow-300">
            <span className="text-lg font-bold flex-shrink-0">⚠</span>
            <p className="text-xs sm:text-sm leading-relaxed">
              <span className="font-semibold">Disclaimer:</span> The information on the Website is provided for informational purposes only and is not meant to substitute the advice provided by our doctor or other health care professional. You should not use the information available on or through the Web Site for treating a health problem or disease or prescribing any medication. All images used on this website are for illustrative purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-blue-950 border-t border-blue-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-blue-200">
            Copyright © {currentYear} Paras Hospital. All Rights Reserved
          </p>
        </div>
      </div>

      {/* Fixed Action Buttons - WhatsApp Left, Call Right */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href="https://wa.me/919521894263"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        <a
          href="tel:+919521894263"
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Call"
        >
          <Phone className="w-6 h-6" />
        </a>
        
        <Link
          href="/appointment"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 text-sm font-semibold text-center whitespace-nowrap"
        >
          Book Appointment
        </Link>
      </div>
    </footer>
  );
}