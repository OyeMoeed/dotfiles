import { IPayCheckbox, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { ServiceDataProps } from './add-international-beneficiary.interface';
import addBeneficiaryStyles from './add-international-beneficiary.style';

const AddInternationalBeneficiary: React.FC = () => {
  const { colors } = useTheme();
  const styles = addBeneficiaryStyles(colors);
  const localizationText = useLocalization();
  const { AlinmaDirectData, WesternUnionData } = useConstantData();
  const [selectedService, setSelectedService] = useState<string>('');
  const TransferModes = ({ data }: ServiceDataProps) => {
    const { serviceLogo, recordID, serviceName } = data;
    return (
      <IPayView style={styles.cardStyle}>
        <IPayView style={styles.rowStyles}>
          <IPayImage image={serviceLogo} style={styles.logoStyles} />
          <IPayFootnoteText style={styles.textColor} text={serviceName} />
        </IPayView>
        <IPayCheckbox isCheck={selectedService === recordID} onPress={() => setSelectedService(recordID)} />
      </IPayView>
    );
  };
  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.NEW_BENEFICIARY.NEW_BENEFICIARY} applyFlex />
      <TransferModes data={AlinmaDirectData} />
      <TransferModes data={WesternUnionData} />
      <IPayButton
        large
        btnType={buttonVariants.PRIMARY}
        btnText={localizationText.COMMON.NEXT}
        btnIconsDisabled
        btnStyle={styles.btnStyles}
      />
    </IPaySafeAreaView>
  );
};

export default AddInternationalBeneficiary;
