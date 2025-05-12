
import { useEffect } from "react";
import Navbar from "@/components/agency/Navbar";
import Hero from "@/components/agency/Hero";
import About from "@/components/agency/About";
import Services from "@/components/agency/Services";
import Portfolio from "@/components/agency/Portfolio";
import Testimonials from "@/components/agency/Testimonials";
import Contact from "@/components/agency/Contact";
import Footer from "@/components/agency/Footer";
import ScrollToTop from "@/components/agency/ScrollToTop";
import Loader from "@/components/agency/Loader";

const Index = () => {
  // Initialize scroll reveal
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal-on-scroll');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update page title
  useEffect(() => {
    document.title = "Digital Agency | We Design. We Build. We Elevate Brands.";
  }, []);

  return (
    <div className="bg-agency-dark text-white">
      {/* Initial loading animation */}
      <Loader />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
