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
  width = 'w-24 sm:w-56' 
}) => {
  return (
    <div 
      className={`flex flex-col items-center px-2 sm:px-3 py-2 sm:py-4 ${typeof width === 'string' && width.includes('w-') ? width : ''}`}
      style={{
        backgroundImage: 'url(/box/small-box.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
        ...(typeof width === 'string' && !width.includes('w-') && { width }),
      }}
    >
      <div className="flex items-center gap-1 mb-0.5 whitespace-nowrap">
        <PixelText 
          size="xs" 
          color="text-gray-900" 
          fontWeight={700} 
          style={{ fontSize: '6px' }}
          className="text-[0.4rem] sm:text-[0.5rem]"
        >
          {label}
        </PixelText>
      </div>
      <PixelText size="base" color="text-gray-900" fontWeight={700} className="text-sm sm:text-base">
        {value}
      </PixelText>
    </div>
  );
};

export default StatsBox;
