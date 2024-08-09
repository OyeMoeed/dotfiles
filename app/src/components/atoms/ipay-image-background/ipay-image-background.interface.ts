import React from 'react';
import { ImageResizeMode, ImageStyle, StyleProp } from 'react-native';

export interface IPayImageBackgroundProps {
  testID?: string;
  children: React.ReactNode;
  image: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}
