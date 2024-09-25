import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import themeColors from '@app/styles/theming/theme-colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const marketplaceStyles = (colors: typeof themeColors) =>
  createStyleSheet({
    container: {
      flex: 1,
    },
    history: { flexDirection: 'row', flex: 1, gap: scaleSize(6), alignItems: 'center' },
    searchInputStyle: {
      height: verticalScale(36),
      marginTop: scaleSize(10),
      marginBottom: verticalScale(24),
      borderRadius: scaleSize(12),
      backgroundColor: colors.natural.natural0,
    },
    shopContainer: { marginHorizontal: scaleSize(24), flex: 0 },
    offerContentContainer: { gap: scaleSize(12) },
    offerContentStyle: { marginBottom: verticalScale(12), flex: 0 },
    gradientView: {
      marginBottom: scaleSize(12),
      backgroundColor: 'transparent',
      width: moderateScale(295),
      overflow: 'hidden',
      height: moderateScale(150),
      padding: scaleSize(20),
      justifyContent: 'center',
      borderRadius: scaleSize(28),
      alignSelf: 'stretch',
    },
    offerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    offerDetail: { gap: scaleSize(10), flex: 0.4 },
    offerImageView: { flex: 0.45, alignSelf: 'flex-end' },
    offerCardImage: { width: moderateScale(120), height: moderateScale(100) },
    offerCardImageBackground: {
      width: moderateScale(280),
      height: moderateScale(200),
      position: 'absolute',
      left: moderateScale(80),
      opacity: 0.05,
    },

    categoryCardContainer: { marginVertical: verticalScale(12) },
    categoryListStyle: { marginBottom: scaleSize(12), marginTop: -scaleSize(6), flex: 0 },
    categoryListContent: { gap: scaleSize(10) },
    merchantList: {
      marginBottom: moderateScale(200),
      marginTop: scaleSize(12),
      flex: 0,
    },
    containerWrapper: {
      flex: 0,
      gap: scaleSize(12),
      justifyContent: 'space-between',
    },
    columnWrapperMerchant: {
      gap: scaleSize(12),
    },
  });

export default marketplaceStyles;
