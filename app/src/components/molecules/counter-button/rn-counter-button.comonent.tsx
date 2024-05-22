import React from 'react';
import { RNCounterButtonProps } from './rn-counter-button.interface';
import styles from './rn-counter-button.style';
import { RNPressable, RNText, RNView } from '@app/components/atoms';
import { TouchableOpacity } from 'react-native';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the RNText component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNCounterButton: React.FC<RNCounterButtonProps> = ({
    testID,
  onPressUp,
  onPressDown
}: RNCounterButtonProps): JSX.Element => {
  return (
    <RNView testID={testID} style={styles.counterContainerStyle}>
      <RNPressable onPress={onPressUp}>
        <RNText style={styles.counterTextStyle}>-</RNText>
      </RNPressable>
      <RNView style={styles.counterBorder} />
      <RNPressable onPress={onPressDown}>
        <RNText style={styles.counterTextStyle}>+</RNText>
      </RNPressable>
    </RNView>
  );
};

export default RNCounterButton;
