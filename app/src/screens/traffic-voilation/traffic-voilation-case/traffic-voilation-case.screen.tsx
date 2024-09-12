import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayContentNotFound, IPayHeader, IPayListView } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import IPayTrafficDetailForm from '@app/components/molecules/ipay-traffic-detail-form/ipay-traffic-detail-form.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';

import { TrafficPaymentFormFields, TrafficPaymentType } from '@app/enums/traffic-payment.enum';
import { getValidationSchemas } from '@app/services';
import useTheme from '@app/styles/hooks/theme.hook';
import { TrafficTabPaymentTypes, TrafficVoilationTypes, buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import TrafficFormValues from './traffic-voilation-case.interface';
import trafficPaymentStyles from './traffic-voilation-case.styles';
import { useTranslation } from 'react-i18next';

const TrafficVoilationCasesScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = trafficPaymentStyles(colors);
  const { t } = useTranslation();
  const { idTypes } = useConstantData();
  const [, setSelectedTab] = useState<string>(TrafficTabPaymentTypes.INQUIRE);
  const [sheetType, setSheetType] = useState<string>('');
  const [isBtnEnabled, setBtnEnabled] = useState<boolean>(false);
  const [isRefund, setIsRefund] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const selectSheeRef = useRef<any>(null);
  const invoiceSheetRef = useRef<any>(null);
  const tabs = [t('TRAFFIC_VIOLATION.INQUIRE'), t('TRAFFIC_VIOLATION.REFUND]')];

  const { serviceProvider, serviceType, idType, duration, beneficiaryId, myIdInput, myId } = getValidationSchemas(t);
  const [formSelectedTab, setFormSelectedTab] = useState<string>(TrafficVoilationTypes.BY_VIOLATION_NUM);
  const validationSchema = Yup.object().shape({
    serviceProvider,
    serviceType,
    idType,
    duration,
    beneficiaryId,
    myIdInput,
    myId,
  });

  const handleTabSelect = useCallback((tab: string) => {
    if (tab === TrafficTabPaymentTypes.REFUND) {
      setIsRefund(true);
    } else {
      setIsRefund(false);
    }

    setSelectedTab(tab);
  }, []);

  const onOpenSheet = (type: string) => {
    setSheetType(type);

    selectSheeRef.current.present();
  };

  const handleFormTabSelect = useCallback((tab: string) => {
    setFormSelectedTab(tab);
  }, []);
  return (
    <IPayFormProvider<TrafficFormValues>
      validationSchema={validationSchema}
      defaultValues={{
        idType: '',
        beneficiaryId: '',
        voilationNumber: '',
        myIdInput: '',
        myId: '',
      }}
    >
      {({ setValue, getValues, control, watch }) => {
        const myIdChecked = watch(TrafficPaymentFormFields.MY_ID_CHECK); // Watch the checkbox value

        const onSelectValue = (item: { id: number; text: string }) => {
          const { text } = item;

          setValue(TrafficPaymentFormFields.ID_TYPE, text);
          selectSheeRef.current.close();
        };

        const onCheckboxAction = () => {
          const currentCheck = !getValues(TrafficPaymentFormFields.MY_ID_CHECK);

          /// TODO will change this
          if (currentCheck) {
            setValue(TrafficPaymentFormFields.MY_ID, '1243425454'); // Set MY_ID if checkbox is checked
          } else {
            setValue(TrafficPaymentFormFields.MY_ID, ''); // Clear MY_ID if checkbox is unchecked
          }
          setValue(TrafficPaymentFormFields.MY_ID_CHECK, currentCheck); // Toggle the checkbox value

          setErrorMessage('');
        };

        const getSelectedValue = () => {
          switch (sheetType) {
            case TrafficPaymentType.ID_TYPE:
              return getValues(TrafficPaymentFormFields.ID_TYPE);
            default:
              return getValues(TrafficPaymentFormFields.VOILATION_NUMBER);
          }
        };

        const clearBeneficiaryFelid = () => {
          setErrorMessage('');
          if (getValues(TrafficPaymentFormFields.MY_ID).length > 0) {
            setValue(TrafficPaymentFormFields.MY_ID, '');
          }
        };

        const clearVoilationNumber = () => {
          if (getValues(TrafficPaymentFormFields.VOILATION_NUMBER).length > 0) {
            setValue(TrafficPaymentFormFields.VOILATION_NUMBER, '');
          }
        };
        const onChangeText = (text: string) => {
          if (text.length > 0) {
            setBtnEnabled(false);
          } else {
            setBtnEnabled(true);
          }
          setErrorMessage('');
        };

        const onSubmit = () => {
          if (formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_NUM && isRefund) {
            navigate(ScreenNames.TRAFFIC_VOILATION_NUM_REFUND);
          } else if (formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_ID && isRefund) {
            navigate(ScreenNames.TRAFFIC_VOILATION_ID_REFUND);
          } else if (formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_ID && !isRefund) {
            navigate(ScreenNames.TRAFFIC_VOILATION_ID);
          } else {
            navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT, { variant: ScreenNames.TRAFFIC_VOILATION_CASES_SCREEN });
          }
        };

        return (
          <>
            <IPaySafeAreaView>
              <IPayHeader backBtn applyFlex title="BILL_PAYMENTS.TRAFFIC_VIOLATIONS" titleStyle={styles.screenTitle} />
              <IPayView style={styles.container}>
                <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />
                <IPayView style={styles.contentContainer}>
                  <IPayTrafficDetailForm
                    formSelectedTab={formSelectedTab}
                    handleFormTabSelect={handleFormTabSelect}
                    onCheckboxAction={onCheckboxAction}
                    onBeneficiaryIdAction={clearBeneficiaryFelid}
                    onIdTypeAction={() => onOpenSheet(TrafficPaymentType.ID_TYPE)}
                    clearVoilationNumber={clearVoilationNumber}
                    myIdCheck={myIdChecked}
                    control={control}
                    onChangeText={onChangeText}
                    errorMessage={errorMessage}
                  />
                  <IPayButton
                    btnText={isRefund ? t('TRAFFIC_VIOLATION.REFUND') : t('NEW_SADAD_BILLS.INQUIRY')}
                    btnType={buttonVariants.PRIMARY}
                    onPress={onSubmit}
                    large
                    btnIconsDisabled
                    disabled={isBtnEnabled}
                  />
                </IPayView>
              </IPayView>
            </IPaySafeAreaView>
            <IPayBottomSheet
              heading="BILL_PAYMENTS.ID_TYPE"
              customSnapPoint={SNAP_POINTS.SMALL}
              onCloseBottomSheet={() => selectSheeRef.current.close()}
              ref={selectSheeRef}
              simpleBar
              cancelBnt
              bold
              headerContainerStyles={styles.sheetHeader}
              bgGradientColors={colors.sheetGradientPrimary10}
              bottomSheetBgStyles={styles.sheetBackground}
            >
              <IPayView style={styles.bottomSheetView}>
                <IPayListView list={idTypes} onPressListItem={onSelectValue} selectedListItem={getSelectedValue()} />
              </IPayView>
            </IPayBottomSheet>
            <IPayBottomSheet
              heading="BILL_PAYMENTS.TRAFFIC_VIOLATIONS"
              customSnapPoint={SNAP_POINTS.SMALL}
              onCloseBottomSheet={() => invoiceSheetRef.current.close()}
              ref={invoiceSheetRef}
              simpleBar
              cancelBnt
              bold
              headerContainerStyles={styles.sheetHeader}
              bgGradientColors={colors.sheetGradientPrimary10}
              bottomSheetBgStyles={styles.sheetBackground}
            >
              <IPayContentNotFound
                title="BILL_PAYMENTS.NO_BILLS_WERE_FOUND"
                message="BILL_PAYMENTS.NO_BILLS_FOUND_ERROR_MESSAGE"
                btnText="COMMON.TRY_AGAIN"
                isShowButton
                icon={<IPayIcon icon={icons.note_remove_warning} size={64} />}
                onBtnPress={() => invoiceSheetRef.current.close()}
              />
            </IPayBottomSheet>
          </>
        );
      }}
    </IPayFormProvider>
  );
};

export default TrafficVoilationCasesScreen;
