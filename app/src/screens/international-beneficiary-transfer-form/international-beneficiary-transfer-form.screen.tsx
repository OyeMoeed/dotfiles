import { IPayFootnoteText } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import beneficiaryTransferStyles from './international-beneficiary-transfer-form.style';

const IBeneficiaryTransferScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = beneficiaryTransferStyles();
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY} applyFlex />
      <IPayFootnoteText
        color={colors.natural.natural500}
        style={styles.textStyle}
        text={localizationText.NEW_BENEFICIARY.BENEFECIARY_INFORMATION}
      />

      <IPayButton
        large
        btnType={buttonVariants.PRIMARY}
        btnText={localizationText.NEW_BENEFICIARY.ADD_BENEFICIARY}
        btnIconsDisabled
        btnStyle={styles.btnStyles}
      />
    </IPaySafeAreaView>
  );
};

export default IBeneficiaryTransferScreen;
