import React from 'react';
import { ArrowRight } from 'lucide-react';

// Simulate Next.js Link and Image components
const Link = ({ href, children, className = '' }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const Image = ({ src, alt, width, height, className = '' }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

const AboutSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="bg-white border-2 border-blue-200 rounded-lg p-8 lg:p-12">
            {/* Heading */}
            <h3 className="text-gray-800 text-xl font-bold mb-4 uppercase tracking-wide">
              About Our Hospital
            </h3>
            
            <h2 className="text-red-600 text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Paras Urology & Multispeciality Hospital
            </h2>

            {/* Content */}
            <div className="text-gray-700 leading-relaxed">
              <p>
                <span className="font-semibold">is committed to provide high-quality medical services in the field of different branches of medicine.</span> We focus on prompt diagnosis, standardized medical care with advanced medical technology, and efficient staff leading to a happy and healthy discharge to home. PUMH is an offshoot of Raj Uro Care Centre, which has a successful track record of over 10,000 urological procedures under the able guidance of Dr. Rajkumar Khasgiwala. Our Moto is to provide quality health care services as a Multispeciality Hospital with all leading branches of medicine like Urology, Nephrology, General Surgery, Laparoscopic & Laser Surgery, General Medicine, Orthopedics, Gynecology, Pediatrics, Neuro Surgery, Oncology, Dietitics & Physiotherapy etc.
              </p>
            </div>

            {/* Know More Link */}
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-blue-700 font-semibold mt-8 hover:gap-3 transition-all duration-300 group"
            >
              Know More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Image */}
          <div className="bg-white border-2 border-blue-200 rounded-lg overflow-hidden">
            <Image 
              src="/images/hospital-about.png" 
              alt="Hospital Overview" 
              width={600} 
              height={700}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;