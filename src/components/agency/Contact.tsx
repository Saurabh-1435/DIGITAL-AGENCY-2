
import { useState, useEffect, useRef, FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setFormSubmitted(true);
    toast({
      title: "Success",
      description: "Your message has been sent. We'll get back to you soon!",
    });

    // Reset form after submission
    setFormState({
      name: '',
      email: '',
      message: '',
    });

    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding py-28 relative"
    >
      {/* Background decoration */}
      <div className="absolute -z-10 top-0 right-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 right-10 w-60 h-60 rounded-full bg-agency-accent/5"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-agency-accent/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-agency-accent/3 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xl font-semibold text-agency-accent mb-4">// CONTACT US</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Get in <span className="text-gradient">Touch</span></h3>
          <p className="text-gray-400 text-lg">
            Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div 
          className={cn(
            "grid md:grid-cols-2 gap-12 max-w-6xl mx-auto transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {/* Contact form */}
          <div className="bg-agency-darker/30 backdrop-blur border border-white/5 rounded-xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-lg focus:ring-agency-accent focus:border-agency-accent block w-full p-3 placeholder-gray-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-lg focus:ring-agency-accent focus:border-agency-accent block w-full p-3 placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-lg focus:ring-agency-accent focus:border-agency-accent block w-full p-3 placeholder-gray-500"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={formSubmitted}
                className={cn(
                  "w-full bg-agency-accent hover:bg-agency-accent/90 text-white font-medium py-3 px-6 rounded-md transition-all",
                  formSubmitted && "opacity-70 cursor-not-allowed"
                )}
              >
                {formSubmitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact information */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <div className="border-l-2 border-agency-accent pl-6">
                <h4 className="text-2xl font-semibold mb-2">Office Location</h4>
                <p className="text-gray-400">123 Creative Street, Tech District</p>
                <p className="text-gray-400">New York, NY 10001</p>
              </div>
              
              <div className="border-l-2 border-agency-accent pl-6">
                <h4 className="text-2xl font-semibold mb-2">Contact Info</h4>
                <p className="text-gray-400">contact@digitalagency.com</p>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              
              <div className="border-l-2 border-agency-accent pl-6">
                <h4 className="text-2xl font-semibold mb-2">Working Hours</h4>
                <p className="text-gray-400">Monday - Friday: 9AM - 6PM</p>
                <p className="text-gray-400">Saturday: 10AM - 4PM</p>
              </div>
            </div>
            
            {/* Social links */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['instagram', 'twitter', 'linkedin', 'facebook'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-12 h-12 rounded-full bg-white/5 hover:bg-agency-accent/20 border border-white/10 flex items-center justify-center transition-colors"
                  >
                    <div className="text-agency-accent">
                      {social === 'instagram' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      )}
                      {social === 'twitter' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      )}
                      {social === 'linkedin' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      )}
                      {social === 'facebook' && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
