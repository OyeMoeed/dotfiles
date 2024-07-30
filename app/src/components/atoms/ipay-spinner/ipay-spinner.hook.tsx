import { useCallback, useState } from 'react';
import { IPaySpinnerProps } from './ipay-spinner-interface';

const useSpinner = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [spinnerProps, setSpinnerProps] = useState<IPaySpinnerProps>({});

  const showSpinner = useCallback((props: IPaySpinnerProps) => {
    setSpinnerProps(props);
    setVisible(true);
  }, []);

  const hideSpinner = useCallback(() => {
    setVisible(false);
  }, []);

  return { visible, spinnerProps, showSpinner, hideSpinner };
};

export default useSpinner;
