import React from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { IPayImageBackgroundProps } from './ipay-image-background.interface';
import styles from './ipay-image-background.style';

const IPayImageBackground: React.FC<IPayImageBackgroundProps> = ({ testID, style, children, image, ...rest }) => {
  const source: ImageSourcePropType =
    typeof image === 'string' && (image.startsWith('http') || image.startsWith('https'))
      ? { uri: image }
      : (image as ImageSourcePropType);

  return (
    <ImageBackground style={[styles.bgImage, style]} testID={`${testID}-image-background`} source={source} {...rest}>
      {children}
    </ImageBackground>
  );
};

export default IPayImageBackground;
