import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { IPayImageProps } from './ipay-image.interface';
import styles from './ipay-image.style';

/**
 * A component to display images with support for local and remote sources.
 * @param {IPayImageProps} props - The props for the RNImage component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayImage: React.FC<IPayImageProps> = ({ testID, style, image, tintColor }: IPayImageProps): JSX.Element => {
  // Determine the source of the image based on whether it is a local asset or a URL

  const source: ImageSourcePropType =
    typeof image === 'string' && (image.startsWith('http') || image.startsWith('https'))
      ? { uri: image }
      : (image as ImageSourcePropType);

  return <Image tintColor={tintColor} testID={`${testID}-image`} style={[styles.imageStyles, style]} source={source} />;
};

export default IPayImage;
