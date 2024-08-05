import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { isTablet } from '@app/utilities/constants';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const giftDetailsStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
      paddingVertical: moderateScale(18),
    },
    giftCardView: {
      flex: 1,
      alignItems: 'center',
    },
    cardView: {
      alignSelf: 'center',
      height: moderateScale(413),
      zIndex: 9999,
    },
    previewContainer: {
      width: isTablet ? scaleSize(300) : moderateScale(300),
      height: moderateScale(413),
      backgroundColor: colors.primary.primary650,
      borderRadius: moderateScale(12),
      paddingTop: moderateScale(24),
      paddingHorizontal: moderateScale(23, 0.3),
      alignItems: 'center',
      overflow: 'hidden',
    },
    logoStyles: {
      width: verticalScale(70),
      height: verticalScale(23),
      marginBottom: moderateScale(4),
    },
    giftCardFrontImage: {
      width: moderateScale(240),
      height: moderateScale(240),
      marginTop: moderateScale(30),
    },
    image: {
      width: moderateScale(120),
      height: moderateScale(120),
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
      backgroundColor: colors.primary.primary200,
    },
    indicator2: {
      width: moderateScale(24),
      height: moderateScale(4),
      borderRadius: moderateScale(99),
      marginStart: moderateScale(4, 0.3),
      backgroundColor: colors.primary.primary200,
    },
    selectedIndexIndicator: {
      backgroundColor: colors.primary.primary500,
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
    itemSeparatorStyle: {
      height: verticalScale(8),
    },
    bottomView: {
      flex: 1,
      marginTop: isTablet ? verticalScale(295) : verticalScale(230),
    },
  });

export default giftDetailsStyles;
