import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const nearestAtmStyles = (colors: any) =>
  createStyleSheet({
    container: {
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
      marginBottom: 0,
    },
    atmCard: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(16),
      paddingHorizontal: moderateScale(18, 0.3),
      paddingVertical: verticalScale(12),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleView: {
      flexDirection: 'row',
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
    titleText: {
      color: colors.natural.natural900,
    },
    distanceText: {
      color: colors.primary.primary800,
      marginEnd: moderateScale(8, 0.3),
    },
    fill: { flex: 1 },
    title: { textTransform: 'none' },
    listFooterStyle: {
      height: verticalScale(50),
    },
    noMoreNearestAtms: {
      marginTop: verticalScale(20),
      marginBottom: verticalScale(10),
      alignSelf: 'center',
      textAlign: 'center',
      color: colors.natural.natural700,
    },
  });

export default nearestAtmStyles;
