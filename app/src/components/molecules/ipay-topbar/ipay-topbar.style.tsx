import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_32, SCALE_8, spacing } from '@app/styles/spacing.const';
import { FONT_SIZE_10, fonts, } from '@app/styles/typography.styles';
import { moderateScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  topNavConStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  handWaveText: { 
    fontSize: FONT_SIZE_10, 
    color: colors.natural.natural0 
  },
  imageStyle: {
    width: SCALE_32,
    height: SCALE_32,
    marginRight: SCALE_8,
    borderRadius: SCALE_12,
  },
  leftNavConStyle: {
    flexDirection: 'row',
  },
  buttonStyle: {
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(30),
    borderWidth: moderateScale(0.5),

    borderRadius: moderateScale(10),
  },
  ListView: {
    borderBottomWidth: moderateScale(1),

    padding: moderateScale(1),
    marginTop: moderateScale(10),
  },
  addGap: {
    gap: SCALE_12,
  },
  popTextStyle: {
    color: colors.primary.primary500,
  },
  listContainer: {
    width: '100%',
  },
  nameStyle: {
    fontSize: spacing.CUSTOME_SCALE(15),
    fontFamily: fonts.BOLD,
    textTransform: 'capitalize',
    color: colors.natural.natural900
  },
  welcomeText: {
    color: colors.natural.natural900,
  },
  welcomeTextContainer: {
    flexDirection: 'row',
  },
});

export default styles;
