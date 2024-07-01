import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const addCardBottomSheetStyles = (colors) =>
  createStyleSheet({
    inputField2: {
      width: scaleSize(135),
      paddingRight: scaleSize(40),
      marginTop: scaleSize(12),
    },
    inputField: {
      marginTop: scaleSize(12),
      paddingRight: scaleSize(40),
    },
    inputFieldEditing: {
      marginTop: scaleSize(12),
      width: '100%',
      borderRadius: moderateScale(16),
      backgroundColor: colors.natural.natural0,
      borderColor: colors.primary.primary100,
    },
    inputField3: {
      width: scaleSize(135),
      borderRadius: moderateScale(16),
      backgroundColor: colors.natural.natural0,
      borderColor: colors.primary.primary100,
      marginTop: scaleSize(12),
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
  });
export default addCardBottomSheetStyles;
