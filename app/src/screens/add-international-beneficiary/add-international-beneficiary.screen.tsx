import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import addBeneficiaryStyles from './add-international-beneficiary.style';

const AddInternationalBeneficiary: React.FC = () => {
  const { colors } = useTheme();
  const styles = addBeneficiaryStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView>
      <IPayHeader
  
        backBtn
        title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY}
        titleStyle={styles.headerText}
        applyFlex
      />
      
    </IPaySafeAreaView>
  );
};

export default AddInternationalBeneficiary;
