import { SCALE_10, SCALE_12, SCALE_16, SCALE_2, SCALE_8 } from '@app/styles/spacing.styles';
import { variants } from '@app/utilities/enums';
import { getBackgroundColor, getForegroundColor } from '@app/utilities/interfaceUtils';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SCALE_12,
    gap: SCALE_8,
    paddingVertical: SCALE_2,
    paddingHorizontal: SCALE_10,
    alignSelf: 'flex-start'
  },
  imageStyle: {
    width: SCALE_16,
    height: SCALE_16
  }
});

export const getColorsStyle = (
  variant: variants,
  headingStyles?: TextStyle
): { textStyle: TextStyle; backgroundStyle: ViewStyle } => {
  return {
    textStyle: {
      ...(headingStyles || {}), // Apply additional heading styles if provided
      color: getForegroundColor(variant) // Set text color based on variant
    },
    backgroundStyle: {
      ...styles.container,
      backgroundColor: getBackgroundColor(variant) // Set background color based on variant
    }
  };
};
export default styles;
