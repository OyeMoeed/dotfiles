import React from 'react';
import { RNText, RNPressable } from '@components/atoms/index';
import styles from './rn-button.style';
import { RNButtonProps } from './rn-button.interface';
import { buttonVariants } from '@app/utilities/enums';

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
  textStyle,
  variant = buttonVariants.OUTLINED
}: RNButtonProps): JSX.Element => {
  return (
    <RNPressable testID={testID} onPress={onPress} style={[variant == buttonVariants.OUTLINED ? styles.buttonOutline : styles.buttonSolid, btnStyle]}>
      <RNText text={btnText} style={[variant == buttonVariants.OUTLINED ? styles.buttonText : styles.buttonTextSolid, textStyle]} />
    </RNPressable>
  );
};

export default RNButton;
