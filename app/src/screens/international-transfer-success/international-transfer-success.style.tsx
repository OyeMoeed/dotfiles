import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const internationalSuccessStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    childContainer: {
      flex: 1,
      borderRadius: moderateScale(48),
      backgroundColor: themeColors.natural.natural50,
      marginVertical: moderateScale(16),
      paddingHorizontal: moderateScale(15),
      paddingVertical: moderateScale(24),
    },
    boldStyles: { fontWeight: 'bold' },
    minFlex: {
      flex: 0,
    },
    bottomView: {
      paddingVertical: moderateScale(8),
    },
    rowStyles: {
      flexDirection: 'row',
      paddingBottom: moderateScale(4),
      justifyContent: 'space-around',
    },
    heightStyles: {
      borderRadius: moderateScale(16),
      marginVertical: moderateScale(8),
      minWidth: '100%',
      minHeight: verticalScale(38),
      height: 'auto',
      marginTop: moderateScale(0),
    },
    detailsText: {
      color: themeColors.primary.primary800,
    },
    listImage: {
      width: scaleSize(15),
      height: verticalScale(15),
      resizeMode: 'contain',
      marginStart: moderateScale(8, 0.3),
    },
    transactionDetailsView: {
      flex: 1,
      alignItems: 'flex-end',
    },
    dataCardView: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      height: moderateScale(48),
      paddingHorizontal: moderateScale(18, 0.3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    detailsView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    subTitle: {
      alignSelf: 'flex-end',
      textAlign: 'right',
    },
    condtionalWidthSubtitle: {
      width: '50%',
    },
    icon: {
      marginStart: moderateScale(8, 0.3),
    },
    imageStyle: {
      width: scaleSize(27),
      height: moderateScale(18),
    },
    itemSeparatorStyle: {
      height: verticalScale(6),
    },
    transactionCardConditionalStyle: {
      marginTop: verticalScale(18),
    },
  });

export default internationalSuccessStyles;
