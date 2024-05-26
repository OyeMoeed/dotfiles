import TickMark from '@app/assets/svgs/tick-mark';
import React, { useState } from 'react';

import useTheme from '@app/styles/hooks/theme.hook';
import IPayPressable from '../pressable/ipay-pressable.component';
import { RNRadioButtonProps } from './rn-radio-button.interface';
import styles from './rn-radio-button.style';

const RNRadioButton: React.FC<RNRadioButtonProps> = ({ testID, onPress, disabled }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { colors } = useTheme();

  const onPressRadioButton = () => {
    setIsChecked(!isChecked);
    onPress && onPress(); // Fixed this line, added parentheses
  };

  const iconColor = isChecked
    ? disabled
      ? colors.tertiary.tertiary100
      : colors.tertiary.tertiary500
    : colors.natural.natural0;

  return (
    <IPayPressable testID={testID} onPress={onPressRadioButton}>
      <TickMark width={styles.image.width} height={styles.image.height} color={iconColor} />
    </IPayPressable>
  );
};

export default RNRadioButton;
