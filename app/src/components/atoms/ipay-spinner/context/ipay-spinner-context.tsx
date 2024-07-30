import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { IPaySpinnerProps } from '../ipay-spinner-interface';
import IPaySpinnerContainer from '../ipay-spinner.helper';
import useSpinner from '../ipay-spinner.hook';

interface SpinnerContextProps {
  showSpinner: (props: IPaySpinnerProps) => void;
  hideSpinner: () => void;
}

const spinnerContext = createContext<SpinnerContextProps | undefined>(undefined);

const SpinnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { visible, spinnerProps, showSpinner, hideSpinner } = useSpinner();
  const renderSpinner = useMemo(
    () => (
      <spinnerContext.Provider value={{ showSpinner, hideSpinner }}>
        {children}
        <IPaySpinnerContainer visible={visible} spinnerProps={spinnerProps} />
      </spinnerContext.Provider>
    ),
    [children, visible, spinnerProps, showSpinner, hideSpinner],
  );

  return renderSpinner;
};

const useSpinnerContext = (): SpinnerContextProps => {
  const context = useContext(spinnerContext);
  if (!context) {
    throw new Error('useSpinnerContext must be used within a SpinnerProvider');
  }
  return context;
};

export { SpinnerProvider, useSpinnerContext };
