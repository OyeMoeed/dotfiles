import { scaleSize, widthPercent } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const addCardBottomSheetStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    inputField2: {
      width: widthPercent('37%'),
      paddingRight: scaleSize(40),
      marginTop: scaleSize(12),
    },
    inputField: {
      marginTop: scaleSize(12),
      paddingRight: scaleSize(40),
    },
    inputFieldEditing: {
      height: verticalScale(50),
      marginTop: scaleSize(12),
      width: '100%',
      borderRadius: moderateScale(16),
      backgroundColor: colors.natural.natural0,
      borderColor: colors.primary.primary100,
    },
    inputStyle: {
      paddingVertical: -12,
    },
    inputField3: {
      width: widthPercent('37%'),
      borderRadius: moderateScale(16),
      backgroundColor: colors.natural.natural0,
      borderColor: colors.primary.primary100,
      marginTop: scaleSize(12),
      height: verticalScale(50),
    },
    cardContainer: {
      paddingVertical: scaleSize(20),
      paddingHorizontal: scaleSize(20),
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(16),
      marginVertical: scaleSize(16),
    },
    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: moderateScale(12),
    },

    inputToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scaleSize(16),
    },
    cardRow: {
      flexDirection: 'row',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    toggle: {
      height: scaleSize(31),
      width: scaleSize(51),
    },
    icongap: {
      marginLeft: scaleSize(8),
    },
    cardNameInput: {
      marginTop: scaleSize(12),
      paddingRight: scaleSize(40),
    },
    container: {
      marginHorizontal: scaleSize(32),
    },
    imageStyles: { width: scaleSize(28), height: scaleSize(20) },
    cardIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
    },
  });
export default addCardBottomSheetStyles;
