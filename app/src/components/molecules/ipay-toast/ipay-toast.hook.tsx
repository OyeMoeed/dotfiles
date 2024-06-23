import { useCallback, useState } from 'react';
import { ToastHookProps } from './ipay-toast.interface';

const useToast = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [toastProps, setToastProps] = useState<ToastHookProps>({});

  const showToast = useCallback((props: ToastHookProps) => {
    setToastProps(props);
    setVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  return { visible, toastProps, showToast, hideToast };
};

export default useToast;
