import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  madaIcon: {
    height: scaleSize(6.125),
    width: scaleSize(17.875),
  },
  cashbackImage: {
    height: scaleSize(5),
    width: scaleSize(53),
  },
  visaIcon: {
    height: scaleSize(8),
    width: scaleSize(24.5),
  },
  logoIcon: {
    height: scaleSize(12),
    width: scaleSize(7.33),
  },
  container: {
    width: '100%',
    height: scaleSize(60),
    marginTop: verticalScale(32),
  },
  nameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: moderateScale(6),
  },
  iconsContainer: {
    gap: scaleSize(8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imageBackgroundContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: moderateScale(16),
  },
  childContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: scaleSize(8),
    justifyContent: 'space-between',
    paddingVertical: scaleSize(12),
    paddingHorizontal: moderateScale(12),
  },
});
export default styles;
