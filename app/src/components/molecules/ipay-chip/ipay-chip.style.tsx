import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { variants } from '@app/utilities/enums.util';
import { getBackgroundColor, getForegroundColor } from '@app/utilities/interfaceUtils';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { scaleSize } from '../../../styles/mixins';

export const styles = createStyleSheet({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleSize(8),
    gap: scaleSize(8),
    paddingVertical: scaleSize(2),
    paddingHorizontal: scaleSize(10),
    alignSelf: 'flex-start',
  },
  imageStyle: {
    width: scaleSize(16),
    height: scaleSize(16),
  },
});

export const getColorsStyle = (
  colors: any,
  variant: variants,
  headingStyles?: StyleProp<TextStyle>,
): { textStyle: TextStyle; backgroundStyle: ViewStyle } => ({
  textStyle: {
    color: getForegroundColor(variant, colors), // Set text color based on variant
    ...headingStyles,
  },
  backgroundStyle: {
    backgroundColor: getBackgroundColor(variant, colors), // Set background color based on variant
    ...styles.container,
  },
});
export default styles;
