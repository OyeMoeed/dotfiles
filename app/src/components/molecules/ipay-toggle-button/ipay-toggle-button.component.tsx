import useTheme from '@app/styles/hooks/theme.hook';
import { IPayPressable, IPayView } from '@components/atoms';
import React, { JSX, useEffect, useState } from 'react';
import { IPayToggleButtonProps } from './ipay-toggle-button.interface';
import toggleButtonStyles from './ipay-toggle-button.style';

/**
 * ToggleButton component for toggling between two states.
 * @param {IPayToggleButtonProps} props - Props for the ToggleButton component.
 * @returns {JSX.Element} A ToggleButton component.
 */
const IPayToggleButton: React.FC<IPayToggleButtonProps> = ({
  testID,
  style,
  toggleState,
  disabled,
  onToggleChange = () => {},
}: IPayToggleButtonProps): JSX.Element => {
  const [isOn, setIsOn] = useState<boolean>(true);
  const { colors } = useTheme();
  const styles = toggleButtonStyles(colors);

  useEffect(() => {
    if (toggleState !== undefined) {
      setIsOn(toggleState);
    }
  }, [isOn, toggleState]);

  const onPress = () => {
    setIsOn((prevState: boolean) => {
      const newState = !prevState;
      onToggleChange(newState);
      return newState;
    });
  };

  const notDisabledIsOn = isOn ? colors.tertiary.tertiary500 : colors.natural.natural200;
  const disabledColorToggleOn = toggleState ? colors.tertiary.tertiary100 : colors.natural.natural200;

  const disabledColor = {
    backgroundColor: disabled ? disabledColorToggleOn : notDisabledIsOn,
  };

  const toggleBtnStyles = isOn ? styles.isOnParent : styles.isOffParent;

  return (
    <IPayPressable
      testID={`${testID}-pressable-toggle`}
      activeOpacity={1}
      style={[styles.container, toggleBtnStyles, disabledColor, style]}
      onPress={onPress}
    >
      <IPayView style={[styles.childContainer, isOn ? styles.isOnChild : styles.isOffChild]} />
    </IPayPressable>
  );
};

export default IPayToggleButton;
