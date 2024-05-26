import React from 'react';
import { StatusBar, Platform, useColorScheme } from 'react-native';
import { IPayStatusBarProps } from './ipay-statusbar.interface';
import { BarStyle } from '@app/utilities/enums.util';

const IPayStatusBar: React.FC<IPayStatusBarProps> = ({ backgroundColor, barStyle, ...rest }) => {
  const colorScheme = useColorScheme();

  const getBarStyle = (): BarStyle => {
    if (barStyle) {
      return barStyle as BarStyle;
    } else {
      return colorScheme === 'dark' ? BarStyle.LIGHT_CONTENT : BarStyle.DARK_CONTENT; // Adapt to system theme
    }
  };

  return (
    <StatusBar
      backgroundColor={backgroundColor || (Platform.OS === 'android' ? 'transparent' : undefined)}
      barStyle={getBarStyle()}
      {...rest}
    />
  );
};

export default IPayStatusBar;
