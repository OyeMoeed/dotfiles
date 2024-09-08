import React from 'react';
import Flag from 'react-native-round-flags';
import IPayFlagsProps from './ipay-flags.interface';
import styles from './ipay-flags.style';

const IPayFlags: React.FC<IPayFlagsProps> = ({ countryCode, style }) => (
  <Flag code={countryCode} style={[styles.container, style]} />
);

export default IPayFlags;
