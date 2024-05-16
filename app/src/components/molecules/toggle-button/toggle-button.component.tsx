import React, { useEffect, useState } from 'react';
import { RNPressable, RNView } from '@components/atoms';
import { ToggleButtonProps } from './toggle-button.interface';
import styles from './toggle-button.style';

/**
 * ToggleButton component for toggling between two states.
 * @param {ToggleButtonProps} props - Props for the ToggleButton component.
 * @returns {JSX.Element} A ToggleButton component.
 */
const ToggleButton: React.FC<ToggleButtonProps> = ({
  testID,
  style,
  toggleState,
  onToggleChange = () => {}
}: ToggleButtonProps): JSX.Element => {
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
    <RNPressable
      testID={testID}
      activeOpacity={1}
      style={[styles.container, isOn ? styles.isOnParent : styles.isOffParent, style]}
      onPress={onPress}
    >
      <RNView style={[styles.childContainer, isOn ? styles.isOnChild : styles.isOffChild]} />
    </RNPressable>
  );
};

export default ToggleButton;
