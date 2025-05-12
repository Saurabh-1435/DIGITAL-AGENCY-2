
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-agency-dark z-[100] flex items-center justify-center transition-opacity duration-500",
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-agency-accent border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute top-2 left-2 w-16 h-16 rounded-full border-4 border-t-transparent border-r-agency-accent/70 border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }}></div>
          <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-4 border-t-transparent border-r-transparent border-b-agency-accent/40 border-l-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
        </div>
        <p className="mt-4 font-medium text-agency-accent">LOADING</p>
      </div>
    </div>
  );
}
