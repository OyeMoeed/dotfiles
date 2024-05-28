import { constants } from '@app/components/atoms/text/constants.text';
import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12 } from '@app/styles/spacing.styles';

const styles = createStyleSheet({
  container: {
    // flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.primary.primary10,
  },
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,

    borderRadius: 10,
  },
  text: { fontSize: 16, color: colors.white, fontWeight: constants.FONT_WEIGHT_EXTRA_BOLD },
  ListView: {
    borderBottomWidth: 1,

    padding: 1,
    marginTop: 10,
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
