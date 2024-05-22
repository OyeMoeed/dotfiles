import { IPayPressable, IPayText } from '@components/atoms/index';
import React from 'react';
import { IPayButtonProps } from './ipay-button.interface';
import styles from './ipay-button.style';

/**
 * A customizable button component.
 * @param {IPayButtonProps} props - The props for the RNButton component.
 * @returns {JSX.Element} - The rendered component.
 */

const IPayButton: React.FC<IPayButtonProps> = ({
  testID,
  onPress,
  btnText,
  btnStyle,
  textStyle
}: IPayButtonProps): JSX.Element => {
  return (
    <IPayPressable testID={`${testID}-presseable-button`} onPress={onPress} style={[styles.buttonStyles, btnStyle]}>
      <IPayText text={btnText} style={[styles.btnTextStyle, textStyle]} />
    </IPayPressable>
  );
};

export default IPayButton;
