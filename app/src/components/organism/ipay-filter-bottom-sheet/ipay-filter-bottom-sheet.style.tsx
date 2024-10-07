import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import themeColors from '@app/styles/theming/theme-colors';
import { FONT_SIZE_13, FONT_SIZE_8, FONT_WEIGHT_BOLD, fonts } from '@app/styles/typography.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const filtersStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    filtersContainer: {
      flex: 1,
    },
    inputContainer: {
      flex: 1,
      width: '96%',
      alignSelf: 'center',
    },
    actionButtonStyle: {
      width: scaleSize(110),
    },
    listStyle: {
      marginBottom: spacing.CUSTOME_SCALE(8),
    },
    inputContainerStyle: {
      width: '100%',
      marginTop: spacing.CUSTOME_SCALE(12),
      paddingLeft: spacing.CUSTOME_SCALE(20),
      paddingRight: spacing.CUSTOME_SCALE(50),
      borderRadius: spacing.CUSTOME_SCALE(22),
      backgroundColor: colors.natural.natural0,
    },
    receiverName: {
      marginBottom: moderateScale(8, 0.3),
    },
    input: {
      borderRadius: moderateScale(24),
    },
    buttonWrapper: {
      width: '90%',
      marginTop: spacing.CUSTOME_SCALE(8),
      marginBottom: isIosOS ? spacing.CUSTOME_SCALE(80) : spacing.CUSTOME_SCALE(16),
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
      height: verticalScale(55),
      borderRadius: moderateScale(16, 0.3),
      paddingLeft: moderateScale(20),
      paddingRight: moderateScale(13),
    },
    dateInput: {
      padding: 0,
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
      justifyContent: 'center',
    },
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
      marginHorizontal: moderateScale(24),
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
  });

export default filtersStyles;
