import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_13, FONT_SIZE_8, FONT_WEIGHT_BOLD, fonts } from '@app/styles/typography.styles';
import { isIosOS } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const filtersStyles = (colors: any) =>
  createStyleSheet({
    filtersContainer: {
      flex: 1,
      paddingHorizontal: spacing.SCALE_20,
    },
    inputContainer: { marginRight: scaleSize(24) },
    actionButtonStyle: {
      width: scaleSize(110),
    },
    searchInputStyle: {
      height: spacing.CUSTOME_SCALE(36),
      marginBottom: spacing.CUSTOME_SCALE(24),
      backgroundColor: colors.natural.natural0,
    },
    listStyle: {
      marginBottom: spacing.CUSTOME_SCALE(8),
    },
    inputContainerStyle: {
      width: '100%',
      marginTop: spacing.CUSTOME_SCALE(12),
      paddingLeft: spacing.CUSTOME_SCALE(20),
      paddingRight: spacing.CUSTOME_SCALE(40),
      backgroundColor: colors.natural.natural0,
    },
    buttonWrapper: {
      width: '90%',
      marginTop: spacing.CUSTOME_SCALE(8),
      marginBottom: isIosOS ? spacing.CUSTOME_SCALE(80) : spacing.CUSTOME_SCALE(16),
    },
    applyButton: {
      borderRadius: moderateScale(22),
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
      height: verticalScale(54),
      borderRadius: moderateScale(16, 0.3),
    },
    amountCard: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(10),
      padding: scaleSize(20),
      marginVertical: scaleSize(8),
    },
    rowInputHeading: { flexDirection: 'row', gap: scaleSize(8), marginBottom: scaleSize(10) },
    rowInputHeadingText: { fontSize: FONT_SIZE_13, fontFamily: fonts.BOLD, fontWeight: FONT_WEIGHT_BOLD },
    rowInput: {
      flexDirection: 'row',
      gap: scaleSize(10),
    },
    dateHeading: {
      backgroundColor: colors.natural.natural0,
      borderRadius: scaleSize(10),
      padding: scaleSize(20),
    },
    dropdownIcon: { paddingLeft: scaleSize(2), marginHorizontal: scaleSize(-10) },
    datePickerContainer: { marginRight: scaleSize(-20) },
    datePickerAndroidStyle: {
      backgroundColor: 'transparent',
      width: '90%',
    },
  });

export default filtersStyles;
