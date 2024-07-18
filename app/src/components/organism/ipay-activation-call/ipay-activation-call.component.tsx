import { IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayActivationCallProps from './ipay-activation-call.interface';
import activationCallStyles from './ipay-activation-call.styles';

const IPayActivationCall: React.FC<IPayActivationCallProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = activationCallStyles(colors);
  return <IPayView testID={`${testID}-activation-call`} style={styles.container}></IPayView>;
};

export default IPayActivationCall;
