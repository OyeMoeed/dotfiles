import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const sendGiftCard = () =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    paginationStyle: {
      width: scale(30),
      height: verticalScale(4),
      marginTop: moderateScale(16),
    },
    tabs: {
      marginLeft: moderateScale(24),
      gap: moderateScale(8),
      marginBottom: moderateScale(24),
      marginTop: moderateScale(14),
    },
    giftCardDetail: { marginHorizontal: moderateScale(24), gap: moderateScale(8) },
    carouselItem: {
      borderRadius: moderateScale(12),
      marginHorizontal: moderateScale(12),
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    image: { width: '100%', height: '60%' },
    carouselView: { marginTop: moderateScale(24) },
    carouselStyle: { width: '100%', flex: 1, paddingLeft: 0, marginLeft: moderateScale(12) },
    carouselContainer: { height: WINDOW_HEIGHT / moderateScale(1.6) },
    nextButton: {
      marginHorizontal: moderateScale(24),
      marginTop: moderateScale(12),
      marginBottom: moderateScale(12),
    },
  });

export default sendGiftCard;
