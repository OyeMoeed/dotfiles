import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const atmDetailsStyle = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: moderateScale(18, 0.3),
      marginVertical: verticalScale(8),
    },
    topView: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(24),
      padding: moderateScale(24, 0.3),
      alignItems: 'center',
    },
    atmDetailsView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: moderateScale(44),
    },
    chipContainerStyle: {
      paddingHorizontal: moderateScale(7),
      paddingVertical: verticalScale(2),
    },
    titleText: {
      width: moderateScale(214),
      color: colors.primary.primary900,
    },
    typeView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScale(8),
    },
    dash: {
      marginHorizontal: moderateScale(8, 0.3),
      color: colors.natural.natural900,
    },
    bottomView: {
      backgroundColor: colors.natural.natural0,
      borderRadius: moderateScale(24),
      padding: moderateScale(24, 0.3),
      marginTop: verticalScale(12),
    },
    mapView: {
      width: '100%',
      height: moderateScale(110),
      marginVertical: moderateScale(20),
      borderRadius: moderateScale(16),
      overflow: 'hidden',
    },
  });

export default atmDetailsStyle;
