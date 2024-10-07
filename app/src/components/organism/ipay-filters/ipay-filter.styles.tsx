import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_13, FONT_SIZE_17, FONT_SIZE_8, FONT_WEIGHT_BOLD, fonts } from '@app/styles/typography.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const IPayFilterStyles = (colors) =>
  createStyleSheet({
    filtersContainer: {
      flex: 1,
    },
    inputContainer: {
      width: '96%',
      flex: 1,
      alignSelf: 'center',
      paddingRight: moderateScale(20),
      paddingLeft: moderateScale(10),
    },
    actionButtonStyle: {
      width: scaleSize(110),
    },
    listStyle: {
      marginBottom: moderateScale(8),
    },
    inputContainerStyle: {
      width: '100%',
      paddingHorizontal: moderateScale(40),
      marginTop: moderateScale(12),
      borderRadius: moderateScale(22),
      backgroundColor: colors.natural.natural0,
    },
    input: {
      borderRadius: moderateScale(24),
    },
    buttonWrapper: {
      width: '100%',
      justifyContent: 'center',
      marginTop: moderateScale(8),
      marginBottom: isIosOS ? moderateScale(80) : moderateScale(16),
    },
    applyButton: {
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(14),
      height: moderateScale(50),
    },
    amount: {
      width: scaleSize(130),
    },
    date: {
      width: scaleSize(130),
      fontSize: FONT_SIZE_8,
      borderRadius: moderateScale(16, 0.3),
    },
    amountCard: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(10),
      padding: scaleSize(20),
      marginVertical: scaleSize(8),
    },
    rowInputHeading: {
      flexDirection: 'row',
      gap: scaleSize(8),
      marginBottom: scaleSize(10),
    },
    rowInputHeadingText: {
      fontSize: FONT_SIZE_13,
      fontFamily: fonts.BOLD,
      fontWeight: FONT_WEIGHT_BOLD,
    },
    rowInput: {
      flexDirection: 'row',
      gap: scaleSize(10),
    },
    dateHeading: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(10),
      padding: scaleSize(20),
    },
    dropdownIcon: {
      paddingLeft: scaleSize(2),
    },
    datePicker: {},
    datePickerContainer: {
      marginRight: scaleSize(-20),
    },
    datePickerAndroidStyle: {
      backgroundColor: 'transparent',
      width: '90%',
    },
    valuesContainer: {
      flex: 1,
      minHeight: '100%',
    },
    bankImage: {
      width: scaleSize(24),
      height: verticalScale(24),
      resizeMode: 'contain',
    },
    searchInputStyle: {
      height: verticalScale(36),
      marginBottom: scaleFont(16),
      backgroundColor: colors.natural.natural0,
      width: scaleSize(310),
    },
    searchInput: {
      height: verticalScale(36),
    },
    noRecordContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noRecordWrapper: {
      gap: moderateScale(12),
      width: scaleSize(150),
    },
    inputStyle: {
      fontSize: FONT_SIZE_17,
      paddingBottom: 0,
    },
    inputStyleAndroid: {
      paddingBottom: moderateScale(5),
      height: verticalScale(40),
    },
    topMargin: {
      top: verticalScale(4),
    },
    textInputContainerStyle: {
      marginVertical: verticalScale(-12),
    },
  });
export default IPayFilterStyles;
