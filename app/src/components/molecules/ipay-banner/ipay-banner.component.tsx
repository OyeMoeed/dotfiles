import { IPayText, IPayView } from '@app/components/atoms';
import React from 'react';
import { IPayBannerProps } from './ipay-banner.interface';
import styles from './ipay-banner.style';

/**
 * A component consisting of a heading and an input field.
 * @param {IPayBannerProps} props - The props for the RNBanner component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayBanner: React.FC<IPayBannerProps> = ({ testID, text, variant }) => {
  const dynamicStyles = styles(variant);

  return (
    <IPayView testID={`${testID}-banner`} style={dynamicStyles.container}>
      <IPayText text={text} style={dynamicStyles.font} />
    </IPayView>
  );
};

export default IPayBanner;
