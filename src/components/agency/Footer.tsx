
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-agency-darker py-12 px-6 md:px-12 relative">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-agency-accent/50 to-transparent"></div>
      
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <a href="#hero" className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 rounded-full bg-agency-accent flex items-center justify-center">
                <span className="text-agency-dark font-bold">D</span>
              </div>
              <span>DIGITAL</span>
            </a>
            <p className="text-gray-400 mt-2 max-w-xs">
              Creating exceptional digital experiences that drive growth and transform businesses.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4">
              <a href="#" className="text-gray-400 hover:text-agency-accent transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-agency-accent transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-agency-accent transition-colors">Cookies</a>
            </div>
            <p className="text-gray-500 text-sm">
              © {year} Digital Agency. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
