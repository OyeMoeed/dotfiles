import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

interface IPayGradientListProps {
  testID?: string;
  onPress?: () => void; // Optional handle press right icon
  leftIcon?: React.JSX.Element; // Optional React element for the left icon
  title: string; // Required string for the main title
  subTitle?: string; // Optional string for the subTitle
  rightIcon?: React.JSX.Element; // Optional React element for the right icon
  titleStyle?: StyleProp<TextStyle>; // Optional style object for customizing the title text style
  subTitleStyle?: StyleProp<TextStyle>; // Optional style object for customizing the subtitle text style
  gradientColors?: (string | number)[]; // Optional gradient colors for customizing gradient
}

export default IPayGradientListProps;
