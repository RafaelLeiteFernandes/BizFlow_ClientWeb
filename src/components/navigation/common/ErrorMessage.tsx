import React from 'react';

interface ErrorMessageProps {
    message: string | null;
    onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
    const timer = setTimeout(() => {
        onClose();
    }, 30000);
    if (!message) return null;

    return (
        <div className="fixed top-10 right-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center z-50 shadow-md" role="alert">
            <span className="block sm:inline">{message}</span>
            <button onClick={onClose} className="ml-4 text-red-700 hover:text-red-900">
                <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 14.849a1 1 0 001.415-1.414L11.414 10l4.349-4.349a1 1 0 10-1.415-1.415L10 8.586 5.651 4.237a1 1 0 10-1.415 1.415L8.586 10l-4.35 4.35a1 1 0 101.415 1.415L10 11.414l4.348 4.348z"/>
                </svg>
            </button>
        </div>
    );
};

export default ErrorMessage;
