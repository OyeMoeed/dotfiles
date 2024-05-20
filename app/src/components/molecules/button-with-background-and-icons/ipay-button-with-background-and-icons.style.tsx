import { spacing } from '@app/styles/spacing';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnLarge: {
    paddingHorizontal: spacing.SCALE_24,
    paddingVertical: spacing.SCALE_12,
    height: spacing.SCALE_50,
    borderRadius: spacing.SCALE_20
  },
  btnMedium: {
    paddingHorizontal: spacing.SCALE_14,
    paddingVertical: spacing.CUSTOME_SCALE(7),
    height: spacing.CUSTOME_SCALE(34),
    borderRadius: spacing.SCALE_14
  },
  btnSmall: {
    paddingHorizontal: spacing.SCALE_6,
    paddingVertical: spacing.SCALE_4,
    height: spacing.SCALE_28,
    borderRadius: spacing.SCALE_8
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnTextView: {
    marginHorizontal: spacing.SCALE_6
  }
});

export default styles;
