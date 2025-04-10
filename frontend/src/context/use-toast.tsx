import { createContext, useContext, useEffect, useState } from 'react';

import { Toast, ToastContainer } from '@/components/ui/toast';

export type ToastData = {
  id: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  isVisible?: boolean;
};

interface IToastContext {
  toasts: ToastData[];
  showToast: (data: Omit<ToastData, 'id' | 'isVisible'>) => void;
  hideToast: (id: string) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastContext = createContext<IToastContext | undefined>(undefined);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (data: Omit<ToastData, 'id' | 'isVisible'>) => {
    const id = Date.now().toString();
    const newToast = {
      ...data,
      id,
      duration: data.duration || 3000,
      isVisible: true
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const hideToast = (id: string) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );
  };

  useEffect(() => {
    const visibleToasts = toasts.filter((toast) => toast.isVisible);

    if (visibleToasts.length > 0) {
      const timers = visibleToasts.map((toast) => {
        return setTimeout(() => {
          hideToast(toast.id);
        }, toast.duration);
      });

      return () => timers.forEach(clearTimeout);
    }
  }, [toasts]);

  useEffect(() => {
    const invisibleToasts = toasts.filter((toast) => toast.isVisible === false);

    if (invisibleToasts.length > 0) {
      const timers = invisibleToasts.map((toast) => {
        return setTimeout(() => {
          setToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== toast.id)
          );
        }, 300);
      });

      return () => timers.forEach(clearTimeout);
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, hideToast, showToast }}>
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            hideToast={() => hideToast(toast.id)}
          />
        ))}
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
