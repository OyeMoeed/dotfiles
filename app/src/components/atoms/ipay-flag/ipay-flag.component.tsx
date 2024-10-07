import React from 'react';
import { scale } from 'react-native-size-matters';
import { SvgUri } from 'react-native-svg';
import Config from 'react-native-config';
import IPayFlagProps from './ipay-flag.interface';
import styles from './ipay-flag.style';

const IPayFlag: React.FC<IPayFlagProps> = ({ countryCode, style, isCurrency }) => {
  const { ASSETS_LINK } = Config;

  return (
    <SvgUri
      uri={`${ASSETS_LINK}/${isCurrency ? 'currencies' : 'countries'}/${countryCode}.svg`}
      width={(style && 'width' in style ? style?.width : scale(22)) as number}
      height={(style && 'height' in style ? style?.height : scale(22)) as number}
      style={[styles.container, style]}
    />
  );
};

export default IPayFlag;
