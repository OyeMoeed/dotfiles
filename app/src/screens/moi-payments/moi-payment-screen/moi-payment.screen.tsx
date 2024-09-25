import { IPayCaption2Text, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import DynamicFormComponent from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.component';
import useDynamicForm from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.hook';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';
import { MoiPaymentFormFields } from '@app/enums/moi-payment.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getBillersService from '@app/network/services/bill-managment/get-billers/get-billers.service';
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import getDynamicFieldsService from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.service';
import { BillersService } from '@app/network/services/bills-management/get-billers-services/get-billers-services.interface';
import getBillersServiceProvider from '@app/network/services/bills-management/get-billers-services/get-billers-services.service';
import { BillersTypes } from '@app/network/services/bills-management/get-billers/get-billers.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { MoiPaymentTypes, buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import moiPaymentStyles from './moi-payment.style';

const MoiPaymentScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = moiPaymentStyles(colors);
  const [serviceProviderValue, setServiceProviderValue] = useState(null);
  const [serviceTypeValue, setServiceTypeValue] = useState(null);
  const [selectedTab, setSelectedTab] = useState<string>(MoiPaymentTypes.PAYMENT);
  const [fields, setFields] = useState<DynamicField[]>([]);
  const { t } = useTranslation();
  const tabs = [t('BILL_PAYMENTS.PAYMENT'), t('BILL_PAYMENTS.REFUND')];
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const handleTabSelect = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
    },
    [selectedTab],
  );

  useEffect(() => {
    onGetBillers();
  }, []);

  const { defaultValues, validationSchema, revertFlatKeys } = useDynamicForm(fields);

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
      const updatedFields = [
        {
          index: MoiPaymentFormFields.SERVICE_PROVIDER,
          integrationTagName: MoiPaymentFormFields.SERVICE_PROVIDER,
          label: 'BILL_PAYMENTS.SERVICE_PROVIDER',
          lovList: serviceProvider,
          type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
          dependsOn: MoiPaymentFormFields.SERVICE_TYPE,
        },
        {
          index: MoiPaymentFormFields.SERVICE_TYPE,
          label: 'BILL_PAYMENTS.SERVICE_TYPE',
          integrationTagName: MoiPaymentFormFields.SERVICE_TYPE,
          lovList: [],
          type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
          disable: true,
          dependsOn: MoiPaymentFormFields.SERVICE_TYPE,
        },
      ];
      setFields(updatedFields);
    }
  };
  const onGetBillersServices = async (billerID?: string) => {
    const apiResponse = await getBillersServiceProvider(billerID);

    if (apiResponse?.successfulResponse) {
      const serviceList = apiResponse?.response?.servicesList?.map((serviceItem: BillersService) => ({
        ...serviceItem,
        code: serviceItem.serviceId,
        desc: serviceItem.serviceDesc,
      }));
      return serviceList;
    }
  };

  const fetchFields = async (selectedBiller: string, selectedServiceType: string) => {
    const response = await getDynamicFieldsService(selectedBiller, selectedServiceType, walletNumber);
    if (response) {
      const fetchedFields = response.response.dynamicFields;

      const updatedFields = [...fields, ...fetchedFields];

      setFields(updatedFields);
    }
  };

  const onSubmit = (data: any) => {
    const originalData = revertFlatKeys(data);

    if (selectedTab === MoiPaymentTypes.REFUND) {
      navigate(ScreenNames.MOI_PAYMENT_REFUND);
    } else {
      navigate(ScreenNames.MOI_PAYMENT_CONFIRMATION);
    }
  };

  const handleChange = async (triggerFieldIndex: string, selectedValue: string) => {
    const dependentField = fields?.find((f) => f.index === triggerFieldIndex);

    if (dependentField) {
      const serviceList = await onGetBillersServices(selectedValue);

      const updatedFields = fields.map((field) => {
        if (field.index === dependentField.index) {
          return {
            ...field,
            lovList: serviceList,
            disable: false,
          };
        }
        return field;
      });

      setFields(updatedFields);
    }
  };

  useEffect(() => {
    if (serviceProviderValue) handleChange(MoiPaymentFormFields.SERVICE_TYPE, serviceProviderValue);
  }, [serviceProviderValue]);

  useEffect(() => {
    if (serviceTypeValue) {
      fetchFields(serviceProviderValue, serviceTypeValue);
    }
  }, [serviceTypeValue]);
  return (
    <IPayFormProvider validationSchema={validationSchema} defaultValues={defaultValues}>
      {({ control, formState: { errors }, handleSubmit }) => {
        const {
          [MoiPaymentFormFields.SERVICE_PROVIDER]: serviceProviderValue,
          [MoiPaymentFormFields.SERVICE_TYPE]: serviceTypeValue,
        } = useWatch({ control });
        setServiceProviderValue(serviceProviderValue);
        setServiceTypeValue(serviceTypeValue);

        return (
          <>
            <IPaySafeAreaView>
              <IPayHeader
                backBtn
                onBackPress={() => navigate(ScreenNames.BILL_PAYMENTS_SCREEN)}
                applyFlex
                title={'BILL_PAYMENTS.MOI_PAYMENT'}
                titleStyle={styles.screenTitle}
              />
              <IPayView style={styles.container}>
                <IPayTabs tabs={tabs} onSelect={handleTabSelect} />

                <IPayView style={styles.contentContainer}>
                  <IPayView style={styles.dynamicFieldContainer}>
                    <IPayCaption2Text regular text={'BILL_PAYMENTS.BENEFECIARY_DETAILS'} />
                    <DynamicFormComponent errors={errors} control={control} fields={fields} />
                  </IPayView>

                  <IPayButton
                    btnText={'NEW_SADAD_BILLS.INQUIRY'}
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
