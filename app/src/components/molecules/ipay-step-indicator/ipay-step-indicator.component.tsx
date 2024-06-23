// StepIndicator.tsx
import React from 'react';
import { stepIndicatorStyles } from './ipay-step-indicator.style';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayView } from '@app/components/atoms';
import { StepIndicatorProps } from './ipay-step-indicator.interface';

const IPayStepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, testID }) => {
  const { colors } = useTheme();
  const styles = stepIndicatorStyles(colors);

  return (
    <IPayView testID={`${testID}-step-indicator`} style={styles.filledParent}>
      {Array.from({ length: steps }).map((_, index) => (
        <IPayView
          key={index}
          style={[styles.filledLayout, currentStep === index + 1 ? styles.filled : styles.filled1]}
        />
      ))}
    </IPayView>
  );
};

export default IPayStepIndicator;
