import { spacing } from '@app/styles/spacing.styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  childContainer: {
    marginStart: spacing.SCALE_12
  },
  heading: {},
  text: {}
});

export default styles;
