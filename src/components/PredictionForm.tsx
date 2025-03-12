
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type PredictionResult = {
  predicted_price: number;
  confidence: number;
  range_low: number;
  range_high: number;
};

const PredictionForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        predicted_price: 850000,
        confidence: 92,
        range_low: 820000,
        range_high: 880000
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <section id="predictor" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-3">
            Property Valuation
          </span>
          <h2 className="text-3xl font-bold mb-4">Predict Your Property's Value</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use our advanced AI model to get an accurate estimate of your property's market value based on location, features, and current market conditions.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="glass-card p-6 rounded-2xl">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option value="">Select location</option>
                        <option value="downtown">San Francisco, CA</option>
                        <option value="suburbs">New York, NY</option>
                        <option value="rural">Austin, TX</option>
                        <option value="coastal">Seattle, WA</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Property Type</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option value="">Select type</option>
                        <option value="house">Single Family Home</option>
                        <option value="condo">Condominium</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="apartment">Apartment</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Square Footage</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 2000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Bedrooms</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option value="">Select bedrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Bathrooms</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option value="">Select bathrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Year Built</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 2005"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Lot Size (sqft)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 5000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Garage Spaces</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option value="">Select garage spaces</option>
                        <option value="0">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3+">3+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Features</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['Pool', 'Fireplace', 'Renovated Kitchen', 'Central AC', 'Garden', 'View'].map((feature) => (
                        <label key={feature} className="flex items-center space-x-2 text-sm">
                          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <span>{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      type="submit"
                      className={cn(
                        "w-full py-3 rounded-lg font-medium text-white transition-all",
                        loading 
                          ? "bg-primary/80 cursor-not-allowed" 
                          : "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg"
                      )}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : "Predict Price"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              {result ? (
                <div className="glass-card p-6 rounded-2xl h-full">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-1">Estimated Value</h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-primary">${result.predicted_price.toLocaleString()}</span>
                      <span className="ml-2 text-sm text-muted-foreground">USD</span>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Confidence</span>
                        <span className="font-medium">{result.confidence}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm mb-3">Price Range</h4>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <span className="block text-xs text-muted-foreground mb-1">Low</span>
                          <span className="text-sm font-medium">${result.range_low.toLocaleString()}</span>
                        </div>
                        
                        <div className="w-24 h-1 bg-gray-200 rounded-full relative">
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
                        </div>
                        
                        <div className="text-center">
                          <span className="block text-xs text-muted-foreground mb-1">High</span>
                          <span className="text-sm font-medium">${result.range_high.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium mb-3">Market Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Area Avg. Price</span>
                          <span className="font-medium">$825,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Price per Sq Ft</span>
                          <span className="font-medium">$425</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Market Trend</span>
                          <span className="font-medium text-emerald-600">+2.3% (6mo)</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors">
                      View Detailed Report
                    </button>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-6 rounded-2xl h-full flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.9999H17L14 20.9999L10 2.99988L7 11.9999H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Get Your Estimate</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Fill out the form with your property details to receive an accurate price prediction.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Powered by machine learning algorithms trained on millions of property transactions.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;
