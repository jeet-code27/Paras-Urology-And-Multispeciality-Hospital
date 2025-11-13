'use client';
import React from 'react';
import { Package, MessageSquare, Briefcase, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Link = ({ href, children, className = '' }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const Image = ({ src, alt, width, height, className = '' }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

const StatsSection = () => {
  const stats = [
    { number: '50,000+', label: 'Successful Surgeries' },
    { number: '1,00,000+', label: 'People Trust Us' },
    { number: '500+', label: 'Cardiac Surgeries Yearly' },
    { number: '5,000+', label: 'Rated 4.8/5 on Google' }
  ];

  const actions = [
    { icon: <Package className="w-8 h-8 text-blue-600" />, label: 'Health Care Packages', href: '/health-packages' },
    { icon: <MessageSquare className="w-8 h-8 text-blue-600" />, label: 'Feedback', href: '/feedback' },
    { icon: <Briefcase className="w-8 h-8 text-blue-600" />, label: 'Build a Career', href: '/careers' },
    { icon: <FileText className="w-8 h-8 text-blue-600" />, label: 'View Lab Reports', href: '/lab-reports' }
  ];

  return (
    <section className="bg-gray-100 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Row */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {}
          }}
        >
          {stats.slice(0, 2).map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-lg shadow-md px-8 py-6 text-center min-w-[200px]"
            >
              <h3 className="text-3xl font-bold text-blue-700 mb-2">{stat.number}</h3>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}

          {/* Logo */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 12 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/pumh-logo.png"
              alt="PUMH Logo"
              width={120}
              height={120}
              className="w-28 h-28 object-contain"
            />
          </motion.div>

          {stats.slice(2).map((stat, index) => (
            <motion.div
              key={index + 2}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-lg shadow-md px-8 py-6 text-center min-w-[200px]"
            >
              <h3 className="text-3xl font-bold text-blue-700 mb-2">{stat.number}</h3>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions Row */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {}
          }}
        >
          {actions.map((action, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Link
                href={action.href}
                className="bg-white rounded-full shadow-md px-8 py-4 flex items-center gap-3 
                hover:shadow-lg hover:scale-105 transition-all duration-300 min-w-[250px]"
              >
                {action.icon}
                <span className="text-gray-800 font-semibold text-lg">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
