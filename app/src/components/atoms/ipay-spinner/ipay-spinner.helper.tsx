import { IPaySpinner } from '@app/components/atoms';
import React from 'react';
import { IPaySpinnerContainerProps } from './ipay-spinner-interface';

const IPaySpinnerContainer: React.FC<IPaySpinnerContainerProps> = ({ visible, spinnerProps }) => {
  if (!visible) {
    return null;
  }

  return (
    <IPaySpinner
      testID="spinner"
      text={spinnerProps?.text}
      variant={spinnerProps?.variant}
      color={spinnerProps?.color}
      hasBackgroundColor={spinnerProps?.hasBackgroundColor}
    />
  );
};

export default IPaySpinnerContainer;
