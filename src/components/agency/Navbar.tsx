
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  label: string;
  onClick: () => void;
};

const NavLink = ({ href, label, onClick }: NavLinkProps) => (
  <a 
    href={href} 
    className="px-4 py-2 text-sm transition-colors hover:text-agency-accent relative group"
    onClick={(e) => {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        onClick();
      }
    }}
  >
    {label}
    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-agency-accent transition-all duration-300 group-hover:w-full"></span>
  </a>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / windowHeight) * 100;
      
      setScrollProgress(progress);
      setScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4",
        scrolled ? "bg-agency-darker/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <a href="#hero" className="text-lg font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-agency-accent flex items-center justify-center">
            <span className="text-agency-dark font-bold">D</span>
          </div>
          <span className="hidden sm:inline">DIGITAL</span>
        </a>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-agency-accent" style={{ width: `${scrollProgress}%` }}></div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLink href="#about" label="About" onClick={closeMenu} />
          <NavLink href="#services" label="Services" onClick={closeMenu} />
          <NavLink href="#portfolio" label="Portfolio" onClick={closeMenu} />
          <NavLink href="#testimonials" label="Testimonials" onClick={closeMenu} />
          <NavLink href="#contact" label="Contact" onClick={closeMenu} />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center gap-1.5" 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-agency-darker/95 flex flex-col items-center justify-center z-40 transition-all duration-500",
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <nav className="flex flex-col items-center space-y-8">
          <NavLink href="#hero" label="Home" onClick={closeMenu} />
          <NavLink href="#about" label="About" onClick={closeMenu} />
          <NavLink href="#services" label="Services" onClick={closeMenu} />
          <NavLink href="#portfolio" label="Portfolio" onClick={closeMenu} />
          <NavLink href="#testimonials" label="Testimonials" onClick={closeMenu} />
          <NavLink href="#contact" label="Contact" onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
}
