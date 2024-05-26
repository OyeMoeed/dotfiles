import { FONT_WEIGHT_EXTRA_BOLD } from '@app/components/atoms/text/utilities/typography-helper.util';
import colors from '@app/styles/colors.styles';
import { SCALE_12 } from '@app/styles/spacing.styles';
import { StyleSheet } from 'react-native';
import createStyleSheet from '@app/styles/scaled-sheet.styles';

const styles = createStyleSheet({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  SafeAreaView1: { backgroundColor: colors.white, flex: 0 },
  SafeAreaView2: { flex: 1, backgroundColor: colors.white },
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  buttonStyle: {
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,
    borderColor: colors.gray94,
    borderRadius: 10
  },
  text: { fontSize: 16, color: colors.white, fontWeight: FONT_WEIGHT_EXTRA_BOLD },
  ListView: {
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    padding: 1,
    marginTop: 10
  },
  addGap: {
    gap: SCALE_12
  }
});

export default styles;
