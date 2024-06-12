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
  onPressOut,
  onLongPress,
  accessibilityRole,
  accessibilityState,
  accessibilityLabel
}: IPayPressableProps): JSX.Element => (
  <Pressable
    accessibilityRole={accessibilityRole}
    accessibilityState={accessibilityState}
    accessibilityLabel={accessibilityLabel}
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
    onLongPress={onLongPress}
  >
    {children}
  </Pressable>
);

export default IPayPressable;
