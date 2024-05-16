import colors from '@styles/colors';
import { spacing } from '@styles/spacing';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: spacing.CUSTOME_SCALE(40),
    height: spacing.CUSTOME_SCALE(20),
    borderRadius: spacing.SCALE_24,
    justifyContent: 'center',
    borderWidth: spacing.SCALE_1,
    paddingHorizontal: spacing.SCALE_1
  },
  childContainer: {
    width: spacing.SCALE_16,
    height: spacing.SCALE_16,
    borderRadius: spacing.SCALE_128
  },
  isOnParent: {
    backgroundColor: colors.vibrantBlue,
    alignItems: 'flex-end',
    borderColor: colors.vibrantBlue
  },
  isOffParent: {
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    borderColor: colors.white
  },
  isOnChild: {
    backgroundColor: colors.lightGrey,
    alignItems: 'flex-end'
  },
  isOffChild: {
    backgroundColor: colors.lightGrey,
    alignItems: 'flex-start'
  }
});

export default styles;
