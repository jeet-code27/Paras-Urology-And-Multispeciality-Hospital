import React from 'react';
import { Package, MessageSquare, Briefcase, FileText } from 'lucide-react';

// Simulate Next.js Link and Image components
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
    {
      number: '50,000+',
      label: 'Successful Surgeries'
    },
    {
      number: '1,00,000+',
      label: 'People Trust Us'
    },
    {
      number: '500+',
      label: 'Cardiac Surgeries Yearly'
    },
    {
      number: '5,000+',
      label: 'Rated 4.8/5 on Google'
    }
  ];

  const actions = [
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      label: 'Health Care Packages',
      href: '/health-packages'
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      label: 'Feedback',
      href: '/feedback'
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      label: 'Build a Career',
      href: '/careers'
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      label: 'View Lab Reports',
      href: '/lab-reports'
    }
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          {/* First Stat */}
          <div className="bg-white rounded-lg shadow-md px-8 py-6 text-center min-w-[200px]">
            <h3 className="text-3xl font-bold text-blue-700 mb-2">{stats[0].number}</h3>
            <p className="text-gray-700 font-medium">{stats[0].label}</p>
          </div>

          {/* Second Stat */}
          <div className="bg-white rounded-lg shadow-md px-8 py-6 text-center min-w-[200px]">
            <h3 className="text-3xl font-bold text-blue-700 mb-2">{stats[1].number}</h3>
            <p className="text-gray-700 font-medium">{stats[1].label}</p>
          </div>

          {/* Anniversary Badge */}
          <div className="relative">
            <Image 
              src="/images/pumh-logo.png" 
              alt="PUMH Logo" 
              width={120} 
              height={120}
              className="w-28 h-28 object-contain"
            />
          </div>

          {/* Third Stat */}
          <div className="bg-white rounded-lg shadow-md px-8 py-6 text-center min-w-[200px]">
            <h3 className="text-3xl font-bold text-blue-700 mb-2">{stats[2].number}</h3>
            <p className="text-gray-700 font-medium">{stats[2].label}</p>
          </div>

          {/* Fourth Stat */}
          <div className="bg-white rounded-lg shadow-md px-8 py-6 text-center min-w-[200px]">
            <h3 className="text-3xl font-bold text-blue-700 mb-2">{stats[3].number}</h3>
            <p className="text-gray-700 font-medium">{stats[3].label}</p>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          {actions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="bg-white rounded-full shadow-md px-8 py-4 flex items-center gap-3 hover:shadow-lg hover:scale-105 transition-all duration-300 min-w-[250px]"
            >
              {action.icon}
              <span className="text-gray-800 font-semibold text-lg">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;