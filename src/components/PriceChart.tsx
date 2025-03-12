
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  location: string;
  propertyType: string;
  timeRange: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ location, propertyType, timeRange }) => {
  // Generate sample data based on props
  const data = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const years = ['2018', '2019', '2020', '2021', '2022', '2023'];
    
    let dataPoints: { name: string; price: number; prediction: number | null }[] = [];
    const basePrice = location === 'San Francisco' ? 950000 :
                      location === 'New York' ? 850000 :
                      location === 'Austin' ? 550000 :
                      location === 'Seattle' ? 750000 : 650000;
    
    const modifier = propertyType === 'Single Family' ? 1.2 :
                    propertyType === 'Condo' ? 0.8 :
                    propertyType === 'Townhouse' ? 1 : 1;
    
    const volatility = timeRange === '3 Months' ? 0.02 :
                      timeRange === '6 Months' ? 0.03 :
                      timeRange === '1 Year' ? 0.04 :
                      timeRange === '3 Years' ? 0.06 : 0.08;
    
    const pointCount = timeRange === '3 Months' ? 3 :
                       timeRange === '6 Months' ? 6 :
                       timeRange === '1 Year' ? 12 :
                       timeRange === '3 Years' ? 36 : 60;
    
    // Generate appropriate time labels based on selected timeRange
    const timeLabels = [];
    if (timeRange === '3 Months' || timeRange === '6 Months' || timeRange === '1 Year') {
      // For shorter timeframes, use month labels
      const currentMonth = new Date().getMonth();
      for (let i = 0; i < pointCount; i++) {
        const monthIndex = (currentMonth - pointCount + 1 + i) % 12;
        timeLabels.push(months[monthIndex < 0 ? monthIndex + 12 : monthIndex]);
      }
    } else {
      // For longer timeframes, use quarter labels
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      const currentYear = new Date().getFullYear();
      const currentQuarter = Math.floor(new Date().getMonth() / 3);
      
      for (let i = 0; i < pointCount / 3; i++) {
        const quarterOffset = i - pointCount / 3 + 1;
        const quarterIndex = (currentQuarter + quarterOffset) % 4;
        const yearOffset = Math.floor((currentQuarter + quarterOffset) / 4);
        const year = currentYear + yearOffset;
        
        timeLabels.push(`${quarters[quarterIndex < 0 ? quarterIndex + 4 : quarterIndex]} ${year}`);
      }
    }
    
    // Create data points with an upward trend and some random variation
    let currentPrice = basePrice * modifier;
    const growthTrend = 0.005; // 0.5% growth per period on average
    
    for (let i = 0; i < timeLabels.length; i++) {
      const randomVariation = (Math.random() * 2 - 1) * volatility;
      currentPrice = currentPrice * (1 + growthTrend + randomVariation);
      
      dataPoints.push({
        name: timeLabels[i],
        price: Math.round(currentPrice / 1000) * 1000, // Round to nearest thousand
        prediction: i >= timeLabels.length - 3 ? null : null, // No predictions for historical data
      });
    }
    
    // Add future predictions (next 3 periods)
    for (let i = 0; i < 3; i++) {
      let nextLabel;
      if (timeRange === '3 Months' || timeRange === '6 Months' || timeRange === '1 Year') {
        const nextMonthIndex = (new Date().getMonth() + i + 1) % 12;
        nextLabel = months[nextMonthIndex];
      } else {
        const currentQuarter = Math.floor(new Date().getMonth() / 3);
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        const nextQuarterIndex = (currentQuarter + i + 1) % 4;
        const yearOffset = Math.floor((currentQuarter + i + 1) / 4);
        const year = new Date().getFullYear() + yearOffset;
        nextLabel = `${quarters[nextQuarterIndex]} ${year}`;
      }
      
      const predictedGrowth = growthTrend + (Math.random() * 0.01) - 0.005;
      currentPrice = currentPrice * (1 + predictedGrowth);
      
      dataPoints.push({
        name: nextLabel,
        price: null, // No actual price for future periods
        prediction: Math.round(currentPrice / 1000) * 1000, // Round to nearest thousand
      });
    }
    
    return dataPoints;
  }, [location, propertyType, timeRange]);
  
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
          <p className="font-medium mb-1">{label}</p>
          {payload[0].value && (
            <p className="text-sm">
              Actual: <span className="font-medium">${payload[0].value.toLocaleString()}</span>
            </p>
          )}
          {payload[1].value && (
            <p className="text-sm">
              Predicted: <span className="font-medium">${payload[1].value.toLocaleString()}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
        />
        <YAxis 
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
          domain={['dataMin - 100000', 'dataMax + 100000']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#3b82f6" 
          strokeWidth={2.5}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
          isAnimationActive={true}
          animationDuration={1000}
          connectNulls
        />
        <Line 
          type="monotone" 
          dataKey="prediction" 
          stroke="#93c5fd" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4, strokeWidth: 2, fill: '#white' }}
          activeDot={{ r: 6, strokeWidth: 2 }}
          isAnimationActive={true}
          animationDuration={1000}
          animationBegin={300}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
