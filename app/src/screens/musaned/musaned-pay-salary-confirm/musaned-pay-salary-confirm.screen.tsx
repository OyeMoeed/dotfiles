import React from 'react';

import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';

import MusanedPaySalaryConfirmScreenProps from './musaned-pay-salary-confirm.interface';
import musanedPaySalaryConfirm from './musaned-pay-salary-confirm.style';

const MusanedPaySalaryConfirmScreen: React.FC<MusanedPaySalaryConfirmScreenProps> = () => {
  const styles = musanedPaySalaryConfirm();

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn applyFlex title="MUSANED.HEADER" />
    </IPaySafeAreaView>
  );
};

export default MusanedPaySalaryConfirmScreen;
