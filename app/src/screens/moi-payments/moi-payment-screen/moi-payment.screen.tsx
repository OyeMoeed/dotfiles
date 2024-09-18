import icons from '@app/assets/icons';
import { IPayCaption2Text, IPayIcon, IPayView } from '@app/components/atoms';
import {
  IPayButton,
  IPayContentNotFound,
  IPayHeader,
  IPayListView,
  IPayNoResult,
  IPayTextInput,
} from '@app/components/molecules';
import DynamicFormComponent from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.component';
import useDynamicForm from '@app/components/molecules/ipay-dynamic-form/ipay-dynamic-form.hook';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { MoiPaymentFormFields, MoiPaymentType } from '@app/enums/moi-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { DynamicField } from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.interface';
import getDynamicFieldsService from '@app/network/services/bills-management/dynamic-fields/dynamic-fields.service';
import { getValidationSchemas } from '@app/services';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { MoiPaymentTypes } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MoiFormFormValues from './moi-payment.interface';
import moiPaymentStyles from './moi-payment.style';

const MoiPaymentScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = moiPaymentStyles(colors);
  const localizationText = useLocalization();
  const { moiServiceProvider, moiServiceType, moiPaymentDuration, idTypes } = useConstantData();
  const [selectedTab, setSelectedTab] = useState<string>(MoiPaymentTypes.PAYMENT);
  const [sheetType, setSheetType] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [bottomSheetData, setBottomSheetData] = useState<{ id: number; text: string }[]>(moiServiceProvider);
  const [filteredData, setFilteredData] = useState<{ id: number; text: string }[]>(moiServiceProvider);
  const [customSnapPoint, setCustomSnapPoints] = useState<string[]>(['1%', '92%']);
  const [isBtnEnabled, setBtnEnabled] = useState<boolean>(false);
  const [, setIsRefund] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [beneficiaryID, setBeneficiaryID] = useState<string>('');
  const [selectedBiller, setSelectedBiller] = useState<string>();
  const [fields, setFields] = useState<DynamicField[]>([]);
  const [selectedServiceType, setSelectedServiceType] = useState<string>();
  const selectSheeRef = useRef<any>(null);
  const invoiceSheetRef = useRef<any>(null);
  const { myBeneficiaryId = '123123123' } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const tabs = [localizationText.BILL_PAYMENTS.PAYMENT, localizationText.BILL_PAYMENTS.REFUND];
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { serviceProvider, serviceType, idType, myIdCheck, duration, beneficiaryId, myIdInput, myId } =
    getValidationSchemas(localizationText);

  // const validationSchema = Yup.object().shape({
  //   serviceProvider,
  //   serviceType,
  //   idType,
  //   myIdCheck,
  //   duration,
  //   beneficiaryId,
  //   myIdInput,
  //   myId,
  // });

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

  const setDataForBottomSheet = (type: string) => {
    switch (type) {
      case MoiPaymentType.SERVICE_TYPE:
        setFormSheetData(moiServiceType, ['1%', '92%']);
        break;
      case MoiPaymentType.ID_TYPE:
        setFormSheetData(idTypes, ['1%', '40%']);
        break;
      case MoiPaymentType.DURATION:
        setFormSheetData(moiPaymentDuration, ['1%', '40%']);
        break;
      default:
        setFormSheetData(moiServiceProvider, ['1%', '92%']);
        break;
    }
  };

  const onOpenSheet = (type: string) => {
    setSheetType(type);
    setDataForBottomSheet(type);
    selectSheeRef.current.present();
  };

  const onSearchTextChange = (text: string) => {
    if (text) {
      setSearch((prevQuery) => {
        if (prevQuery !== text) {
          const filtered = bottomSheetData.filter((service) => service.text.toLowerCase().includes(text.toLowerCase()));
          setFilteredData(filtered);
        }
        return text;
      });
    } else {
      setSearch(text);
      setFilteredData(bottomSheetData);
    }
  };

  const getBottomSheetHeading = () => {
    switch (sheetType) {
      case MoiPaymentType.SERVICE_TYPE:
        return localizationText.BILL_PAYMENTS.SERVICE_TYPE;
      case MoiPaymentType.ID_TYPE:
        return localizationText.BILL_PAYMENTS.ID_TYPE;
      case MoiPaymentType.DURATION:
        return localizationText.BILL_PAYMENTS.DURATION;
      default:
        return localizationText.BILL_PAYMENTS.SERVICE_PROVIDER;
    }
  };

  const updatedFields = [
    {
      index: MoiPaymentFormFields.SERVICE_PROVIDER,
      integrationTagName: 'BeneficiaryId.OfficialIdType',
      lOVType: '315',
      label: localizationText.BILL_PAYMENTS.SERVICE_PROVIDER,
      lovList: [],
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
      {({ setValue, getValues, control, watch, errors, handleSubmit }) => {
        const myIdChecked = watch(MoiPaymentFormFields.MY_ID_CHECK); // Watch the checkbox value

        const onSelectValue = (item: { id: number; text: string }) => {
          const { text } = item;
          switch (sheetType) {
            case MoiPaymentType.SERVICE_PROVIDER:
              setValue(MoiPaymentFormFields.SERVICE_PROVIDER, text);
              break;
            case MoiPaymentType.SERVICE_TYPE:
              setValue(MoiPaymentFormFields.SERVICE_TYPE, text);
              break;
            case MoiPaymentType.ID_TYPE:
              setValue(MoiPaymentFormFields.ID_TYPE, text);
              break;
            case MoiPaymentType.DURATION:
              setValue(MoiPaymentFormFields.DURATION, text);
              break;
            default:
              break;
          }

          setSearch('');
          selectSheeRef.current.close();
        };

        const getSelectedValue = () => {
          switch (sheetType) {
            case MoiPaymentType.SERVICE_PROVIDER:
              return getValues(MoiPaymentFormFields.SERVICE_PROVIDER);
            case MoiPaymentType.SERVICE_TYPE:
              return getValues(MoiPaymentFormFields.SERVICE_TYPE);
            case MoiPaymentType.ID_TYPE:
              return getValues(MoiPaymentFormFields.ID_TYPE);
            default:
              return getValues(MoiPaymentFormFields.DURATION);
          }
        };

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
              <>
                <IPayHeader
                  backBtn
                  onBackPress={() => navigate(ScreenNames.BILL_PAYMENTS_SCREEN)}
                  applyFlex
                  title={localizationText.BILL_PAYMENTS.MOI_PAYMENT}
                  titleStyle={styles.screenTitle}
                />
                <IPayView style={styles.container}>
                  <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />

                  <IPayView style={styles.contentContainer}>
                    <IPayView style={styles.dynamicFieldContainer}>
                      <IPayCaption2Text regular text={localizationText.BILL_PAYMENTS.BENEFECIARY_DETAILS} />

                      <DynamicFormComponent errors={errors} control={control} fields={updatedFields} />
                    </IPayView>

                    <IPayButton
                      btnText={localizationText.NEW_SADAD_BILLS.INQUIRY}
                      btnType="primary"
                      onPress={handleSubmit(onSubmit)}
                      btnStyle={styles.inquiryBtn}
                      large
                      btnIconsDisabled
                      // disabled={isBtnEnabled}
                    />
                  </IPayView>
                </IPayView>
              </>
            </IPaySafeAreaView>
            <IPayBottomSheet
              heading={getBottomSheetHeading()}
              customSnapPoint={customSnapPoint}
              onCloseBottomSheet={() => selectSheeRef.current.close()}
              ref={selectSheeRef}
              simpleBar
              cancelBnt
              bold
              headerContainerStyles={styles.sheetHeader}
              bgGradientColors={colors.sheetGradientPrimary10}
              bottomSheetBgStyles={styles.sheetBackground}
            >
              <IPayView>
                <IPayView style={styles.bottomSheetView}>
                  {(sheetType === MoiPaymentType.SERVICE_PROVIDER || sheetType === MoiPaymentType.SERVICE_TYPE) && (
                    <IPayView style={styles.searchInputWrapper}>
                      <IPayTextInput
                        text={search}
                        onChangeText={onSearchTextChange}
                        placeholder={localizationText.LOCAL_TRANSFER.SEARCH_FOR_NAME}
                        rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                        simpleInput
                        style={styles.inputStyle}
                        containerStyle={styles.searchInputStyle}
                      />
                    </IPayView>
                  )}
                  {filteredData?.length ? (
                    <IPayListView
                      list={filteredData}
                      onPressListItem={onSelectValue}
                      selectedListItem={getSelectedValue()}
                      isCompleteItem
                      listStyles={styles.listStyles}
                    />
                  ) : (
                    <IPayView style={styles.noRecordContainer}>
                      <IPayNoResult
                        containerStyle={styles.noRecordWrapper}
                        iconViewStyles={styles.iconView}
                        message={
                          sheetType === MoiPaymentType.SERVICE_PROVIDER
                            ? localizationText.BILL_PAYMENTS.NO_SERVICE_PROVIDER_FOUND
                            : localizationText.BILL_PAYMENTS.NO_SERVICE_TYPE_FOUND
                        }
                        showIcon
                        icon={icons.note_remove}
                        iconSize={40}
                        iconColor={colors.primary.primary800}
                      />
                    </IPayView>
                  )}
                </IPayView>
              </IPayView>
            </IPayBottomSheet>
            <IPayBottomSheet
              heading={localizationText.BILL_PAYMENTS.MOI_BILLS}
              customSnapPoint={['1%', isAndroidOS ? '43%' : '44%']}
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
                title={localizationText.BILL_PAYMENTS.NO_BILLS_WERE_FOUND}
                message={localizationText.BILL_PAYMENTS.NO_BILLS_FOUND_ERROR_MESSAGE}
                btnText={localizationText.COMMON.TRY_AGAIN}
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

export default MoiPaymentScreen;
