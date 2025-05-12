
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechVision Inc.",
    text: "Working with this agency transformed our online presence completely. Their team not only understood our vision but enhanced it with their creativity and technical expertise.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "Elevate Solutions",
    text: "The level of creativity and attention to detail was exceptional. Our website not only looks stunning but has significantly improved our conversion rates and user engagement.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Founder",
    company: "Innovate Studio",
    text: "I've worked with many agencies over the years, but none have delivered results like this team. They truly take the time to understand your business and goals.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "CTO",
    company: "Quantum Dynamics",
    text: "Their technical capabilities are outstanding. They built us a complex web application that has become central to our business operations and customer experience.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const maxSlides = testimonials.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

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

  // Auto slide effect
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible, currentSlide]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding py-28 bg-gradient-to-b from-agency-darker to-agency-dark relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-agency-accent/50 to-transparent"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-agency-accent mb-4">// TESTIMONIALS</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">What Our <span className="text-gradient">Clients</span> Say</h3>
          <p className="text-gray-400 text-lg">
            Hear from the businesses and individuals who have experienced our work and approach.
          </p>
        </div>

        <div 
          className={cn(
            "relative max-w-4xl mx-auto transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {/* Testimonial slider */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-agency-darker/50 backdrop-blur border border-white/5 rounded-xl p-8 md:p-10 relative">
                    {/* Quote icon */}
                    <div className="absolute -top-5 -left-2 text-agency-accent/20 text-6xl font-serif">
                      "
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-agency-accent/30">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-grow text-center md:text-left">
                        <p className="text-gray-300 text-lg md:text-xl mb-4">
                          "{testimonial.text}"
                        </p>
                        
                        <div>
                          <h4 className="font-semibold text-xl">{testimonial.name}</h4>
                          <p className="text-agency-accent">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-agency-accent/20 border border-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-agency-accent/20 border border-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentSlide === index 
                    ? "bg-agency-accent w-8" 
                    : "bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
