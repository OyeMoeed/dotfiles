import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { States } from '@app/utilities/enums.util';
import { getBackgroundColor, getForegroundColor } from '@app/utilities/interface-utils';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

const styles = createStyleSheet({
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
  width100: {
    width: '100%',
  },
});

const getColorsStyle = (
  colors: any,
  variant: States,
  headingStyles?: StyleProp<TextStyle>,
): { textStyle: TextStyle; backgroundStyle: ViewStyle } => {
  // Initialize textStyle with color property
  let textStyle: TextStyle = {
    color: getForegroundColor(variant, colors),
    textAlign: 'left',
  };

  // Handle different types of headingStyles
  if (Array.isArray(headingStyles)) {
    headingStyles.forEach((style) => {
      if (style && typeof style === 'object') {
        textStyle = { ...textStyle, ...style };
      }
    });
  } else if (headingStyles && typeof headingStyles === 'object') {
    textStyle = { ...textStyle, ...headingStyles };
  }

  return {
    textStyle,
    backgroundStyle: {
      backgroundColor: getBackgroundColor(variant, colors),
      ...(styles.container as ViewStyle),
    },
  };
};

export { getColorsStyle, styles };
