import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'milestone';
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-900/90 border-green-700 text-green-100',
    error: 'bg-red-900/90 border-red-700 text-red-100',
    info: 'bg-blue-900/90 border-blue-700 text-blue-100',
    milestone: 'bg-purple-900/90 border-purple-700 text-purple-100',
  };

  return (
    <div
      className={`p-4 rounded-lg border backdrop-blur-sm pointer-events-auto ${typeStyles[type]} animate-in fade-in slide-in-from-right-4`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-lg hover:opacity-70 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
