
import { useEffect, useState, useRef } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
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
      id="about" 
      ref={sectionRef}
      className="section-padding py-28 relative"
    >
      {/* Grid background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="h-full w-full grid grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-gray-600 h-full"></div>
          ))}
        </div>
        <div className="h-full w-full grid grid-rows-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b border-gray-600 w-full"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2 className="text-xl font-semibold text-agency-accent">// ABOUT US</h2>
            <h3 className="text-4xl md:text-5xl font-bold">We create <span className="text-gradient">digital</span> products that stand out.</h3>
            
            <p className="text-gray-300 text-lg">
              Founded in 2015, our agency has grown into a team of creative minds, strategic thinkers, and technical experts who are passionate about crafting exceptional digital experiences.
            </p>
            
            <p className="text-gray-400">
              We believe in the power of innovative design and technology to transform how businesses connect with their audiences. Our collaborative approach ensures each project is tailored to meet unique goals and challenges.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div>
                <h4 className="text-4xl font-bold text-agency-accent">150+</h4>
                <p className="text-sm text-gray-400">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-agency-accent">12+</h4>
                <p className="text-sm text-gray-400">Years Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-agency-accent">50+</h4>
                <p className="text-sm text-gray-400">Team Members</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative z-10">
              <div className="aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-agency-accent/20 to-agency-accent/5 flex items-center justify-center">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-agency-accent/20 flex items-center justify-center animate-pulse-light">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-agency-accent/40 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-agency-accent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-8 w-16 h-16 border border-agency-accent/30 rounded-md -rotate-12 -z-10"></div>
            <div className="absolute bottom-1/4 -right-8 w-24 h-24 border border-agency-accent/30 rounded-md rotate-12 -z-10"></div>
            <div className="absolute -bottom-8 left-1/4 w-20 h-20 border border-agency-accent/30 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
