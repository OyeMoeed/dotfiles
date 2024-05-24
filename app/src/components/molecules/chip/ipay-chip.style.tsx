
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { variants } from '@app/utilities/enums.util';
import { getBackgroundColor, getForegroundColor } from '@app/utilities/interfaceUtils';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = createStyleSheet({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    gap: moderateScale(8),
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(10),
    alignSelf: 'flex-start'
  },
  imageStyle: {
    width: moderateScale(16),
    height: moderateScale(16)
  }
});

export const getColorsStyle = (
  colors: any,
  variant: variants,
  headingStyles?: StyleProp<TextStyle> ,
): { textStyle: TextStyle; backgroundStyle: ViewStyle } => {
  return {
    textStyle: {
      color: getForegroundColor(variant, colors), // Set text color based on variant
      ...(headingStyles), 
    },
    backgroundStyle: {
      backgroundColor: getBackgroundColor(variant, colors), // Set background color based on variant
      ...styles.container,
    }
  };
};
export default styles;
