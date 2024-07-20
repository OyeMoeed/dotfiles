import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import IPayCreateBeneficiary from '@app/components/templates/ipay-create-beneficiary/ipay-create-beneficiary.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import React from 'react';
import { TextStyle } from 'react-native';
import newBeneficiaryStyles from './new-beneficiary.style';

const NewBeneficiaryScreen: React.FC = () => {
  const styles = newBeneficiaryStyles();
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView testID="new-beneficiary-ipay-view" style={styles.container}>
      <IPayHeader
        backBtn
        title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY}
        applyFlex
        titleStyle={styles.capitalizeTitle as TextStyle}
      />
      <IPayCreateBeneficiary />
    </IPaySafeAreaView>
  );
};

export default NewBeneficiaryScreen;
