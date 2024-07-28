import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale } from 'react-native-size-matters';

const trafficViolationCardStyles = (colors: any) =>
  createStyleSheet({
    container: {
      flex: 1,
      paddingHorizontal: moderateScale(12, 0.3),
      paddingVertical: moderateScale(16, 0.3),
      paddingRight: moderateScale(20, 0.3),
      borderRadius: moderateScale(20),
      flexDirection: 'row',
      backgroundColor: colors.natural.natural0,
    },
    contentView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginStart: moderateScale(12, 0.3),
    },
    vendorIcon: {
      width: moderateScale(32, 0.3),
      height: moderateScale(32, 0.3),
      marginBottom: moderateScale(8, 0.3),
    },
    vendorText: {
      marginTop: moderateScale(1.5, 0.3),
    },
    contentChildView: {
      alignItems: 'flex-end',
      justiyContent: 'flex-start',
      height: moderateScale(75, 0.3),
    },
    chipView: {
      alignSelf: 'flex-end',
      marginBottom: moderateScale(12, 0.3),
      top: -moderateScale(1.5),
    },
    more: {
      marginStart: moderateScale(4, 0.3),
    },
    dueDateText: {
      marginTop: moderateScale(4, 0.3),
    },
  });

export default trafficViolationCardStyles;
