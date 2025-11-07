import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  children,
  className = '' 
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50"
      onClick={onClose}
    >
      <div 
        className={`bg-slate-900 border border-purple-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

