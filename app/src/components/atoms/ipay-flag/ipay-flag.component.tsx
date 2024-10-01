import React from 'react';
import Flag from 'react-native-round-flags';
import IPayFlagProps from './ipay-flag.interface';
import styles from './ipay-flag.style';

const IPayFlag: React.FC<IPayFlagProps> = ({ countryCode, style }) => (
  <Flag code={countryCode} style={[styles.container, style]} />
);

export default IPayFlag;
