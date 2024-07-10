import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const nearestAtmStyles = (colors: any) =>
  createStyleSheet({
    container: {
      // flex: 1,
      marginHorizontal: moderateScale(24, 0.3),
    },
    tabsView: {
      width: '100%',
      backgroundColor: 'transparent',
      marginTop: verticalScale(4),
      marginBottom: verticalScale(12),
    },
    filtersTabView: {
      height: moderateScale(150),
      position: 'absolute',
      top: verticalScale(140),
      zIndex: 9999,
      overflow: 'hidden',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(24),
      marginHorizontal: moderateScale(24, 0.3),
    },
    fitlersTabListView: {
      height: moderateScale(150),
      overflow: 'hidden',
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(24),
      marginHorizontal: moderateScale(24, 0.3),
    },
    tabChildView: {
      flex: 1,
    },
    atmListContainer: {
      flex: 1,
      margin: moderateScale(24, 0.3),
    },
    atmCard: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: verticalScale(12),
      height: moderateScale(60),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    addressView: {
      flexDirection: 'row',
      height: moderateScale(36),
      alignItems: 'center',
      flex: 1,
    },
    typeText: {
      colors: colors.natural.natural700,
      backgroundColor: colors.natural.natural100,
      width: moderateScale(51),
      height: moderateScale(19),
      textAlign: 'center',
      alignContent: 'center',
      borderRadius: moderateScale(6),
      marginEnd: moderateScale(8, 0.3),
      overflow: 'hidden',
    },
    itemSeparatorStyle: {
      height: verticalScale(8),
    },
    distanceView: {
      flexDirection: 'row',
      alignItem: 'center',
      marginStart: moderateScale(8),
    },
    addressText: {
      width: scale(170),
      color: colors.natural.natural900,
    },
    distanceText: {
      color: colors.primary.primary800,
      marginEnd: moderateScale(8, 0.3),
    },
  });

export default nearestAtmStyles;
