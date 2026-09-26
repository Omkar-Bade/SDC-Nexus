import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icon =
          toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-[#FF5500] shrink-0" />
          );

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between p-3.5 bg-[#14151A] border border-white/15 text-[#F3F4F6] text-sm rounded-xl shadow-xl shadow-black/60 animate-in slide-in-from-bottom-2 duration-200"
          >
            <div className="flex items-center gap-3">
              {icon}
              <span>{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#9CA3AF] hover:text-[#F3F4F6] p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
