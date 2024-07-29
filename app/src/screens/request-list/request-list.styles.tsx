import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const requestListStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    padding: moderateScale(24),
  },
  sectionContainer: {
    marginBottom: moderateScale(24),
  },
});

export default requestListStyles;
