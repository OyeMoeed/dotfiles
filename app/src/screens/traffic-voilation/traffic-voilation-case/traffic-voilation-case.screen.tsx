import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayContentNotFound, IPayHeader, IPayListView } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINTS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';

import { TrafficPaymentFormFields } from '@app/enums/traffic-payment.enum';
import useTheme from '@app/styles/hooks/theme.hook';
import {
  BillPaymentOptions,
  TrafficTabPaymentTypes,
  TrafficVoilationTypes,
  buttonVariants,
} from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import useDynamicForm from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.hook';
import IPayTrafficDetailForm from '@app/components/molecules/ipay-traffic-detail-form/ipay-traffic-detail-form.component';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { DynamicField } from '@app/network/services/bill-managment/moi/get-dynamic-feilds/get-dynamic-fields.interface';
import getDynamicFieldsService from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.service';
import getBillersServiceProvider from '@app/network/services/bills-management/get-billers-services/get-billers-services.service';
import getBillersService from '@app/network/services/bills-management/get-billers/get-billers.service';
import validateBill from '@app/network/services/bills-management/validate-moi-bill/validate-moi-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import { useTranslation } from 'react-i18next';
import TrafficFormValues from './traffic-voilation-case.interface';
import trafficPaymentStyles from './traffic-voilation-case.styles';

const TrafficVoilationCasesScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = trafficPaymentStyles(colors);
  const { t } = useTranslation();
  const { idTypes } = useConstantData();
  const [isRefund, setIsRefund] = useState<boolean>(false);
  const [trafficViolationsData, setTrafficViolationsData] = useState({});
  const [trafficService, setTrafficService] = useState({});
  const [errorMessage, setErrorMessage] = useState<string>('');
  const selectSheeRef = useRef<any>(null);
  const invoiceSheetRef = useRef<any>(null);
  const [fields, setFields] = useState<DynamicField[]>([]);
  const tabs = [t('TRAFFIC_VIOLATION.INQUIRE'), t('TRAFFIC_VIOLATION.REFUND')];
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [trafficServiceType, setTrafficServiceType] = useState([]);
  const [myIdValue, setMyIdValue] = useState<string>('');
  const paymentOrRefund = isRefund ? 'REFUND' : 'PAYMENT';

  const [formSelectedTab, setFormSelectedTab] = useState<string>(TrafficVoilationTypes.BY_VIOLATION_NUM);

  useEffect(() => {
    if (formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_NUM) {
      setTrafficService(trafficServiceType?.[0]);
    } else {
      setTrafficService(trafficServiceType?.[1]);
    }
  }, [formSelectedTab, trafficServiceType]);

  const handleTabSelect = useCallback((tab: string, reset) => {
    if (tab === TrafficTabPaymentTypes.REFUND) {
      setIsRefund(true);
    } else {
      setIsRefund(false);
    }
    reset();
  }, []);

  const handleFormTabSelect = useCallback((tab: string, reset) => {
    setFormSelectedTab(tab);
    reset();
  }, []);

  const onValidateBills = async (data: any) => {
    const appendField =
      formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_NUM
        ? {
            label: 'Violation Number',
            index: 'BeneficiaryId.OfficialNumber',
            value: data['BeneficiaryId_OfficialNumber'],
            description: data['BeneficiaryId_OfficialNumber'],
            isFormValid: 'false',
          }
        : null;
    const payLoad = {
      dynamicFields: [
        {
          label: 'Violator ID',
          index: 'BeneficiaryId.OfficialId',
          value: data['BeneficiaryId_OfficialId'],
          description: data['BeneficiaryId_OfficialId'],
          isFormValid: 'false',
        },
        {
          label: 'ID Type',
          index: 'BeneficiaryId.OfficialIdType',
          value: data['BeneficiaryId_OfficialIdType'],
          description: data['BeneficiaryId_OfficialIdType'],
          isFormValid: 'false',
        },
        ...(appendField ? [appendField] : []),
      ],
      walletNumber,
      refund: isRefund,
    };

    const apiResponse = await validateBill(trafficViolationsData?.billerId, trafficService?.serviceId, payLoad);
    if (apiResponse?.successfulResponse) {
      if (formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_NUM && isRefund) {
        navigate(ScreenNames.TRAFFIC_VOILATION_NUM_REFUND);
      } else if (formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_ID && isRefund) {
        navigate(ScreenNames.TRAFFIC_VOILATION_ID_REFUND);
      } else if (formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_ID && !isRefund) {
        navigate(ScreenNames.TRAFFIC_VOILATION_ID);
      } else {
        navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT, { variant: true, payOnly: false });
      }
    }
  };

  const onGetBillers = async () => {
    const deviceInfo = await getDeviceInfo();
    const payload = {
      includeBillerDetails: 'false',
      deviceInfo,
      billerStatus: 'E',
      billerType: '7',
    };

    const apiResponse = await getBillersService(payload);
    if (apiResponse.successfulResponse) {
      const trafficViolationObject = apiResponse?.response?.billersList?.find(
        (item) => item?.billerDesc === BillPaymentOptions.TRAFFIC_VIOLATION,
      );
      setTrafficViolationsData(trafficViolationObject);
    }
  };

  const fetchFields = async () => {
    const apiResponse = await getDynamicFieldsService(
      trafficViolationsData?.billerId,
      trafficService?.serviceId,
      walletNumber,
      formSelectedTab === TrafficVoilationTypes.BY_VIOLATION_NUM,
    );

    if (apiResponse) {
      const fetchedFields = apiResponse.response.dynamicFields;
      const filteredFields = fetchedFields.filter((field) => field.requiredInPaymentOrRefund === paymentOrRefund);
      setFields(filteredFields);
      setMyIdValue(apiResponse?.response?.customerIdNumber?.value);
    }
  };

  useEffect(() => {
    if (trafficService?.serviceId) {
      fetchFields();
    }
  }, [trafficService, isRefund]);

  useEffect(() => {
    onGetBillers();
  }, []);

  const onGetBillersServices = async (billerID?: string) => {
    const apiResponse = await getBillersServiceProvider(billerID);

    if (apiResponse.successfulResponse) {
      setTrafficServiceType(apiResponse.response.servicesList);
    }
  };

  useEffect(() => {
    if (trafficViolationsData?.billerId) {
      onGetBillersServices(trafficViolationsData?.billerId);
    }
  }, [trafficViolationsData]);

  const { defaultValues, validationSchema } = useDynamicForm(fields);

  return (
    <IPayFormProvider<TrafficFormValues> validationSchema={validationSchema} defaultValues={defaultValues}>
      {({ setValue, getValues, control, formState: { errors, isValid }, watch, handleSubmit, reset }) => {
        const myIdChecked = watch(TrafficPaymentFormFields.MY_ID_CHECK); // Watch the checkbox value

        const onSelectValue = (item: { id: number; text: string }) => {
          const { text } = item;

          setValue(TrafficPaymentFormFields.ID_TYPE, text);
          selectSheeRef.current.close();
        };

        const onCheckboxAction = () => {
          const currentCheck = !getValues(TrafficPaymentFormFields.MY_ID_CHECK);

          if (currentCheck) {
            setValue('BeneficiaryId_OfficialId', myIdValue); // Set MY_ID if checkbox is checked
          } else {
            setValue('BeneficiaryId_OfficialId', ''); // Clear MY_ID if checkbox is unchecked
          }
          setValue(TrafficPaymentFormFields.MY_ID_CHECK, currentCheck); // Toggle the checkbox value

          setErrorMessage('');
        };

        return (
          <>
            <IPaySafeAreaView>
              <IPayHeader backBtn applyFlex title="BILL_PAYMENTS.TRAFFIC_VIOLATIONS" titleStyle={styles.screenTitle} />
              <IPayView style={styles.container}>
                <IPayTabs tabs={tabs} onSelect={(tab) => handleTabSelect(tab, reset)} />
                <IPayView style={styles.contentContainer}>
                  <IPayTrafficDetailForm
                    formSelectedTab={formSelectedTab}
                    handleFormTabSelect={(tab) => handleFormTabSelect(tab, reset)}
                    onCheckboxAction={onCheckboxAction}
                    myIdCheck={myIdChecked}
                    control={control}
                    errorMessage={errorMessage}
                    fields={fields}
                    errors={errors}
                    myIdValue={myIdValue}
                  />
                  <IPayButton
                    btnText={isRefund ? t('TRAFFIC_VIOLATION.REFUND') : t('NEW_SADAD_BILLS.INQUIRE')}
                    btnType={buttonVariants.PRIMARY}
                    onPress={handleSubmit(onValidateBills)}
                    large
                    btnIconsDisabled
                    disabled={!isValid}
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
                <IPayListView
                  list={idTypes}
                  onPressListItem={onSelectValue}
                  selectedListItem={getValues(TrafficPaymentFormFields.VOILATION_NUMBER)}
                />
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
