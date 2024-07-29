import { moderateScale, verticalScale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import colors from '@app/styles/colors.const';

const styles = StyleSheet.create({
  filterWrapper: {
    height: verticalScale(27),
    marginTop: moderateScale(24),
  },
  chipContainer: {
    marginLeft: moderateScale(10),
    backgroundColor: colors.secondary.secondary100,
  },
  chipHeading: {
    gap: moderateScale(10),
    color: colors.secondary.secondary500,
  },
});
export default styles;
