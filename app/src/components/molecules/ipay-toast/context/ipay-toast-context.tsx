import React, { ReactNode, createContext, useContext } from 'react';
import IPayToastContainer from '../ipay-toast.helper';
import useToast from '../ipay-toast.hook';
import { ToastHookProps } from '../ipay-toast.interface';

interface ToastContextProps {
  showToast: (props: ToastHookProps, duration?: number) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { visible, toastProps, showToast, hideToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <IPayToastContainer visible={visible} toastProps={toastProps} hideToast={hideToast} />
    </ToastContext.Provider>
  );
};

const useToastContext = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToastContext };
