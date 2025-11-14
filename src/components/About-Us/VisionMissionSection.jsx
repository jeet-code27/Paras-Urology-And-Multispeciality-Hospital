import Image from 'next/image';

export default function VisionMissionSection() {
  return (
    <section className="relative py-16 px-4 md:px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hospital-about.jpg"
          alt="Hospital Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* White Overlay */}
      <div className="absolute inset-0 bg-white/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Vision, Mission & Values */}
          <div className="space-y-8">
            
            {/* Our Vision */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To be a leading multispeciality healthcare provider, delivering world-class medical services with compassion and excellence, while making quality healthcare accessible to all.
              </p>
            </div>

            {/* Our Mission */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To provide high-quality medical services through prompt diagnosis, standardized medical care with advanced medical technology, and efficient staff, ensuring a happy and healthy discharge to home for every patient.
              </p>
            </div>

            {/* Our Values */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Patient Centric:</span>
                    <span className="text-gray-700"> Putting the individual patient and their family at the center of our mission is our utmost priority.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Excellence:</span>
                    <span className="text-gray-700"> Striving for world-class standards in everything we do, from skill and technology to programs and services.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Integrity:</span>
                    <span className="text-gray-700"> We uphold an unwavering code of ethics, prioritizing complete honesty, transparency, and sincerity.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Compassion:</span>
                    <span className="text-gray-700"> We warmly welcome everyone with kindness and dedication to their health and well-being.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Accountability:</span>
                    <span className="text-gray-700"> Taking full ownership of our work and being responsible for the services we provide.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Teamwork:</span>
                    <span className="text-gray-700"> Building system effectiveness through the collective strength and cultural diversity of everyone, fostering open communication.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Book Appointment Button */}
            <div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition-colors duration-300">
                Book Appointment
              </button>
            </div>

          </div>

          {/* Right Side - Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left - 33 Years Badge with Surgery Image */}
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/billing-counter.jpg"
                  alt="Billing Counter  "
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute top-4 left-4 w-20 h-20">
                  <Image
                    src="/images/33-years-badge.png"
                    alt="33 Years"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div> */}
              </div>

              {/* Top Right - Hospital Facility */}
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/hospital-facility.jpg"
                  alt="Hospital Facility"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Left - Medical Equipment */}
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/medical-equipments.jpg"
                  alt="Medical Equipment"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Right - Hospital Building */}
              <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/hospital-about.jpg"
                  alt="Hospital Building"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}