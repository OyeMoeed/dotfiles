import { StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

const addCardStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: verticalScale(20),
    },
  });

export default addCardStyles;
