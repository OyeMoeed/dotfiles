import { IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayReceiveCallProps from './ipay-receive-call.interface';
import receiveCallStyles from './ipay-receive-call.styles';

const IPayReceiveCall: React.FC<IPayReceiveCallProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = receiveCallStyles(colors);
  return <IPayView testID={`${testID}-receive-call`} style={styles.container}></IPayView>;
};

export default IPayReceiveCall;
