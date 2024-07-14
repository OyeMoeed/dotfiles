import { scaleSize } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  contentContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  madaIcon: {
    height: scaleSize(12.25),
    width: scaleSize(35.75),
  },
  cashbackImage: {
    height: scaleSize(6),
    width: scaleSize(66.25),
  },
  visaIcon: {
    height: scaleSize(12),
    width: scaleSize(36.75),
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
    flex: 1,
    gap: scaleSize(10),
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
    justifyContent: 'space-between',
    paddingVertical: scaleSize(12),
    paddingHorizontal: moderateScale(20),
  },
});
export default styles;
