import React from 'react';

interface HeaderCardProps {
  children: React.ReactNode;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ children }) => {
  return (
    <div 
      className="relative mx-auto"
      style={{
        width: '900px',
        maxWidth: '90vw',
        aspectRatio: '900 / 350',
        backgroundImage: 'url(/card/card%201.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    >
      <div 
        className="flex flex-col gap-6 h-full justify-center" 
        style={{ padding: '8% 10% 13% 10%', width: '100%' }}
      >
        {children}
      </div>
    </div>
  );
};

export default HeaderCard;
