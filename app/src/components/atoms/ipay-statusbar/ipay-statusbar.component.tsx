import { statusBarStyle } from '@app/utilities/enums.util';
import React from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import { IPayStatusBarProps } from './ipay-statusbar.interface';

const IPayStatusBar: React.FC<IPayStatusBarProps> = ({ backgroundColor, barStyle, ...rest }) => {
  const colorScheme = useColorScheme();

  const getBarStyle = (): statusBarStyle => {
    if (barStyle) {
      return barStyle as statusBarStyle;
    }
    return colorScheme === 'dark' ? statusBarStyle.LIGHT_CONTENT : statusBarStyle.DARK_CONTENT; // Adapt to system theme
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
