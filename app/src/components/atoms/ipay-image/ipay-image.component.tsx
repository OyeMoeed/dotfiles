import React, { JSX } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { IPayImageProps } from './ipay-image.interface';

/**
 * A component to display images with support for local and remote sources.
 * @param {IPayImageProps} props - The props for the RNImage component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayImage: React.FC<IPayImageProps> = ({ testID, style, image, resizeMode }: IPayImageProps): JSX.Element => {
  // Determine the source of the image based on whether it is a local asset or a URL

  const source: ImageSourcePropType =
    typeof image === 'string' && (image.startsWith('http') || image.startsWith('https'))
      ? { uri: image }
      : (image as ImageSourcePropType);

  return <Image resizeMode={resizeMode} testID={`${testID}-image`} style={style} source={source} />;
};

export default IPayImage;
