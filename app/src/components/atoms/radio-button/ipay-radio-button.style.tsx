import { spacing } from '@app/styles/spacing.styles';
import { StyleSheet } from 'react-native';

const radioButtonStyles = (colors: any) =>
  StyleSheet.create({
    image: {
      width: spacing.SCALE_24,
      height: spacing.SCALE_24
    }
  });

export default radioButtonStyles;
