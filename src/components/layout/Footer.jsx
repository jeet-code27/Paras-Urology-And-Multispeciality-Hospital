"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Doctors", href: "/doctors" },
    { name: "Departments", href: "/departments" },
    { name: "Empanelments", href: "/our-empanelment" },
    { name: "Contact Us", href: "/contact" },
    { name: "Gallery", href: "/gallery" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/PUMHAJMER/", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UC3Oq_C_ae5qQqiflY0h30Kw", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-[#002b4a] via-[#002b4a] to-[#002b4a] text-white">
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Company Info */}
          <div>
            <div className="bg-white backdrop-blur-md p-4 rounded-xl w-fit mb-6">
              <div className="relative w-60 h-16">
                <Image
                  src="/images/logo.jpg"
                  alt="Paras Hospital Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-blue-100 text-sm leading-relaxed">
              At Paras Urology and Multispeciality Hospital, We are committed to provide high-quality medical services in the field of different branches of medicine. We focus on prompt diagnosis, standardized medical care with advanced medical technology, and efficient staff leading to a happy and healthy discharge to home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white border-b border-blue-600/50 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-100 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white border-b border-blue-600/50 pb-2">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+919521894263"
                className="flex items-start gap-3 text-blue-100 hover:text-yellow-400 transition-colors duration-300"
              >
                <Phone className="w-5 h-5 mt-0.5 text-yellow-400" />
                <span className="text-sm">+91-95218-94263</span>
              </a>

              <a
                href="mailto:relationship@parashospital.com"
                className="flex items-start gap-3 text-blue-100 hover:text-yellow-400 transition-colors duration-300 break-all"
              >
                <Mail className="w-5 h-5 mt-0.5 text-yellow-400" />
                <span className="text-sm">relationship@parashospital.com</span>
              </a>

              <div className="flex items-start gap-3 text-blue-100">
                <MapPin className="w-5 h-5 mt-0.5 text-yellow-400" />
                <span className="text-sm">
                  C BLOCK, Pushkar Rd, Haribhau Upadhyay Nagar, Ajmer, Rajasthan 305001
                </span>
              </div>

              <div className="pt-4">
                <h4 className="text-lg font-semibold mb-3 text-white">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-yellow-400 p-2.5 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                      >
                        <Icon className="w-5 h-5 text-white hover:text-blue-900 transition-colors" />
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
      <div className="bg-blue-950/70 border-t border-blue-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-start gap-3 text-yellow-300 text-xs sm:text-sm leading-relaxed">
            <span className="text-lg font-bold">⚠</span>
            <p>
              <span className="font-semibold">Disclaimer:</span> Information on
              this website is for educational purposes only and not a
              replacement for professional medical advice. Please consult a
              doctor before making healthcare decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-blue-950 border-t border-blue-800/60 text-center py-4">
        <p className="text-sm text-blue-200">
          © {currentYear} Paras Hospital. All Rights Reserved.
        </p>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href="https://wa.me/919521894263"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.051 23.99h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.87 9.87 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z" />
          </svg>
        </a>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        <a
          href="tel:+919521894263"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Call"
        >
          <Phone className="w-6 h-6" />
        </a>

        <Link
          href="/appointment"
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 text-sm font-semibold text-center whitespace-nowrap"
        >
          Book Appointment
        </Link>
      </div>
    </footer>
  );
}
