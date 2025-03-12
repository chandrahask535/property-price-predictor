
import React, { useState } from 'react';
import PriceChart from './PriceChart';
import PropertyCard from './PropertyCard';
import { cn } from '@/lib/utils';

const locations = ['San Francisco', 'New York', 'Austin', 'Seattle', 'Los Angeles'];
const propertyTypes = ['All Types', 'Single Family', 'Condo', 'Townhouse'];
const timeRanges = ['3 Months', '6 Months', '1 Year', '3 Years', '5 Years'];

const sampleProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    title: "Modern Villa",
    address: "123 Main St, San Francisco, CA",
    price: 1250000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    prediction: {
      accuracy: 94,
      difference: 2.5
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    title: "Oceanview Condo",
    address: "456 Ocean Dr, San Francisco, CA",
    price: 950000,
    beds: 2,
    baths: 2,
    sqft: 1500,
    prediction: {
      accuracy: 91,
      difference: -1.2
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
    title: "Luxury Townhouse",
    address: "789 Park Ave, San Francisco, CA",
    price: 1850000,
    beds: 3,
    baths: 3.5,
    sqft: 2200,
    prediction: {
      accuracy: 96,
      difference: 3.8
    }
  }
];

const MarketTrends: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('San Francisco');
  const [selectedPropertyType, setSelectedPropertyType] = useState('All Types');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1 Year');
  
  return (
    <section id="trends" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-3">
            Market Intelligence
          </span>
          <h2 className="text-3xl font-bold mb-4">Real Estate Market Trends</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track property value trends across different locations and property types to identify investment opportunities and market patterns.
          </p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl mb-12">
          <div className="flex flex-wrap gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <button
                    key={location}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                      selectedLocation === location
                        ? "bg-primary text-white"
                        : "bg-white border border-gray-200 hover:border-primary/30 hover:bg-gray-50"
                    )}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                      selectedPropertyType === type
                        ? "bg-primary text-white"
                        : "bg-white border border-gray-200 hover:border-primary/30 hover:bg-gray-50"
                    )}
                    onClick={() => setSelectedPropertyType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Time Range</label>
              <div className="flex flex-wrap gap-2">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                      selectedTimeRange === range
                        ? "bg-primary text-white"
                        : "bg-white border border-gray-200 hover:border-primary/30 hover:bg-gray-50"
                    )}
                    onClick={() => setSelectedTimeRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium">Price Trends in {selectedLocation}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPropertyType} properties over the past {selectedTimeRange.toLowerCase()}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                  <span>Actual Prices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-300 mr-2" />
                  <span>Predicted Trend</span>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <PriceChart location={selectedLocation} propertyType={selectedPropertyType} timeRange={selectedTimeRange} />
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">Recently Analyzed Properties</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProperties.map((property) => (
              <PropertyCard
                key={property.id}
                image={property.image}
                title={property.title}
                address={property.address}
                price={property.price}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                prediction={property.prediction}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketTrends;
