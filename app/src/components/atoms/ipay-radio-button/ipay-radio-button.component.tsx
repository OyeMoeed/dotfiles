import React, { useEffect, useState } from 'react';

import useTheme from '@app/styles/hooks/theme.hook';
import { IPayPressable } from '@components/atoms/index';
import { IPayRadioButtonProps } from './ipay-radio-button.interface';
import radioButtonStyles from './ipay-radio-button.style';

const IPayRadioButton: React.FC<IPayRadioButtonProps> = ({ testID, isCheck, onPress, disabled }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { colors } = useTheme();
  const styles = radioButtonStyles(colors);

  useEffect(() => {
    if (isCheck != undefined) {
      setIsChecked(isCheck);
    }
  }, [isCheck]);

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
    <IPayPressable testID={`${testID}-radio-button`} onPress={onPressRadioButton}>
       <IPayIcon icon={icons.tick_check_mark_default} size={15} color={iconColor} />
    </IPayPressable>
  );
};

export default IPayRadioButton;
