import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const textInputStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      height: scaleSize(56),
      borderRadius: scaleSize(22),
      borderWidth: 1,
      borderColor: themeColors.primary.primary100,
      paddingHorizontal: scaleSize(20),
      paddingVertical: scaleSize(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    label: {
      color: themeColors.primary.primary600,
    },
    iconAndInputStyles: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: scaleSize(8),
    },
    textInputStyle: {
      color: themeColors.natural.natural900,
      justifyContent: 'center',
    },
    outerView: {
      flex: 1,
      paddingBottom: moderateScale(3),
    },
    errorContainer: {
      borderColor: themeColors.error.error500,
    },
    focusedContainer: {
      borderColor: themeColors.primary.primary500,
    },
    disabledContainer: {
      backgroundColor: themeColors.natural.natural200,
      borderColor: themeColors.natural.natural200,
    },
    outerWrapper: {
      gap: scaleSize(8),
    },
    disableLabel: {
      color: themeColors.natural.natural500,
    },
    errorAssistiveTextText: {
      color: themeColors.error.error500,
      width: scaleSize(140),
    },
    assistiveText: {
      color: themeColors.natural.natural500,
    },

    closeIcon: {},
  });

export default textInputStyles;
