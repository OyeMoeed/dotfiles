import colors from '@app/styles/colors.const';
import { SCALE_12, SCALE_16, SCALE_28, SCALE_4, SCALE_48, spacing } from '@app/styles/spacing.const';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: SCALE_16,
  },
  rearrangeContStyle: {
    width: spacing.CUSTOME_SCALE(320),
    height: SCALE_48,
    borderRadius: SCALE_28,
    backgroundColor: colors.natural.natural0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCALE_12,
    marginVertical: SCALE_4,
  },

  commonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
