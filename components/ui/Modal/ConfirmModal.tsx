import React from 'react';
import PixelText from '../Text/PixelText';
import SpriteButton from '../Button/SpriteButton';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black p-6 max-w-md w-full shadow-lg">
        {/* Título */}
        <div className="mb-4">
          <PixelText size="sm" fontWeight={700} color="text-black">
            {title}
          </PixelText>
        </div>

        {/* Mensaje */}
        <div className="mb-6">
          <PixelText size="xs" color="text-gray-700">
            {message}
          </PixelText>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gray-200 border-2 border-gray-900 font-press-start text-[0.6rem] text-black hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-200 border-2 border-blue-900 font-press-start text-[0.6rem] text-black hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Enviando...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
