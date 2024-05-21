import colors from '@app/styles/colors.styles';
import { SCALE_10 } from '@app/styles/spacing.styles';
import { variants } from '@app/utilities/enums';
import { StyleSheet } from 'react-native';

// Function to determine background color based on the variant
const getBackgroundColor = (variant: variants) => (variant === 'natural' ? colors.natural.natural200 : 'transparent');

const styles = (variant: variants) =>
  StyleSheet.create({
    container: {
      backgroundColor: getBackgroundColor(variant) // Dynamic background color
    },
    font: {
      color: colors.secondary.secondary500,
      padding: SCALE_10
    }
  });

export default styles;
