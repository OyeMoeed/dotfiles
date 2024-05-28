import React from 'react';
import { fallbackVariants } from '@app/utilities/enums';
import { FallbackImage, FallbackLoader, Logo } from '@app/assets/svgs/svg';
import { IPayFallBackImageProps } from './ipay-fallbackimg.interface';
import IPayView from '../view/ipay-view.component';

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

  return <IPayView>{getSvg()}</IPayView>;
};

export default IPayFallbackImg;
