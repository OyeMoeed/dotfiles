import colors from '@app/styles/colors';
import { StyleSheet } from 'react-native';

// Function to determine background color based on the variant
const getBackgroundColor = (variant) => (variant === 'natural' ? colors.natural.natural200 : 'transparent');

const styles = (variant) =>
  StyleSheet.create({
    container: {
      backgroundColor: getBackgroundColor(variant) // Dynamic background color
    },
    font: {
      color: colors.secondary.secondary500,
      padding: 10
    }
  });

export default styles;
