import React from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalForm: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full">
        <button className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalForm;
