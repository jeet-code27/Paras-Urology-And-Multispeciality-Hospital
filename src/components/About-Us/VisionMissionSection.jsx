'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function VisionMissionSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className="relative py-16 px-4 md:px-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
    >
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
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
        >
          
          {/* Left Side - Vision, Mission & Values */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
          >
            
            {/* Our Vision */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <motion.p 
                className="text-gray-700 leading-relaxed text-justify"
                variants={itemVariants}
              >
                To be a leading multispeciality healthcare provider, delivering world-class medical services with compassion and excellence, while making quality healthcare accessible to all.
              </motion.p>
            </motion.div>

            {/* Our Mission */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <motion.p 
                className="text-gray-700 leading-relaxed text-justify"
                variants={itemVariants}
              >
                To provide high-quality medical services through prompt diagnosis, standardized medical care with advanced medical technology, and efficient staff, ensuring a happy and healthy discharge to home for every patient.
              </motion.p>
            </motion.div>

            {/* Our Values */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <motion.ul className="space-y-4" variants={itemVariants}>
                <motion.li 
                  className="flex gap-3"
                  variants={itemVariants}
                >
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Patient Centric:</span>
                    <span className="text-gray-700"> Putting the individual patient and their family at the center of our mission is our utmost priority.</span>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex gap-3"
                  variants={itemVariants}
                >
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Excellence:</span>
                    <span className="text-gray-700"> Striving for world-class standards in everything we do, from skill and technology to programs and services.</span>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex gap-3"
                  variants={itemVariants}
                >
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Integrity:</span>
                    <span className="text-gray-700"> We uphold an unwavering code of ethics, prioritizing complete honesty, transparency, and sincerity.</span>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex gap-3"
                  variants={itemVariants}
                >
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Compassion:</span>
                    <span className="text-gray-700"> We warmly welcome everyone with kindness and dedication to their health and well-being.</span>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex gap-3"
                  variants={itemVariants}
                >
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Accountability:</span>
                    <span className="text-gray-700"> Taking full ownership of our work and being responsible for the services we provide.</span>
                  </div>
                </motion.li>
                <motion.li 
                  className="flex gap-3"
                  variants={itemVariants}
                >
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-bold text-gray-900">Teamwork:</span>
                    <span className="text-gray-700"> Building system effectiveness through the collective strength and cultural diversity of everyone, fostering open communication.</span>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Book Appointment Button */}
            <motion.div variants={itemVariants}>
              <motion.button 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Appointment
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Right Side - Image Collage */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {/* Top Left - 33 Years Badge with Surgery Image */}
              <motion.div 
                className="relative h-64 rounded-lg overflow-hidden shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
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
              </motion.div>

              {/* Top Right - Hospital Facility */}
              <motion.div 
                className="relative h-64 rounded-lg overflow-hidden shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/images/hospital-facilities.jpg"
                  alt="Hospital Facility"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Bottom Left - Medical Equipment */}
              <motion.div 
                className="relative h-64 rounded-lg overflow-hidden shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/images/medical-equipments.jpg"
                  alt="Medical Equipment"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Bottom Right - Hospital Building */}
              <motion.div 
                className="relative h-64 rounded-lg overflow-hidden shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/images/hospital-about.jpg"
                  alt="Hospital Building"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}