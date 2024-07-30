import { IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayMoiPaymentDetailForm } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { FormValues } from '@app/components/templates/ipay-create-beneficiary/ipay-create-beneficiary.interface';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValidationSchemas } from '@app/services/validation-service';
import { MoiPaymentTypes } from '@app/utilities/enums.util';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import moiPaymentStyles from './moi-payment.style';

const MoiPaymentScreen: React.FC = () => {
  const styles = moiPaymentStyles();
  const localizationText = useLocalization();
  const [selectedTab, setSelectedTab] = useState<string>(MoiPaymentTypes.PAYMENT);

  const tabs = [localizationText.BILL_PAYMENTS.PAYMENT, localizationText.BILL_PAYMENTS.REFUND];

  const handleTabSelect = useCallback(
    (tab: string) => {
      if (tab === MoiPaymentTypes.PAYMENT) {
      }
      setSelectedTab(tab);
    },
    [selectedTab],
  );

  const { serviceProvider, serviceType, idType, myId, duration, beneficiaryId, myIdInput } =
    getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    serviceProvider,
    serviceType,
    idType,
    myId,
    duration,
    beneficiaryId,
    myIdInput,
  });

  const onSubmit = () => {};

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={localizationText.BILL_PAYMENTS.MOI_PAYMENT}
        titleStyle={styles.screenTitle}
      />
      <IPayView style={styles.container}>
        <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />
        <IPayFormProvider<FormValues>
          validationSchema={validationSchema}
          defaultValues={{
            serviceProvider: '',
            serviceType: '',
            idType: '',
            duration: '',
            beneficiaryId: '',
            myId: false,
            myIdInput: '',
          }}
        >
          {({ handleSubmit }) => (
            <IPayView style={styles.contentContainer}>
              <IPayMoiPaymentDetailForm />
              <IPayButton
                btnText={localizationText.NEW_SADAD_BILLS.INQUIRY}
                btnType="primary"
                onPress={handleSubmit(onSubmit)}
                large
                btnIconsDisabled
                disabled
              />
            </IPayView>
          )}
        </IPayFormProvider>
        {/* <IPayButton
          large
          disabled
          btnType={buttonVariants.PRIMARY}
          btnText={localizationText.NEW_SADAD_BILLS.INQUIRY}
          btnIconsDisabled
        /> */}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MoiPaymentScreen;
