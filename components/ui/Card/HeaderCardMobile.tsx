import React from 'react';

interface HeaderCardMobileProps {
  children: React.ReactNode;
}

const HeaderCardMobile: React.FC<HeaderCardMobileProps> = ({ children }) => {
  return (
    <div 
      className="relative mx-auto sm:hidden"
      style={{
        width: '100%',
        height: 'auto',
        minHeight: '25vh',
        maxWidth: '100%',
        backgroundImage: 'url(/card/card-mobile1.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        imageRendering: 'pixelated',
      }}
    >
      <div 
        className="flex flex-col gap-2 h-full justify-start" 
        style={{ padding: '8% 5% 8% 5%', width: '100%' }}
      >
        {children}
      </div>
    </div>
  );
};

export default HeaderCardMobile;
