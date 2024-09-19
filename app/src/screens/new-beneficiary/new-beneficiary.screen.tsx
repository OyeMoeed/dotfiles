import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCreateBeneficiary from '@app/components/templates/ipay-create-beneficiary/ipay-create-beneficiary.component';
import React from 'react';
import newBeneficiaryStyles from './new-beneficiary.style';

const NewBeneficiaryScreen: React.FC = () => {
  const styles = newBeneficiaryStyles();

  return (
    <IPaySafeAreaView testID="new-beneficiary-ipay-view" style={styles.container}>
      <IPayHeader backBtn title="NEW_BENEFICIARY.NEW_BENEFICIARY" applyFlex titleStyle={styles.capitalizeTitle} />
      <IPayCreateBeneficiary />
    </IPaySafeAreaView>
  );
};

export default NewBeneficiaryScreen;
