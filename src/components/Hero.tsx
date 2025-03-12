
import React from 'react';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      
      {/* Abstract shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-100/50 blur-3xl -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-6 animate-fade-down">
            Powered by Advanced Machine Learning
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-down animate-delay-100">
            Predict Real Estate Prices with <span className="text-gradient">Precision</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-down animate-delay-200">
            Our AI-driven platform analyzes thousands of data points to give you accurate property valuations, helping you make informed decisions in the real estate market.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-300">
            <button className="px-8 py-3 rounded-full bg-primary text-white font-medium shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all">
              Try the Predictor
            </button>
            <button className="px-8 py-3 rounded-full bg-white border border-gray-200 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
              Learn More
            </button>
          </div>
          
          <div className="mt-16 flex items-center justify-center w-full">
            <div className="relative w-full max-w-4xl animate-scale-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl blur"></div>
              <div className="glass-card relative overflow-hidden rounded-2xl p-1">
                <div className="bg-white rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="Modern property dashboard" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent -z-10" />
    </section>
  );
};

export default Hero;
