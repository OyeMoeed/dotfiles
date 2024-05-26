import { IPayPressable, IPayView } from '@components/atoms';
import React, { useEffect, useState } from 'react';
import { IPayToggleButtonProps } from './ipay-toggle-button.interface';
import styles from './ipay-toggle-button.style';

/**
 * ToggleButton component for toggling between two states.
 * @param {IPayToggleButtonProps} props - Props for the ToggleButton component.
 * @returns {JSX.Element} A ToggleButton component.
 */
const IPayToggleButton: React.FC<IPayToggleButtonProps> = ({
  testID,
  style,
  toggleState,
  onToggleChange = () => {}
}: IPayToggleButtonProps): JSX.Element => {
  const [isOn, setIsOn] = useState<boolean>(true);

  useEffect(() => {
    if (toggleState !== undefined) {
      setIsOn(toggleState);
    }
  }, [toggleState]);

  const onPress = () => {
    setIsOn((prevState: boolean) => {
      const newState = !prevState;
      onToggleChange(newState);
      return newState;
    });
  };

  return (
    <IPayPressable
      testID={`${testID}-pressable-toggle`}
      activeOpacity={1}
      style={[styles.container, isOn ? styles.isOnParent : styles.isOffParent, style]}
      onPress={onPress}
    >
      <IPayView style={[styles.childContainer, isOn ? styles.isOnChild : styles.isOffChild]} />
    </IPayPressable>
  );
};

export default IPayToggleButton;
