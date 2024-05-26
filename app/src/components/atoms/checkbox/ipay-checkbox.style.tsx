import { spacing } from '@app/styles/spacing.styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: spacing.SCALE_24,
    height: spacing.SCALE_24,
    padding: spacing.SCALE_6,
    borderRadius: spacing.SCALE_100,
    borderWidth: spacing.SCALE_1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: spacing.SCALE_12,
    height: spacing.SCALE_12
  }
});

export default styles;