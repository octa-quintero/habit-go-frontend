import React from 'react';
import PixelText from '../Text/PixelText';
import SpriteButton from '../Button/SpriteButton';

interface InfoModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  variant?: 'success' | 'error' | 'info';
}

const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  variant = 'info',
}) => {
  if (!isOpen) return null;

  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 border-green-500';
      case 'error':
        return 'bg-red-50 border-red-500';
      default:
        return 'bg-blue-50 border-blue-500';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${getBackgroundColor()} border-4 p-6 max-w-md w-full shadow-lg`}>
        {/* Icono y Título */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">{getIcon()}</div>
          <div className="flex-1">
            {title && (
              <PixelText size="sm" fontWeight={700} color="text-black">
                {title}
              </PixelText>
            )}
          </div>
        </div>

        {/* Mensaje */}
        <div className="mb-6">
          <PixelText size="xs" color="text-gray-900">
            {message}
          </PixelText>
        </div>

        {/* Botón */}
        <div className="flex justify-center">
          <SpriteButton
            label="Entendido"
            onClick={onClose}
            minWidth={140}
            maxWidth={140}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
