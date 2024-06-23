// IpayFlagIcon.tsx
import { IPayFlagCollection } from '@app/assets/icons/ipay-flag-collection';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { IPayFlagIconProps } from './ipay-flag-icon.interface';

const IpayFlagIcon: React.FC<IPayFlagIconProps> = ({ country, testID }) => {
  const svg = IPayFlagCollection[country as keyof typeof IPayFlagCollection];

  return <SvgXml xml={svg} testID={`${testID}-flag-icon`} />; // Pass the testID prop to SvgXml
};

export default IpayFlagIcon;
