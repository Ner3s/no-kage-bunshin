import { createContext, useContext, useEffect, useState } from 'react';

import { Toast, ToastProps } from '@/components/ui/toast';

type TShowToast = { duration?: number } & Omit<ToastProps, 'hideToast'>;

interface IToastContext {
  toastData: TShowToast;
  showToast: (data: TShowToast) => void;
  hideToast: () => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastData, setToastData] = useState<TShowToast>({
    message: '',
    type: 'success',
    duration: 3000
  });

  const showToast = (data: TShowToast) => {
    setToastData({ ...data, duration: data.duration || 3000, isVisible: true });
  };
  const hideToast = () => {
    setToastData((prevState) => ({
      ...prevState,
      isVisible: false
    }));
  };

  useEffect(() => {
    if (toastData.isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, toastData.duration);

      return () => clearTimeout(timer);
    }
  }, [toastData.isVisible, toastData.duration]);

  return (
    <ToastContext.Provider value={{ hideToast, showToast, toastData }}>
      <Toast {...toastData} hideToast={hideToast} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
