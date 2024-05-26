import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  btnLarge: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    height: verticalScale(50),
    borderRadius: moderateScale(20)
  },
  btnMedium: {
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(17),
    height: verticalScale(34),
    borderRadius: moderateScale(14)
  },
  btnSmall: {
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(4),
    height: verticalScale(28),
    borderRadius: moderateScale(8)
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnTextView: {
    marginHorizontal: moderateScale(6)
  }
});

export default styles;
