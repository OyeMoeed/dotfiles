import colors from '@app/styles/colors.const';
import { scaleFont, scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { verticalScale } from 'react-native-size-matters';

const sadadBillDetailBoxStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    boxContainer: {
      gap: scaleFont(8),
      backgroundColor: themeColors.natural.natural0,
      borderRadius: scaleFont(28),
      padding: scaleFont(16),
    },
    listLeftImg: {
      height: verticalScale(24),
      width: scaleSize(24),
      resizeMode: 'contain',
    },
    listCenterContainer: {
      paddingRight: scaleFont(30),
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
      gap: scaleFont(3),
    },
    lineThrough: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    },
    amountToBePaidWrapper: {
      gap: scaleFont(8),
      backgroundColor: themeColors.natural.natural0,
      borderWidth: scaleFont(1),
      borderColor: themeColors.primary.primary100,
      borderStyle: 'solid',
      borderRadius: scaleFont(20),
      padding: scaleFont(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    amountWrapper: {
      flexDirection: 'row',
      gap: scaleFont(4),
      alignItems: 'flex-end',
    },
    darkBlueColor: {
      color: themeColors.primary.primary900,
    },
    bottomActionWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleFont(6),
      justifyContent: 'center',
      marginTop: scaleFont(4),
    },
    topInfoWrapper: {
      flexDirection: 'row',
      gap: scaleFont(2),
    },
    chipContainer: {
      width: '100%',
      justifyContent: 'center',
    },
  });

export default sadadBillDetailBoxStyles;
