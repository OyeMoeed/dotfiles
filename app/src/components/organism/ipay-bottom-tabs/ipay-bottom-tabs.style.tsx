import colors from '@app/styles/colors.const';
import createStyleSheet from '@app/styles/scaled-sheet.styles';
import { SCALE_24, SCALE_48, SCALE_6 } from '@app/styles/spacing.const';
import { FONT_SIZE_12 } from '@app/styles/typography.styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 91,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderStartEndRadius: SCALE_48,
    borderStartStartRadius: SCALE_48,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCALE_24
  },
  captionTextStyle: {
    fontSize: FONT_SIZE_12,
    fontWeight: '700',
    marginTop: SCALE_6
  },
  tabContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center'
  }
});

export default styles;
