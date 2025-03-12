
import React from 'react';

interface PropertyCardProps {
  image: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  prediction?: {
    accuracy: number;
    difference: number;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  image, 
  title, 
  address, 
  price, 
  beds, 
  baths, 
  sqft,
  prediction
}) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md">
        <div className="relative h-60 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {prediction && (
            <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm">
              {prediction.difference >= 0 ? (
                <span className="text-emerald-600">Undervalued {prediction.difference}%</span>
              ) : (
                <span className="text-red-500">Overvalued {Math.abs(prediction.difference)}%</span>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg truncate">{title}</h3>
            <span className="font-bold text-primary">${price.toLocaleString()}</span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 truncate">{address}</p>
          
          <div className="flex items-center text-sm">
            <div className="flex items-center mr-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M7 10.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 10.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17.4V20.4H22V17.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 7.5C2 6.4 2.9 5.5 4 5.5H20C21.1 5.5 22 6.4 22 7.5V17.5H2V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{beds} beds</span>
            </div>
            
            <div className="flex items-center mr-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M5 11H19V20H5V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 11V7C19 5.9 18.1 5 17 5H7C5.9 5 5 5.9 5 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 14.5C11 13.672 10.328 13 9.5 13C8.672 13 8 13.672 8 14.5C8 15.328 8.672 16 9.5 16C10.328 16 11 15.328 11 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{baths} baths</span>
            </div>
            
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 17V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17V6.8L7.5 2H16.5L21 6.8V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 17V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{sqft.toLocaleString()} sqft</span>
            </div>
          </div>
          
          {prediction && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Prediction Accuracy</span>
                <span className="font-medium">{prediction.accuracy}%</span>
              </div>
              <div className="h-1 mt-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${prediction.accuracy}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
