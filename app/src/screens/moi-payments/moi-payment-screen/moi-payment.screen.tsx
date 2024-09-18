import { IPayCaption2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import DynamicFormComponent from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.component';
import useDynamicForm from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.hook';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { MoiPaymentFormFields } from '@app/enums/moi-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import getDynamicFieldsService from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.service';
import { BillersService } from '@app/network/services/bills-management/get-billers-services/get-billers-services.interface';
import getBillersServiceProvider from '@app/network/services/bills-management/get-billers-services/get-billers-services.service';
import { BillersTypes } from '@app/network/services/bills-management/get-billers/get-billers.interface';
import getBillersService from '@app/network/services/bills-management/get-billers/get-billers.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { MoiPaymentTypes, buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useState } from 'react';

import MoiFormFormValues from './moi-payment.interface';
import moiPaymentStyles from './moi-payment.style';

const MoiPaymentScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = moiPaymentStyles(colors);
  const localizationText = useLocalization();
  const [moiServiceProvider, setMoiServiceProvider] = useState<BillersTypes[]>([]);
  const [moiServiceType, setMoiServiceType] = useState<BillersService[]>();
  const [selectedTab, setSelectedTab] = useState<string>(MoiPaymentTypes.PAYMENT);
  const [search, setSearch] = useState<string>('');
  const [bottomSheetData, setBottomSheetData] = useState<{ id: number; text: string }[]>(moiServiceProvider);
  const [filteredData, setFilteredData] = useState<{ id: number; text: string }[]>(moiServiceProvider);
  const [customSnapPoint, setCustomSnapPoints] = useState<string[]>(['1%', '92%']);
  const [, setIsRefund] = useState<boolean>(false);
  const [beneficiaryID, setBeneficiaryID] = useState<string>('');
  const [fields, setFields] = useState<DynamicField[]>([]);
  const { myBeneficiaryId = '123123123' } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const tabs = [localizationText.BILL_PAYMENTS.PAYMENT, localizationText.BILL_PAYMENTS.REFUND];
  const [selectedBiller, setSelectedBiller] = useState<string>();
  const [selectedServiceType, setSelectedServiceType] = useState<string>();
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const setFormSheetData = (data: { id: number; text: string }[], snpaPoints: string[]) => {
    setBottomSheetData(data);
    setFilteredData(data);
    setCustomSnapPoints(snpaPoints);
    setSearch('');
  };

  const handleTabSelect = useCallback(
    (tab: string) => {
      if (tab === MoiPaymentTypes.REFUND) {
        setIsRefund(true);
      } else {
        setIsRefund(false);
      }
      setFormSheetData(bottomSheetData, customSnapPoint);
      setSelectedTab(tab);
    },
    [selectedTab],
  );

  useEffect(() => {
    const fetchFields = async () => {
      const response = await getDynamicFieldsService(selectedBiller, selectedServiceType, walletNumber);
      if (response) {
        const fetchedFields = response.response.dynamicFields;
        setFields(fetchedFields);
      }
    };
    fetchFields();
  }, [selectedBiller, selectedServiceType]);

  useEffect(() => {
    onGetBillers();
  }, []);

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
      setMoiServiceProvider(
        apiResponse.response.billersList.map((billerItem: BillersTypes) => ({
          ...billerItem,
          code: billerItem.billerId,
          desc: billerItem.billerDesc,
        })),
      );
    }
  };
  const onGetBillersServices = async (billerID?: string) => {
    const apiResponse = await getBillersServiceProvider(billerID);

    if (apiResponse.successfulResponse) {
      const serviceList = apiResponse.response.servicesList.map((serviceItem: BillersService) => ({
        ...serviceItem,
        id: serviceItem.serviceId,
        text: serviceItem.serviceDesc,
      }));
      setMoiServiceType(serviceList);
    }
  };

  useEffect(() => {
    onGetBillersServices(selectedBiller);
  }, [selectedBiller]);

  const updatedFields = [
    {
      index: MoiPaymentFormFields.SERVICE_PROVIDER,
      integrationTagName: 'BeneficiaryId.OfficialIdType',
      lOVType: '315',
      label: localizationText.BILL_PAYMENTS.SERVICE_PROVIDER,
      lovList: moiServiceProvider,
      maxWidth: 32,
      minWidth: 1,
      orderIndex: '2',
      required: true,
      requiredInPaymentOrRefund: 'PAYMENT',
      type: 'LIST_OF_VALUE',
      value: '1',
    },
    {
      index: MoiPaymentFormFields.SERVICE_TYPE, // Static Field
      label: localizationText.BILL_PAYMENTS.SERVICE_TYPE,
      integrationTagName: 'BeneficiaryId.OfficialIdType',
      lOVType: '315',
      lovList: [],
      maxWidth: 32,
      minWidth: 1,
      orderIndex: '2',
      required: true,
      requiredInPaymentOrRefund: 'PAYMENT',
      type: 'LIST_OF_VALUE',
      value: '1',
    },

    ...fields, // Spread the existing dynamic fields here
  ];

  //dynamic form
  const { defaultValues, validationSchema, revertFlatKeys } = useDynamicForm(updatedFields);

  return (
    <IPayFormProvider<MoiFormFormValues> validationSchema={validationSchema} defaultValues={defaultValues}>
      {({ getValues, control, errors, handleSubmit }) => {
        const getMoiBillData = () => {
          const currentCheck = getValues(MoiPaymentFormFields.MY_ID_CHECK);
          const amount = 500;
          const data = [
            {
              id: '1',
              label: localizationText.BILL_PAYMENTS.DUE_AMOUNT,
              value: `${amount} ${localizationText.COMMON.SAR}`,
            },
            {
              id: '2',
              label: localizationText.BILL_PAYMENTS.SERVICE_PROVIDER,
              value: getValues(MoiPaymentFormFields.SERVICE_PROVIDER),
            },
            {
              id: '3',
              label: localizationText.BILL_PAYMENTS.SERVICE_TYPE,
              value: getValues(MoiPaymentFormFields.SERVICE_TYPE),
            },
            {
              id: '4',
              label: localizationText.BILL_PAYMENTS.BENEFICIARY_ID,
              value: currentCheck ? `${myBeneficiaryId}` : `${beneficiaryID}`,
            },
            {
              id: '5',
              label: localizationText.BILL_PAYMENTS.LICENSE_TYPE,
              value: getValues(MoiPaymentFormFields.ID_TYPE),
            },
            {
              id: '6',
              label: localizationText.BILL_PAYMENTS.DURATION,
              value: getValues(MoiPaymentFormFields.DURATION),
            },
          ];

          return data;
        };

        const onSubmit = (data: any) => {
          const originalData = revertFlatKeys(data);
          console.log('originalData', originalData);

          const moiBillData = getMoiBillData();
          if (selectedTab === MoiPaymentTypes.REFUND) {
            navigate(ScreenNames.MOI_PAYMENT_REFUND, {
              moiBillData,
            });
          } else {
            navigate(ScreenNames.MOI_PAYMENT_CONFIRMATION, { moiBillData });
          }
        };

        return (
          <>
            <IPaySafeAreaView>
              <IPayHeader
                backBtn
                onBackPress={() => navigate(ScreenNames.BILL_PAYMENTS_SCREEN)}
                applyFlex
                title={localizationText.BILL_PAYMENTS.MOI_PAYMENT}
                titleStyle={styles.screenTitle}
              />
              <IPayView style={styles.container}>
                <IPayTabs tabs={tabs} onSelect={handleTabSelect} />

                <IPayView style={styles.contentContainer}>
                  <IPayView style={styles.dynamicFieldContainer}>
                    <IPayCaption2Text regular text={localizationText.BILL_PAYMENTS.BENEFECIARY_DETAILS} />
                    <DynamicFormComponent errors={errors} control={control} fields={updatedFields} />
                  </IPayView>

                  <IPayButton
                    btnText={localizationText.NEW_SADAD_BILLS.INQUIRY}
                    btnType={buttonVariants.PRIMARY}
                    onPress={handleSubmit(onSubmit)}
                    btnStyle={styles.inquiryBtn}
                    large
                    btnIconsDisabled
                  />
                </IPayView>
              </IPayView>
            </IPaySafeAreaView>
          </>
        );
      }}
    </IPayFormProvider>
  );
};

export default MoiPaymentScreen;
