import { BarStyle } from '@app/utilities/enums.util';
import React from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
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
      barStyle={getBarStyle()}
      backgroundColor={backgroundColor || (Platform.OS === 'android' ? 'transparent' : undefined)}
      {...rest}
    />
  );
};

export default IPayStatusBar;
