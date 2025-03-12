
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'py-3 glass shadow-sm border-b border-white/10'
          : 'py-5 bg-transparent'
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-medium text-lg">P</span>
          </div>
          <span className="font-medium text-lg">PriceHaus</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#predictor" className="text-sm font-medium hover:text-primary transition-colors">Predictor</a>
          <a href="#trends" className="text-sm font-medium hover:text-primary transition-colors">Market Trends</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
        </div>
        
        <div className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
          scrolled 
            ? "bg-primary text-white shadow-md hover:bg-primary/90"
            : "glass-card hover:bg-white/100"
        )}>
          Try Demo
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
