import { typography } from '@app/components/atoms/ipay-text/utilities/typography-helper.util';
import colors from '@app/styles/colors.const';
import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { FONT_SIZE_15, FONT_SIZE_16, FONT_SIZE_17, FONT_SIZE_40 } from '@app/styles/typography.styles';
import { isTablet } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const giftDetailsStyles = (themeColors: typeof colors) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(18),
    },
    receiveContainer: {
      marginTop: moderateScale(54),
    },
    giftCardView: {
      flex: 1,
      alignItems: 'center',
    },
    cardView: {
      alignSelf: 'center',
      height: verticalScale(353),
      zIndex: 9999,
      position: 'relative',
    },
    receiveCardView: {
      height: verticalScale(413),
    },
    previewContainer: {
      width: moderateScale(324),
      height: verticalScale(353),
      backgroundColor: themeColors.primary.primary650,
      borderRadius: moderateScale(12),
      paddingVertical: moderateScale(24),
      paddingHorizontal: moderateScale(40, 0.3),
      alignItems: 'center',
      overflow: 'hidden',
      justifyContent: 'center',
    },
    receivePreviewContainer: {
      height: verticalScale(413),
      width: moderateScale(340),
    },
    logoStyles: {
      width: verticalScale(70),
      height: verticalScale(23),
      marginBottom: moderateScale(4),
    },
    receiveLogoStyles: {
      width: scaleSize(89),
      height: verticalScale(28),
      marginBottom: moderateScale(4),
    },

    giftCardFrontImage: {
      width: moderateScale(240),
      height: moderateScale(240),
    },
    receivedGiftCardFrontImage: {
      width: moderateScale(280),
      height: moderateScale(280),
    },
    image: {
      width: moderateScale(120),
      height: moderateScale(120),
    },
    receiveImage: {
      width: moderateScale(140),
      height: moderateScale(140),
    },
    amount: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleSize(2),
      marginVertical: verticalScale(16),
    },
    messagePreview: {
      height: moderateScale(90),
      marginBottom: moderateScale(22, 0.3),
    },
    messagePreviewText: {
      textAlign: 'center',
    },
    swipeBtnView: {
      width: isTablet ? '95%' : '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingEnd: moderateScale(12, 0.3),
      marginTop: moderateScale(6),
    },
    indicatorParentView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    indicator: {
      width: moderateScale(24),
      height: moderateScale(4),
      borderRadius: moderateScale(99),
      backgroundColor: themeColors.primary.primary200,
    },
    indicator2: {
      width: moderateScale(24),
      height: moderateScale(4),
      borderRadius: moderateScale(99),
      marginStart: moderateScale(4, 0.3),
      backgroundColor: themeColors.primary.primary200,
    },
    selectedIndexIndicator: {
      backgroundColor: themeColors.primary.primary500,
    },
    dataCardView: {
      flex: 1,
      width: '100%',
      backgroundColor: themeColors.natural.natural0,
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
      textTransform: 'capitalize',
    },
    icon: {
      marginStart: moderateScale(8, 0.3),
    },
    itemSeparatorStyle: {
      height: verticalScale(8),
    },
    viewShot: {
      flex: 1,
      marginTop: isTablet ? verticalScale(295) : verticalScale(230),
    },
    bottomView: {
      flex: 1,
    },
    receiveAmountStyle: {
      fontSize: FONT_SIZE_40,
      lineHeight: typography.FONT_VARIANTS.TITLE_LARGE.LINE_HEIGHT,
    },
    receiveCurrencyStyle: {
      fontSize: FONT_SIZE_17,
    },
    receiveMessageText: {
      fontSize: FONT_SIZE_15,
    },
    receiveNameText: {
      fontSize: FONT_SIZE_16,
    },
    textStyle: {
      textDecorationLine: 'line-through',
      color: themeColors.natural.natural500,
    },
    currencyStyle: {
      textTransform: 'none',
    },
    keyContainer: {
      flex: 1,
    },
    valueContainer: {
      flex: 1.5,
      alignItems: 'flex-end',
    },
  });

export default giftDetailsStyles;
