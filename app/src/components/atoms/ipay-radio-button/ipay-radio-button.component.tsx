import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import IPayIcon from '../ipay-icon/ipay-icon.component';
import IPayPressable from '../ipay-pressable/ipay-pressable.component';
import { IPayRadioButtonProps } from './ipay-radio-button.interface';

const IPayRadioButton: React.FC<IPayRadioButtonProps> = ({ testID, isCheck, onPress, disabled }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (isCheck !== undefined) {
      setIsChecked(isCheck);
    }
  }, [isCheck]);

  const onPressRadioButton = () => {
    setIsChecked(!isChecked);
    if (onPress) onPress(); // Fixed this line, added parentheses
  };

  const iconColorDisabled = disabled ? colors.tertiary.tertiary100 : colors.tertiary.tertiary500;
  const iconColor = isChecked ? iconColorDisabled : colors.natural.natural0;

  return (
    <IPayPressable testID={`${testID}-radio-button`} onPress={onPressRadioButton}>
      <IPayIcon icon={icons.tick_check_mark_default} size={18} color={iconColor} />
    </IPayPressable>
  );
};

export default IPayRadioButton;
