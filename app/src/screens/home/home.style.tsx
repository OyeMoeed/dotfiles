import { constants } from '@app/components/atoms/ipay-text/constants.text';
import colors from '@app/styles/colors.const';
import { scaleFont } from '@app/styles/mixins';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, spacing } from '@app/styles/spacing.const';
import { moderateScale } from 'react-native-size-matters';

const styles = createStyleSheet({
  container: {
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.primary.primary100,
  },
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(30),
    borderWidth: moderateScale(0.5),

    borderRadius: moderateScale(10),
  },
  text: {
    fontSize: scaleFont(16),
    color: colors.white,
    fontWeight: constants.FONT_WEIGHT_EXTRA_BOLD,
  },
  ListView: {
    borderBottomWidth: 1,
    padding: moderateScale(1),
    marginTop: spacing.SCALE_10,
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
});

export default styles;
