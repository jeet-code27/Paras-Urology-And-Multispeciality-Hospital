import Image from 'next/image';
import { UserCheck, Wrench, Phone } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Image */}
          <div className="relative w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/hospital-img.png"
              alt="hospital image"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                About Paras Urology & Multispeciality Hospital
              </h2>
              <div className="w-20 h-1 bg-blue-600"></div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We are committed to provide high-quality medical services in the field of different branches of medicine. We focus on prompt diagnosis, standardized medical care with advanced medical technology, and efficient staff leading to a happy and healthy discharge to home.
              </p>
              <p>
                PUMH is an offshoot of Raj Uro Care Centre, which has a successful track record of over 10,000 urological procedures under the able guidance of Dr. Rajkumar Khasgiwala. Our motto is to provide quality health care services as a Multispeciality Hospital with all leading branches of medicine like Urology, Nephrology, General Surgery, Laparoscopic & Laser Surgery, General Medicine, Orthopedics, Gynecology, Pediatrics, Neuro Surgery, Oncology, Dietetics & Physiotherapy.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              
              {/* Qualified Medical Team */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Qualified Medical Team
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our expert team is led by experienced professionals dedicated to providing exceptional patient care across multiple specialties.
                  </p>
                </div>
              </div>

              {/* World Class Facilities */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Wrench className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Advanced Medical Technology
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our state-of-the-art facilities with advanced medical technology ensure prompt diagnosis and standardized care.
                  </p>
                </div>
              </div>

            </div>

            {/* Emergency Call Banner */}
            <div className="bg-blue-600 rounded-lg overflow-hidden shadow-lg mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side */}
                <div className="flex items-center justify-center gap-3 p-6 bg-blue-700">
                  <Phone className="w-6 h-6 text-white" />
                  <span className="text-white text-lg font-semibold">
                    Any Emergency? Call Now!
                  </span>
                </div>
                
                {/* Right Side */}
                <div className="flex items-center justify-center p-6 bg-blue-600">
                  <a 
                    href="tel:+919521894263"
                    className="text-white text-2xl font-bold hover:underline"
                  >
                    +91-95218-94263
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}