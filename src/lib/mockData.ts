
export interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  propertyType: 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family';
  features: string[];
  description: string;
  images: string[];
  prediction?: {
    predictedPrice: number;
    confidence: number;
    priceRange: [number, number];
  };
}

export interface MarketData {
  location: string;
  propertyType: string;
  timeRange: string;
  data: Array<{
    date: string;
    price: number;
    predicted?: number;
  }>;
  marketStats: {
    medianPrice: number;
    averagePrice: number;
    pricePerSqFt: number;
    inventory: number;
    daysOnMarket: number;
    monthlyChange: number;
    yearlyChange: number;
  };
}

// Generate mock property data
export const generateProperties = (count: number = 10): Property[] => {
  const cities = ['San Francisco', 'New York', 'Austin', 'Seattle', 'Los Angeles', 'Chicago', 'Denver', 'Boston'];
  const states = ['CA', 'NY', 'TX', 'WA', 'IL', 'CO', 'MA'];
  const propertyTypes: Array<Property['propertyType']> = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family'];
  const features = [
    'Garage', 'Pool', 'Garden', 'Balcony', 'Fireplace', 'Central AC', 
    'Hardwood Floors', 'Renovated Kitchen', 'Walk-in Closets', 'Smart Home',
    'Mountain View', 'Ocean View', 'City View', 'Waterfront', 'Gated Community'
  ];
  const images = [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  ];
  
  const streetNames = [
    'Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Park Lane',
    'Cedar Ln', 'Sunset Dr', 'Highland Ave', 'River Rd', 'Lake St'
  ];
  
  const properties: Property[] = [];
  
  for (let i = 0; i < count; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const streetNumber = Math.floor(Math.random() * 9000) + 1000;
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    const zip = `${Math.floor(Math.random() * 90000) + 10000}`;
    
    const basePrice = Math.floor(Math.random() * 1500000) + 500000;
    const bedrooms = Math.floor(Math.random() * 5) + 1;
    const bathrooms = Math.floor(Math.random() * 4) + 1;
    const squareFeet = Math.floor(Math.random() * 3000) + 1000;
    const yearBuilt = Math.floor(Math.random() * 70) + 1950;
    
    // Select random features
    const propertyFeatures: string[] = [];
    const featureCount = Math.floor(Math.random() * 6) + 2;
    while (propertyFeatures.length < featureCount) {
      const feature = features[Math.floor(Math.random() * features.length)];
      if (!propertyFeatures.includes(feature)) {
        propertyFeatures.push(feature);
      }
    }
    
    // Generate predicted price with ±10% variation
    const priceVariation = (Math.random() * 0.2) - 0.1;
    const predictedPrice = Math.round(basePrice * (1 + priceVariation));
    const confidenceScore = Math.floor(Math.random() * 11) + 85; // 85-95%
    const priceRange: [number, number] = [
      Math.round(predictedPrice * 0.95),
      Math.round(predictedPrice * 1.05)
    ];
    
    // Generate property title
    let title;
    if (propertyType === 'Single Family') {
      title = `${Math.random() > 0.5 ? 'Modern' : 'Spacious'} ${bedrooms}-Bedroom Home`;
    } else if (propertyType === 'Condo') {
      title = `${Math.random() > 0.5 ? 'Luxury' : 'Downtown'} ${bedrooms}-Bedroom Condo`;
    } else if (propertyType === 'Townhouse') {
      title = `${Math.random() > 0.5 ? 'Urban' : 'Elegant'} ${bedrooms}-Bedroom Townhouse`;
    } else {
      title = `${bedrooms}-Unit Multi-Family Property`;
    }
    
    // Add the property
    properties.push({
      id: i + 1,
      title,
      address: `${streetNumber} ${streetName}`,
      city,
      state,
      zip,
      price: basePrice,
      bedrooms,
      bathrooms,
      squareFeet,
      lotSize: Math.floor(Math.random() * 10000) + 5000,
      yearBuilt,
      propertyType,
      features: propertyFeatures,
      description: "This beautiful property features an open floor plan, modern finishes, and plenty of natural light. Located in a desirable neighborhood with easy access to shopping, dining, and entertainment.",
      images: [
        `${images[Math.floor(Math.random() * images.length)]}?ixlib=rb-4.0.3&w=1200&h=800&fit=crop`,
        `${images[Math.floor(Math.random() * images.length)]}?ixlib=rb-4.0.3&w=1200&h=800&fit=crop`,
        `${images[Math.floor(Math.random() * images.length)]}?ixlib=rb-4.0.3&w=1200&h=800&fit=crop`
      ],
      prediction: {
        predictedPrice,
        confidence: confidenceScore,
        priceRange
      }
    });
  }
  
  return properties;
};

export const getMarketData = (location: string, propertyType: string, timeRange: string): MarketData => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  
  let dataPoints: { date: string; price: number; predicted?: number }[] = [];
  let pointCount: number;
  
  switch (timeRange) {
    case '3 Months':
      pointCount = 3;
      break;
    case '6 Months':
      pointCount = 6;
      break;
    case '1 Year':
      pointCount = 12;
      break;
    case '3 Years':
      pointCount = 36;
      break;
    case '5 Years':
      pointCount = 60;
      break;
    default:
      pointCount = 12;
  }
  
  // Base price depends on location
  const basePrice = location === 'San Francisco' ? 1200000 :
                    location === 'New York' ? 1000000 :
                    location === 'Austin' ? 600000 :
                    location === 'Seattle' ? 800000 :
                    location === 'Los Angeles' ? 900000 : 700000;
  
  // Modifier based on property type
  const modifier = propertyType === 'Single Family' ? 1.2 :
                   propertyType === 'Condo' ? 0.8 :
                   propertyType === 'Townhouse' ? 1 : 1;
  
  let currentPrice = basePrice * modifier;
  const growthTrend = 0.005; // 0.5% growth per period
  const volatility = 0.03; // Random fluctuation
  
  for (let i = 0; i < pointCount; i++) {
    // Calculate date string
    let dateStr;
    if (pointCount <= 12) {
      // For short timeframes, use month names
      const monthIndex = (currentDate.getMonth() - pointCount + i + 1 + 12) % 12;
      dateStr = months[monthIndex];
    } else {
      // For longer timeframes, use quarter format
      const monthsAgo = pointCount - i - 1;
      const targetDate = new Date(currentDate);
      targetDate.setMonth(targetDate.getMonth() - monthsAgo);
      const year = targetDate.getFullYear();
      const quarter = Math.floor(targetDate.getMonth() / 3) + 1;
      dateStr = `Q${quarter} ${year}`;
    }
    
    // Calculate price with trend and random variation
    const randomFactor = (Math.random() * 2 - 1) * volatility;
    currentPrice = currentPrice * (1 + growthTrend + randomFactor);
    
    dataPoints.push({
      date: dateStr,
      price: Math.round(currentPrice / 1000) * 1000 // Round to nearest thousand
    });
  }
  
  // Add predicted future prices
  const futureMonths = 3;
  for (let i = 0; i < futureMonths; i++) {
    // Calculate future date
    let dateStr;
    if (pointCount <= 12) {
      const monthIndex = (currentDate.getMonth() + i + 1) % 12;
      dateStr = months[monthIndex];
    } else {
      const monthsAhead = i + 1;
      const targetDate = new Date(currentDate);
      targetDate.setMonth(targetDate.getMonth() + monthsAhead);
      const year = targetDate.getFullYear();
      const quarter = Math.floor(targetDate.getMonth() / 3) + 1;
      dateStr = `Q${quarter} ${year}`;
    }
    
    // Calculate predicted price
    const predictedGrowth = growthTrend + (Math.random() * 0.01 - 0.005);
    currentPrice = currentPrice * (1 + predictedGrowth);
    
    dataPoints.push({
      date: dateStr,
      price: 0, // No actual price for future dates
      predicted: Math.round(currentPrice / 1000) * 1000
    });
  }
  
  // Generate market stats
  const lastPrice = dataPoints[dataPoints.length - futureMonths - 1].price;
  const firstPrice = dataPoints[0].price;
  const yearlyChange = lastPrice / firstPrice - 1;
  
  // Generate monthly change based on last two months
  const previousMonthPrice = dataPoints[dataPoints.length - futureMonths - 2]?.price || firstPrice;
  const monthlyChange = lastPrice / previousMonthPrice - 1;
  
  return {
    location,
    propertyType,
    timeRange,
    data: dataPoints,
    marketStats: {
      medianPrice: Math.round((basePrice * modifier) / 1000) * 1000,
      averagePrice: Math.round((basePrice * modifier * 1.05) / 1000) * 1000,
      pricePerSqFt: Math.round((basePrice * modifier) / 2000),
      inventory: Math.floor(Math.random() * 200) + 50,
      daysOnMarket: Math.floor(Math.random() * 60) + 10,
      monthlyChange: Math.round(monthlyChange * 1000) / 10, // Convert to percentage with one decimal
      yearlyChange: Math.round(yearlyChange * 1000) / 10 // Convert to percentage with one decimal
    }
  };
};
