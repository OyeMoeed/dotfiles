import React from 'react';
import { RNText, RNPressable } from '@components/atoms/index';
import styles from './rn-button.style';
import { RNButtonProps } from './rn-button.interface';

/**
 * A customizable button component.
 * @param {RNButtonProps} props - The props for the RNButton component.
 * @returns {JSX.Element} - The rendered component.
 */

const RNButton: React.FC<RNButtonProps> = ({
  testID,
  onPress,
  btnText,
  btnStyle,
  textStyle
}: RNButtonProps): JSX.Element => {
  return (
    <RNPressable testID={testID} onPress={onPress} style={[styles.buttonStyles, btnStyle]}>
      <RNText text={btnText} style={[styles.btnTextStyle, textStyle]} />
    </RNPressable>
  );
};

export default RNButton;
