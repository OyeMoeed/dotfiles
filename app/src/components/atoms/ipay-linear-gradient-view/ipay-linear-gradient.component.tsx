import useTheme from '@app/styles/theming/theme.hook';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { IPayLinerGradientViewProps } from './ipay-linear-gradient.interface';
import linearGradientStyles from './ipay-linear-gradient.styles';

const IPayLinerGradientView: React.FC<IPayLinerGradientViewProps> = ({
  testID,
  gradientColors,
  start,
  end,
  locations,
  style,
  children
}) => {
  const { colors } = useTheme();
  const styles = linearGradientStyles(colors);
  const gradientColorsProp = gradientColors || colors.gradient1;

  return (
    <LinearGradient
      testID={testID}
      colors={gradientColorsProp}
      start={start || { x: 0, y: 1 }}
      end={end || { x: 1, y: 1 }}
      locations={locations || [0.2, 0.8]}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default IPayLinerGradientView;
