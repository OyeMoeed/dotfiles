import React from 'react';
import RNView from '../view/rn-view.component';
import { IPayFallBackImageProps } from './ipay-fallbackimg.interface';
import { fallbackVariants } from '@app/utilities/enums';
import { FallbackImage, FallbackLoader, Logo } from '@app/assets/svgs/svg';

const IPayFallbackImg: React.FC<IPayFallBackImageProps> = ({ variant }) => {
  const getSvg = () => {
    switch (variant) {
      case fallbackVariants?.IMAGE:
        return <FallbackImage />;
      case fallbackVariants?.LOADER:
        return <FallbackLoader />;
      case fallbackVariants?.LOGO:
        return <Logo />;
      default:
        return <Logo />;
    }
  };

  return <RNView>{getSvg()}</RNView>;
};

export default IPayFallbackImg;
