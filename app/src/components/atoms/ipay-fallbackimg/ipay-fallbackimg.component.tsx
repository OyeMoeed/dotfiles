import { fallbackVariants } from '@app/utilities/enums.util';
import icons from '@assets/icons';
import React from 'react';
import IPayView from '../ipay-view/ipay-view.component';
import { IPayFallBackImageProps } from './ipay-fallbackimg.interface';

const IPayFallbackImg: React.FC<IPayFallBackImageProps> = ({ variant }) => {
  const getSvg = () => {
    switch (variant) {
      case fallbackVariants?.IMAGE:
        return <icons.fallbackImage />;
      case fallbackVariants?.LOADER:
        return <icons.fallbackLoader />;
      case fallbackVariants?.LOGO:
        return <icons.logoIcon />;
      default:
        return <icons.logoIcon />;
    }
  };

  return <IPayView>{getSvg()}</IPayView>;
};

export default IPayFallbackImg;
