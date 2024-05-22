import React from 'react';
import { IPayCounterButtonProps } from './ipay-counter-button.interface';
import styles from './ipay-counter-button.style';
import { RNPressable, RNText, RNView } from '@app/components/atoms';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the RNText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayCounterButton: React.FC<IPayCounterButtonProps> = ({
  testID,
  onPressUp,
  onPressDown
}: IPayCounterButtonProps): JSX.Element => {
  return (
    <RNView testID={testID} style={styles.counterContainerStyle}>
      <RNPressable onPress={onPressUp} style={styles.counterButtonContainer}>
        <RNText style={styles.counterTextStyle}>-</RNText>
      </RNPressable>
      <RNView style={styles.counterBorder} />
      <RNPressable onPress={onPressDown} style={styles.counterButtonContainer}>
        <RNText style={styles.counterTextStyle}>+</RNText>
      </RNPressable>
    </RNView>
  );
};

export default IPayCounterButton;
