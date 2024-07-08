import themeColors from '@app/styles/theming/theme-colors';
import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

const cardSegmentStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    flatlist: {
      flex: 0,
    },
    textColor: { color: colors.primary.primary900 },
    detailTextColor: { color: colors.primary.primary800 },
    segmentStyles: {
      marginVertical: verticalScale(8),
    },
  });

export default cardSegmentStyles;
