
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
};

const ServiceCard = ({ title, description, icon, delay, isVisible }: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "bg-agency-darker/80 backdrop-blur border border-white/10 p-8 rounded-xl transition-all duration-700 group hover:border-agency-accent/50 hover:bg-gradient-to-b hover:from-agency-accent/10 hover:to-transparent",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${delay * 150}ms` }}
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-lg mb-6 bg-agency-accent/10 text-agency-accent group-hover:bg-agency-accent/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3 group-hover:text-agency-accent transition-colors">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// SVG Icons
const WebDevIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.0799 3 6.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V16M12.5 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V11.5M21 11.5H15.5C14.12 11.5 13 10.38 13 9V3M21 11.5C21 13.433 19.433 15 17.5 15C15.567 15 14 13.433 14 11.5C14 9.567 15.567 8 17.5 8C19.433 8 21 9.567 21 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UIUXIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BrandingIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 8.5L9 12L5.5 15.5M12 5.5H19M12 12H19M12 18.5H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MarketingIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8L2 8M16 8C16 9.65686 17.3431 11 19 11C20.6569 11 22 9.65685 22 8C22 6.34315 20.6569 5 19 5C17.3431 5 16 6.34315 16 8ZM8 16L22 16M8 16C8 17.6569 6.65685 19 5 19C3.34315 19 2 17.6569 2 16C2 14.3431 3.34315 13 5 13C6.65685 13 8 14.3431 8 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Web Development",
      description: "We build fast, responsive, and scalable web applications using the latest technologies and best practices.",
      icon: <WebDevIcon />,
      delay: 0,
    },
    {
      title: "UI/UX Design",
      description: "We create intuitive and elegant user experiences that engage, delight, and convert visitors into customers.",
      icon: <UIUXIcon />,
      delay: 1,
    },
    {
      title: "Branding",
      description: "We craft distinctive brand identities that communicate your values and resonate with your target audience.",
      icon: <BrandingIcon />,
      delay: 2,
    },
    {
      title: "Digital Marketing",
      description: "We implement effective strategies to grow your online presence and drive measurable results.",
      icon: <MarketingIcon />,
      delay: 3,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="section-padding py-28 bg-gradient-to-b from-agency-dark to-agency-darker relative"
    >
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-agency-accent mb-4">// SERVICES</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">What We <span className="text-gradient">Offer</span></h3>
          <p className="text-gray-400 text-lg">
            We provide comprehensive digital solutions to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={service.delay}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
