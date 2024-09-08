// dynamicStyles.ts
import { StyleSheet, ViewStyle } from 'react-native';

// Define the interface for the styles
interface DynamicStyles {
  container: ViewStyle;
  childrenContainer: ViewStyle;
}

// Function to generate dynamic styles
const getDynamicStyles = (size: number, padding: number): DynamicStyles =>
  StyleSheet.create({
    childrenContainer: {
      alignItems: 'center',
      height: size,
      justifyContent: 'center',
      left: padding,
      position: 'absolute',
      top: padding,
      width: size,
    },
    container: {
      height: size + padding * 2,
      width: size + padding * 2,
    },
  });

export default getDynamicStyles;
