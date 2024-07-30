import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_20, FONT_WEIGHT_BOLD } from '@app/styles/typography.styles';
import { scale, verticalScale } from 'react-native-size-matters';

const sadadBillDetailBoxStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    boxContainer: {
      gap: scale(8),
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scale(28),
      padding: scale(16),
    },
    listLeftImg: {
      height: verticalScale(24),
      width: scaleSize(24),
      resizeMode: 'contain',
    },
    listCenterContainer: {
      paddingRight: scale(30),
    },
    listTitle: {
      color: themeColors.natural.natural900,
    },
    declinedTitle: {
      color: themeColors.error.error500,
    },
    declinedSubTitle: {
      color: themeColors.error.error500,
    },
    listContainer: {
      backgroundColor: themeColors.primary.primary10,
    },
    declinedContainer: {
      backgroundColor: themeColors.error.error25,
    },
    listRightText: {
      gap: scale(3),
    },
    lineThrough: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    },
    amountToBePaidWrapper: {
      backgroundColor: themeColors.natural.natural0,
      borderWidth: scale(1),
      borderColor: themeColors.primary.primary100,
      borderStyle: 'solid',
      borderRadius: scale(20),
      padding: scale(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    amountWrapper: {
      flexDirection: 'row',
      gap: scale(4),
      alignItems: 'center',
      width: scaleSize(200),
      justifyContent: 'center',
    },
    amountInput: {
      fontSize: FONT_SIZE_20,
      fontWeight: FONT_WEIGHT_BOLD,
      paddingTop: verticalScale(11),
      paddingHorizontal: 0,
      color: themeColors.primary.primary900,
    },
    darkBlueColor: {
      color: themeColors.primary.primary900,
    },
    bottomActionWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(6),
      justifyContent: 'center',
      marginTop: scale(4),
    },
    topInfoWrapper: {
      flexDirection: 'row',
      gap: scale(2),
    },
    chipContainer: {
      width: '100%',
      justifyContent: 'center',
    },
  });

export default sadadBillDetailBoxStyles;
