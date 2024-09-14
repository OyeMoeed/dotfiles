import React, { JSX } from 'react';
import { IPayPressable, IPayText, IPayView } from '@app/components/atoms';
import { IPayStepperProps } from './ipay-stepper.interface';
import styles from './ipay-stepper.style';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayStepper: React.FC<IPayStepperProps> = ({ testID, onPressUp, onPressDown }: IPayStepperProps): JSX.Element => (
  <IPayView testID={testID} style={styles.counterContainerStyle}>
    <IPayPressable onPress={onPressUp} style={styles.counterButtonContainer}>
      <IPayText style={styles.counterTextStyle}>-</IPayText>
    </IPayPressable>
    <IPayView style={styles.counterBorder} />
    <IPayPressable onPress={onPressDown} style={styles.counterButtonContainer}>
      <IPayText style={styles.counterTextStyle}>+</IPayText>
    </IPayPressable>
  </IPayView>
);

export default IPayStepper;
