import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { IPayLinearGradientViewProps } from './ipay-linear-gradient.interface';
import linearGradientStyles from './ipay-linear-gradient.styles';

const IPayLinearGradientView: React.FC<IPayLinearGradientViewProps> = ({
  testID,
  gradientColors,
  start,
  end,
  locations,
  style,
  children,
  useAngle,
  angleCenter,
  angle,
}) => {
  const { colors } = useTheme();
  const styles = linearGradientStyles();
  const gradientColorsProp = gradientColors || colors.bottomsheetGradient;

  return (
    <LinearGradient
      testID={`${testID}-linear-gradient`}
      colors={gradientColorsProp}
      start={start || { x: 0, y: 1 }}
      end={end || { x: 1, y: 1 }}
      locations={locations || [0.2, 0.8]}
      style={[styles.gradient, style]}
      useAngle={useAngle}
      angleCenter={angleCenter}
      angle={angle}
    >
      {children}
    </LinearGradient>
  );
};

export default IPayLinearGradientView;
