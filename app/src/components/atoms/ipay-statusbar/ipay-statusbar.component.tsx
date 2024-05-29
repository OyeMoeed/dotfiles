import React from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { BarStyle } from '@app/utilities/enums.util';
import { IPayStatusBarProps } from './ipay-statusbar.interface';

const IPayStatusBar: React.FC<IPayStatusBarProps> = ({ backgroundColor, barStyle, ...rest }) => {
  const colorScheme = useColorScheme();

  const getBarStyle = (): BarStyle => {
    if (barStyle) {
      return barStyle as BarStyle;
    }
    return colorScheme === 'dark' ? BarStyle.LIGHT_CONTENT : BarStyle.DARK_CONTENT; // Adapt to system theme
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
