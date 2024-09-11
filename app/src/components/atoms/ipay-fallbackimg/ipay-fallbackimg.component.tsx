import { FallbackVariants } from '@app/utilities/enums.util';
import icons from '@assets/icons';
import React from 'react';
import { IPayView } from '..';
import { IPayFallBackImageProps } from './ipay-fallbackimg.interface';

const IPayFallbackImg: React.FC<IPayFallBackImageProps> = ({ variant }) => {
  const getSvg = () => {
    switch (variant) {
      case FallbackVariants?.IMAGE:
        return <icons.fallbackImage />;
      case FallbackVariants?.LOADER:
        return <icons.fallbackLoader />;
      case FallbackVariants?.LOGO:
        return <icons.logoIcon />;
      default:
        return <icons.logoIcon />;
    }
  };

  return <IPayView>{getSvg()}</IPayView>;
};

export default IPayFallbackImg;
