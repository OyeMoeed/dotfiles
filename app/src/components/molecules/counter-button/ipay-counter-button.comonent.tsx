import React from 'react';
import { IPayCounterButtonProps } from './ipay-counter-button.interface';
import styles from './ipay-counter-button.style';
import { IPayPressable, IPayText, IPayView } from '@app/components/atoms';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayCounterButton: React.FC<IPayCounterButtonProps> = ({
  testID,
  onPressUp,
  onPressDown
}: IPayCounterButtonProps): JSX.Element => {
  return (
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
};

export default IPayCounterButton;
