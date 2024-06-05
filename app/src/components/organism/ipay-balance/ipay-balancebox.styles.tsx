import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import {
  SCALE_1,
  SCALE_12,
  SCALE_16,
  SCALE_18,
  SCALE_32,
  SCALE_48,
  SCALE_70,
  SCALE_8,
  SCALE_83
} from '@app/styles/spacing.const';
import { FONT_SIZE_11 } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  container: {
    minHeight: moderateScale(383),
    width: 'auto',
    height: 'auto',
    borderRadius: SCALE_48,
    paddingHorizontal: SCALE_32,
    paddingTop: SCALE_32,
    paddingBottom: SCALE_16,
    backgroundColor: colors.white
  },
  eyeCon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    marginRight: SCALE_8
  },
  commonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  balanceContainer: {
    flexDirection: 'row'
  },
  currencyStyle: {
    alignSelf: 'flex-end'
  },
  btnStyle: {
    minHeight: moderateScale(34),
    width: moderateScale(99),
    height: 'auto',
    backgroundColor: colors.primary.primary500,
    borderRadius: SCALE_12,
    justifyContent: 'center'
  },
  gap: {
    marginTop: SCALE_12
  },
  lineBorderStyle: {
    borderWidth: SCALE_1,
    borderColor: colors.secondary.secondary100,
    width: '100%',
    marginVertical: SCALE_16
  },
  balanceTextStyle: {
    fontWeight: '900'
  },
  iconConStyle: {
    width: moderateScale(48),
    minHeight: moderateScale(48),
    height: 'auto',
    borderRadius: SCALE_18,
    backgroundColor: colors.primary.primary10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCALE_8
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: SCALE_8,
    borderWidth: 1,
    borderColor: 'red'
  },
  subContainer: {
    width: SCALE_83,
    height: SCALE_70,
    alignItems: 'center'
  },
  gapListStyle: {
    marginBottom: 6
  },
  paginationStyle: {
    width: moderateScale(35),
    height: moderateScale(4)
  },
  iconTextStyle: {
    fontSize: FONT_SIZE_11,
    fontWeight: '400'
  }
});

export default styles;
