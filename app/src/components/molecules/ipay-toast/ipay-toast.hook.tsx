import { useCallback, useState } from 'react';
import { ToastHookProps } from './ipay-toast.interface';

const useToast = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [toastProps, setToastProps] = useState<ToastHookProps>({});
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (props: ToastHookProps, duration: number = 4000) => {
      setToastProps(props);
      setVisible(true);

      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }

      if (!props?.rightIcon && duration > 0) {
        const timeout = setTimeout(() => {
          setVisible(false);
        }, duration);
        setHideTimeout(timeout);
      }
    },
    [hideTimeout],
  );

  const hideToast = useCallback(() => {
    setVisible(false);
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
  }, [hideTimeout]);

  return { visible, toastProps, showToast, hideToast };
};

export default useToast;
