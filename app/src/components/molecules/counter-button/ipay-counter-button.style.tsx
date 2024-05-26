import colors from '@app/styles/colors.styles';
import { SCALE_1, SCALE_12, SCALE_16, SCALE_20, SCALE_32, spacing } from '@app/styles/spacing.styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
    // flex: 1
  },
  counterContainerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.primary.primary50,
    minWidth: spacing.CUSTOME_SCALE(96),
    minHeight: spacing.CUSTOME_SCALE(34),
    width: 'auto',
    height: 'auto',
    borderRadius: SCALE_12,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCALE_16
  },
  counterBorder: {
    borderWidth: SCALE_1,
    borderColor: colors.white,
    height: SCALE_20
  },
  counterTextStyle: {
    fontSize: SCALE_32,
    color: colors.primary.primary600
  },
  counterButtonContainer: {
    backgroundColor: 'transparent'
  }
});

export default styles;
