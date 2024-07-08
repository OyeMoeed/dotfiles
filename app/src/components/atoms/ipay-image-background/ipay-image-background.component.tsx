import React from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import { ipayImageBackgroundProps } from './ipay-image-background.interface';
import styles from './ipay-image-background.style';

const IPayImageBackground: React.FC<ipayImageBackgroundProps> = ({ testID, style, children, image, resizeMode }) => {
  const source: ImageSourcePropType =
    typeof image === 'string' && (image.startsWith('http') || image.startsWith('https'))
      ? { uri: image }
      : (image as ImageSourcePropType);

  return (
    <ImageBackground
      style={[styles.bgImage, style]}
      testID={`${testID}-image-background`}
      source={source}
      resizeMode={resizeMode}
    >
      {children}
    </ImageBackground>
  );
};

export default IPayImageBackground;
