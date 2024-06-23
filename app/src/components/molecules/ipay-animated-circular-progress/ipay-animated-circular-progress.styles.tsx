// dynamicStyles.ts
import { StyleSheet, ViewStyle } from 'react-native';

// Define the interface for the styles
interface DynamicStyles {
  container: ViewStyle;
  childrenContainer: ViewStyle;
}

// Function to generate dynamic styles
export const getDynamicStyles = (size: number, padding: number): DynamicStyles => StyleSheet.create({
  container: {
    width: size + padding * 2,
    height: size + padding * 2,
  },
  childrenContainer: {
    position: 'absolute',
    top: padding,
    left: padding,
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
