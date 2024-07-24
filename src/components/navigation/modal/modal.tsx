// Modal.tsx
import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="modal-container bg-white rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <p className="mb-4">{message}</p>
            <div className="flex justify-end">
              <button
                onClick={onConfirm}
                className="bg-blue-500 text-white font-bold py-2 px-4 mr-2 rounded"
              >
                Confirmar
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
