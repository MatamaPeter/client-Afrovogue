import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-start justify-end">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      ></div>
      <div className="bg-white dark:bg-gray-900 w-full max-w-md h-full shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto">
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4 sm:p-5 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 sm:p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;