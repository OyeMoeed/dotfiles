import React from 'react';
import { RNText, RNView } from '@app/components/atoms';
import styles from './rn-banner.style';
import { RNBannerProps } from './rn-banner.interface';

/**
 * A component consisting of a heading and an input field.
 * @param {RNBannerProps} props - The props for the RNBanner component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNBanner: React.FC<RNBannerProps> = ({ testID, text, variant }) => {
  const dynamicStyles = styles(variant);

  return (
    <RNView testID={testID} style={dynamicStyles.container}>
      <RNText text={text} style={dynamicStyles.font} />
    </RNView>
  );
};

export default RNBanner;
