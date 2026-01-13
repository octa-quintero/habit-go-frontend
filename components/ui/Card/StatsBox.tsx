import React from 'react';
import PixelText from '../Text/PixelText';

interface StatsBoxProps {
  label: string;
  value: string | number;
  width?: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ 
  label, 
  value,
  width = '200px' 
}) => {
  return (
    <div 
      className="flex flex-col items-center px-3 py-4"
      style={{
        backgroundImage: 'url(/box/small-box.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
        width,
      }}
    >
      <div className="flex items-center gap-1 mb-0.5 whitespace-nowrap">
        <PixelText 
          size="xs" 
          color="text-gray-900" 
          fontWeight={700} 
          style={{ fontSize: '7px' }}
        >
          {label}
        </PixelText>
      </div>
      <PixelText size="base" color="text-gray-900" fontWeight={700}>
        {value}
      </PixelText>
    </div>
  );
};

export default StatsBox;
