import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayContentNotFound, IPayHeader, useToastContext } from '@app/components/molecules';
import DynamicFormComponent from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.component';
import useDynamicForm from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.hook';
import useParentLovChange from '@app/components/molecules/ipay-dynamic-form/useParentLovChange.hook';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { DYNAMIC_FIELDS_TYPES, SNAP_POINTS, TRAFFIC_VIOLATIONS_ID } from '@app/constants/constants';
import { MoiPaymentFormFields } from '@app/enums/moi-payment.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getBillersService from '@app/network/services/bill-managment/get-billers/get-billers.service';
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import getDynamicFieldsService from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.service';
import { BillersService } from '@app/network/services/bills-management/get-billers-services/get-billers-services.interface';
import getBillersServiceProvider from '@app/network/services/bills-management/get-billers-services/get-billers-services.service';
import { BillersTypes } from '@app/network/services/bills-management/get-billers/get-billers.interface';
import validateBill from '@app/network/services/bills-management/validate-moi-bill/validate-moi-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { MoiPaymentTypes, buttonVariants } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RequiredInPaymentOrRefund } from './moi-payment.interface';
import moiPaymentStyles from './moi-payment.style';

const MoiPaymentScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = moiPaymentStyles(colors);
  const [serviceProviderValue, setServiceProviderValue] = useState<string | null>(null);
  const [serviceTypeValue, setServiceTypeValue] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>(MoiPaymentTypes.PAYMENT);
  const [selectedBiller, setSelectedBiller] = useState<string>('');
  const [isInquired, setIsInquired] = useState<boolean>(false);
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [fields, setFields] = useState<DynamicField[]>([]);
  const [serviceFields, setServiceFields] = useState<DynamicField[]>([]);
  const { t } = useTranslation();
  const { showToast } = useToastContext();
  const tabs = [t('BILL_PAYMENTS.PAYMENT'), t('BILL_PAYMENTS.REFUND')];
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const invoiceSheetRef = useRef<bottomSheetTypes>(null);
  const benLabel = 'BILL_PAYMENTS.BENEFECIARY_DETAILS';
  const useID = t('BILL_PAYMENTS.USE_MY_ID');
  const handleTabSelect = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
    },
    [selectedTab],
  );

  const { defaultValues, validationSchema } = useDynamicForm(fields);

  const onGetBillers = async () => {
    const deviceInfo = await getDeviceInfo();
    const payload = {
      includeBillerDetails: 'false',
      deviceInfo,
      billerStatus: 'E',
      billerType: '7',
    };

    const apiResponse = await getBillersService(payload);
    if (apiResponse?.successfulResponse) {
      const serviceProvider = apiResponse?.response?.billersList?.map((billerItem: BillersTypes) => ({
        ...billerItem,
        code: billerItem.billerId,
        desc: billerItem.billerDesc,
      }));
      const updatedFields: any[] = [
        {
          index: MoiPaymentFormFields.SERVICE_PROVIDER,
          integrationTagName: MoiPaymentFormFields.SERVICE_PROVIDER,
          label: 'BILL_PAYMENTS.SERVICE_PROVIDER',
          lovList: serviceProvider,
          type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
          isSearchable: true,
        },
        {
          index: MoiPaymentFormFields.SERVICE_TYPE,
          label: 'BILL_PAYMENTS.SERVICE_TYPE',
          integrationTagName: MoiPaymentFormFields.SERVICE_TYPE,
          lovList: [],
          type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
          isSearchable: true,
        },
      ];
      setServiceFields(updatedFields);

      setFields(updatedFields);
    }
  };

  useEffect(() => {
    onGetBillers();
  }, []);

  const onGetBillersServices = async (billerID?: string) => {
    const apiResponse = await getBillersServiceProvider(billerID || '');

    if (apiResponse?.successfulResponse) {
      const serviceList = apiResponse?.response?.servicesList?.map((serviceItem: BillersService) => ({
        ...serviceItem,
        code: serviceItem.serviceId,
        desc: serviceItem.serviceDesc,
      }));
      return serviceList;
    }
    return null;
  };

  const fetchFields = async (serviceProviderVal: string, serviceType: string) => {
    setSelectedBiller(serviceProviderVal);
    setSelectedServiceType(serviceType);
    const response = await getDynamicFieldsService(serviceProviderVal, serviceType, walletNumber);
    if (response) {
      const fetchedFields = response.response.dynamicFields;

      const beneficiaryLabel = [
        {
          index: benLabel,
          integrationTagName: benLabel,
          type: DYNAMIC_FIELDS_TYPES.LABEL,
          value: benLabel,
        },
        {
          index: useID,
          integrationTagName: useID,
          type: DYNAMIC_FIELDS_TYPES.BOOLEAN_TYPE,
          requiredInPaymentOrRefund: 'BOTH',
          label: useID,
          value: true,
        },
      ];

      const filteredFields = fetchedFields.filter((field) => {
        if (selectedTab === MoiPaymentTypes.REFUND) {
          return (
            field.requiredInPaymentOrRefund === RequiredInPaymentOrRefund.REFUND ||
            field.requiredInPaymentOrRefund === RequiredInPaymentOrRefund.BOTH
          );
        }
        return (
          field.requiredInPaymentOrRefund === RequiredInPaymentOrRefund.PAYMENT ||
          field.requiredInPaymentOrRefund === RequiredInPaymentOrRefund.BOTH
        );
      });

      const updatedFields: any[] = [...serviceFields, ...beneficiaryLabel, ...filteredFields];
      setFields(updatedFields);
    }
  };
  const resetFields = (reset: () => void) => {
    setIsInquired(false);
    setFields([]);
    onGetBillers();
    reset();
  };

  const handleChange = async (selectedValue: string) => {
    const serviceList = await onGetBillersServices(selectedValue);

    const updatedFields = fields.map((field) => {
      if (field.index === MoiPaymentFormFields.SERVICE_TYPE) {
        return {
          ...field,
          lovList: serviceList,
          disable: false,
        };
      }
      return field;
    });

    setFields(updatedFields);
    setServiceFields(updatedFields);
  };

  useEffect(() => {
    if (serviceProviderValue) handleChange(serviceProviderValue);
  }, [serviceProviderValue]);

  useEffect(() => {
    if (serviceProviderValue) {
      setIsInquired(false);
      setFields(serviceFields);
    }
  }, [serviceProviderValue]);

  useEffect(() => {
    if (serviceTypeValue) {
      setIsInquired(false);
      setFields(serviceFields);
    }
  }, [serviceTypeValue]);

  const handleParentLovChange = useParentLovChange(fields, setFields);

  return (
    <>
      <IPayFormProvider validationSchema={validationSchema} defaultValues={defaultValues}>
        {({ control, formState: { errors, isDirty }, handleSubmit, reset }) => {
          const {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            [MoiPaymentFormFields.SERVICE_PROVIDER]: serviceProviderValue,
            // eslint-disable-next-line @typescript-eslint/no-shadow
            [MoiPaymentFormFields.SERVICE_TYPE]: serviceTypeValue,
            // eslint-disable-next-line react-hooks/rules-of-hooks
          } = useWatch({ control });
          setServiceProviderValue(serviceProviderValue || '');
          setServiceTypeValue(serviceTypeValue || '');
          const isFormValid = !!serviceProviderValue && !!serviceTypeValue;
          const onSubmit = async (data: any) => {
            const excludedIndices = [
              MoiPaymentFormFields.SERVICE_TYPE,
              MoiPaymentFormFields.SERVICE_PROVIDER,
              benLabel,
              useID,
            ];

            const dynamicFields = fields
              .map((item) => {
                const { label, index, value } = item;
                const fieldValueFromData = data[index.replace(/\./g, '_')]; // Matching the index from data with its flat key form

                return {
                  label,
                  index,
                  value: fieldValueFromData !== undefined ? fieldValueFromData : value, // Use value from data if available
                  description: label,
                  isFormValid: !!fieldValueFromData, // Set form validation flag based on field value availability
                };
              })
              .filter((field) => field.value !== undefined && !excludedIndices.includes(field.index));
            const isRefund = selectedTab === MoiPaymentTypes.REFUND;
            const payLoad = {
              dynamicFields,
              walletNumber,
              refund: isRefund,
            };
            const apiResponse = await validateBill(selectedBiller, selectedServiceType, payLoad);
            if (apiResponse?.response) {
              const serviceTypeField = fields.find((field) => field.index === MoiPaymentFormFields.SERVICE_TYPE);
              const serviceProviderField = fields.find(
                (field) => field.index === MoiPaymentFormFields.SERVICE_PROVIDER,
              );
              const serviceProviderFromLOV = serviceProviderField?.lovList?.find(
                (lov: any) => lov?.billerId === serviceProviderValue,
              );
              const serviceTypeFromLOV = serviceTypeField?.lovList?.find((lov) => lov.code === selectedServiceType);
              resetFields(reset);
              navigate(ScreenNames.MOI_PAYMENT_CONFIRMATION, {
                billData: {
                  ...apiResponse.response,
                  dynamicFields,
                  serviceTypeFromLOV,
                  serviceProviderFromLOV,
                },
                isRefund,
              });
            } else {
              invoiceSheetRef.current?.present();
              resetFields(reset);
            }
          };

          const renderToast = () => {
            showToast({
              title: t('ERROR.TRAFFIC_REFUND'),
              isShowRightIcon: false,
              leftIcon: <IPayIcon icon={icons.warning3} size={18} color={colors.natural.natural0} />,
            });
          };

          const handleInquiry = () => {
            if (selectedTab === MoiPaymentTypes.REFUND && serviceProviderValue === TRAFFIC_VIOLATIONS_ID) {
              renderToast();
              resetFields(reset);
            } else {
              setIsInquired(true);
              fetchFields(serviceProviderValue ?? '', serviceTypeValue ?? '');
            }
          };

          return (
            <IPaySafeAreaView>
              <IPayHeader
                backBtn
                onBackPress={() => navigate(ScreenNames.BILL_PAYMENTS_SCREEN)}
                applyFlex
                title="BILL_PAYMENTS.MOI_PAYMENT"
                titleStyle={styles.screenTitle}
              />
              <IPayView style={styles.container}>
                <IPayTabs tabs={tabs} onSelect={handleTabSelect} />

                <IPayView style={styles.contentContainer}>
                  <IPayView style={styles.dynamicFieldContainer}>
                    <DynamicFormComponent
                      handleParentLovChange={handleParentLovChange}
                      errors={errors}
                      control={control}
                      fields={fields}
                    />
                  </IPayView>
                  <IPayButton
                    btnText="NEW_SADAD_BILLS.INQUIRY"
                    btnType={buttonVariants.PRIMARY}
                    onPress={isInquired ? handleSubmit(onSubmit) : handleInquiry}
                    btnStyle={styles.inquiryBtn}
                    large
                    disabled={!isFormValid || !isDirty}
                    btnIconsDisabled
                  />
                </IPayView>
              </IPayView>
            </IPaySafeAreaView>
          );
        }}
      </IPayFormProvider>
      <IPayBottomSheet
        heading="BILL_PAYMENTS.TRAFFIC_VIOLATIONS"
        customSnapPoint={SNAP_POINTS.SMALL}
        onCloseBottomSheet={() => invoiceSheetRef.current?.close()}
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
          onBtnPress={() => invoiceSheetRef.current?.close()}
        />
      </IPayBottomSheet>
    </>
  );
};

export default MoiPaymentScreen;
