import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  madaIcon: {
    height: scaleSize(11.95),
    width: scaleSize(35.94),
  },
  cashbackImage: {
    height: scaleSize(5),
    width: scaleSize(53),
  },
  visaIcon: {
    height: scaleSize(12),
    width: scaleSize(36.55),
  },
  logoIcon: {
    height: scaleSize(18),
    width: scaleSize(11),
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleSize(16),
    paddingHorizontal: moderateScale(20),
  },
});
export default styles;
