
import React from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { IPayStatusBarProps } from './ipay-statusbar.interface';
import { BarStyle } from '@app/utilities/enums.util';
import { StatusBarStyle } from 'react-native';

const IPayStatusBar: React.FC<IPayStatusBarProps> = ({ backgroundColor, barStyle, ...rest }) => {
  const colorScheme = useColorScheme();

  const getBarStyle = (): StatusBarStyle => {
    if (barStyle) {
      return barStyle as StatusBarStyle;
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
