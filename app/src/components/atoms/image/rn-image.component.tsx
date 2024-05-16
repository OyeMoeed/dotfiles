import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import styles from './rn-image.style';
import { RNImageProps } from './rn-image.interface';

/**
 * A component to display images with support for local and remote sources.
 * @param {RNImageProps} props - The props for the RNImage component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNImage: React.FC<RNImageProps> = ({ testID, style, image }: RNImageProps): JSX.Element => {
  // Determine the source of the image based on whether it is a local asset or a URL

  const source: ImageSourcePropType =
    typeof image === 'string' && (image.startsWith('http') || image.startsWith('https'))
      ? { uri: image }
      : (image as ImageSourcePropType);

  return <Image testID={testID} style={[styles.imageStyles, style]} source={source} />;
};

export default RNImage;
