import React from 'react';
import { Pressable } from 'react-native';
import { IPayPressableProps } from './ipay-pressable.interface';
import styles from './ipay-pressable.style';

/**
 * A component that responds to press interactions.
 * @param {IPayPressableProps} props - The props for the RNPressable component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayPressable: React.FC<IPayPressableProps> = ({
  testID,
  children,
  style,
  disabled,
  activeOpacity,
  onPress,
  onPressIn,
  onPressOut
}: IPayPressableProps): JSX.Element => {
  return (
    <Pressable
      testID={`${testID}-pressable`}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: pressed ? activeOpacity : 1
        },
        style
      ]}
      disabled={disabled}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {children}
    </Pressable>
  );
};

export default IPayPressable;
