import useTheme from '@app/styles/hooks/theme.hook';
import { IPayIcon, IPayPressable } from '@components/atoms/index';
import React, { useEffect, useState } from 'react';
import { IPayCheckboxProps } from './ipay-checkbox.interface';
import styles from './ipay-checkbox.style';
import icons from '@app/assets/icons';

const IPayCheckbox: React.FC<IPayCheckboxProps> = ({
  testID,
  isCheck,
  style,
  disabled,
  checkboxBackgroundColor,
  onPress,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (isCheck != undefined) {
      setIsChecked(isCheck);
    }
  }, [isCheck]);

  const defaultBackgroundColor = checkboxBackgroundColor || colors.tertiary.tertiary500;
  const backgroundColor = isChecked
    ? disabled
      ? colors.tertiary.tertiary100
      : defaultBackgroundColor
    : colors.natural.natural0;
  const borderColor = isChecked
    ? disabled
      ? colors.tertiary.tertiary100
      : defaultBackgroundColor
    : colors.natural.natural500;

  const handlePress = () => {
    setIsChecked((prev) => !prev);
    if (onPress) onPress();
  };

  const element =
    (isChecked && (
      <IPayIcon icon={icons.tick_check_mark_default} size={15} color={colors.natural.natural0} />
    )) ||
    undefined;

  return (
    <IPayPressable
      testID={`${testID}-checkbox`}
      disabled={disabled}
      style={[
        styles.container,

        {
          backgroundColor,
          borderColor,
        },
        style,
      ]}
      onPress={handlePress}
    >
      {element}
    </IPayPressable>
  );
};

export default IPayCheckbox;