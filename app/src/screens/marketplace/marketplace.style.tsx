import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_12, SCALE_16, SCALE_24, SCALE_32, SCALE_48, SCALE_8, spacing } from '@app/styles/spacing.const';

const styles = createStyleSheet({
  container: {
    flex: 1
  },
  topNavCon: {
    marginTop: SCALE_16,
    marginHorizontal: SCALE_24
  },
  balanceCon: {
    marginTop: SCALE_16,
    marginHorizontal: SCALE_24
  },
  topNavConStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imageStyle: {
    width: SCALE_32,
    height: SCALE_32,
    marginRight: SCALE_8
  },
  leftNavConStyle: {
    flexDirection: 'row'
  },
  buttonStyle: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,

    borderRadius: 10
  },
  ListView: {
    borderBottomWidth: 1,

    padding: 1,
    marginTop: 10
  },
  addGap: {
    gap: SCALE_12
  },
  popTextStyle: {
    color: colors.primary.primary500
  },
  listContainer: {
    width: '100%'
  },
  nameStyle: {
    fontSize: spacing.CUSTOME_SCALE(15),
    fontWeight: '700',
    textTransform: 'capitalize'
  },
  bottomSheetContainerStyle: {
    backgroundColor: colors.greyPalette.greyOverlay,
    borderTopStartRadius: SCALE_48,
    borderTopEndRadius: SCALE_48,
    overflow: 'hidden'
  }
});

export default styles;
