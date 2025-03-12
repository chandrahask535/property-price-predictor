
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import PredictionForm from '@/components/PredictionForm';
import MarketTrends from '@/components/MarketTrends';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add page load animations
    document.body.classList.add('animate-fade-in');
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <PredictionForm />
      <MarketTrends />
      <Footer />
    </div>
  );
};

export default Index;
