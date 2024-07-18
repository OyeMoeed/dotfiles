import { IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayActivateBeneficiaryProps from './ipay-activate-beneficiary.interface';
import activateBeneficiaryStyles from './ipay-activate-beneficiary.styles';

const IPayActivateBeneficiary: React.FC<IPayActivateBeneficiaryProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = activateBeneficiaryStyles(colors);
  return <IPayView testID={`${testID}-card-details`} style={styles.container}></IPayView>;
};

export default IPayActivateBeneficiary;
