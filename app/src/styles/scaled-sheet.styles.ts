import { ScaledSheet } from 'react-native-size-matters';
import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from 'react-native';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

const createStyleSheet = <T extends NamedStyles<T>>(style: T): StyleSheet.NamedStyles<T> =>
  ScaledSheet.create(style) as StyleSheet.NamedStyles<T>;

export default createStyleSheet;
