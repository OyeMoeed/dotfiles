import React from 'react';
import { ImageResizeMode, ImageStyle } from 'react-native';

export interface ipayImageBackgroundProps {
  testID?: string;
  children: React.ReactNode;
  image: string;
  style?: ImageStyle;
  resizeMode?: ImageResizeMode;
}
