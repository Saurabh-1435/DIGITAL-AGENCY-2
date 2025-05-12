
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const generateParticles = (count: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 5,
    });
  }
  return particles;
};

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const particles = useRef(generateParticles(20));
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particles background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {particles.current.map((particle) => (
          <div 
            key={particle.id}
            className="absolute rounded-full bg-agency-accent animate-particle-move"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 z-10">
        <div 
          className={cn(
            "flex flex-col gap-8 transition-all duration-1000 ease-out transform",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <h2 className="text-agency-accent font-semibold text-lg md:text-xl tracking-wider">
            // CREATIVE DIGITAL AGENCY
          </h2>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            We <span className="text-gradient">Design.</span> <br />
            We <span className="text-gradient">Build.</span> <br />
            We <span className="text-gradient">Elevate</span> Brands.
          </h1>
          
          <p className="text-gray-400 max-w-lg text-lg md:text-xl">
            We create exceptional digital experiences that drive growth and transform businesses.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <a 
              href="#contact" 
              className="px-8 py-3 bg-agency-accent hover:bg-agency-accent/90 text-white rounded-md font-medium transition-all"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch
            </a>
            <a 
              href="#portfolio" 
              className="px-8 py-3 border border-white/20 hover:border-agency-accent/80 hover:bg-agency-accent/10 rounded-md font-medium transition-all"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <a 
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}  
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-agency-accent transition-colors"
        >
          <span className="text-xs">Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
