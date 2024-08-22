import icons from '@app/assets/icons';
import { IPayIcon, IPayImage, IPayScrollView, IPayView } from '@app/components/atoms';
import {
  IPayButton,
  IPayContentNotFound,
  IPayHeader,
  IPayListView,
  IPayNoResult,
  IPaySadadBillDetailForm,
  IPayTextInput,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPaySadadSaveBill from '@app/components/molecules/ipay-sadad-save-bill/ipay-sadad-save-bill.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayBillBalance, IPaySafeAreaView } from '@app/components/templates';
import { NO_INVOICE_ACCOUNT_NUMBER } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { FormFields, NewSadadBillType } from '@app/enums/bill-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { FC, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormValues, NewSadadBillProps, SelectedValue } from './add-new-sadad-bill.interface';
import addSadadBillStyles from './add-new-sadad-bill.style';

const AddNewSadadBillScreen: FC<NewSadadBillProps> = ({ route }) => {
  const { selectedBills = [], isSaveOnly, isPayPartially } = route.params || {};
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = addSadadBillStyles(colors);
  const selectSheeRef = useRef<any>(null);
  const invoiceSheetRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [sheetType, setSheetType] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filterData, setFilterData] = useState<Array<object>>([]);

  const tabOption = ['All', 'Communications', 'Banks', 'Global Services'];

  const { sadadBillsCompanyData, sadadServiceTypeData } = useConstantData();

  const { companyName, serviceType, accountNumber, billName } = getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    companyName,
    serviceType,
    accountNumber,
    billName,
  });

  useEffect(() => {
    if (sheetType === NewSadadBillType.COMPANY_NAME) {
      setFilterData(sadadBillsCompanyData);
    } else {
      setFilterData(sadadServiceTypeData);
    }
  }, [sheetType]);

  const onSubmit = (values: FormValues) => {
    if (values.accountNumber === NO_INVOICE_ACCOUNT_NUMBER) {
      invoiceSheetRef.current.present();
    } else {
      navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION, { isPayOnly: true });
    }
  };

  const onOpenSheet = (type: string) => {
    setSheetType(type);
    selectSheeRef.current.present();
  };

  const onSelect = (value: string) => {
    if (value === NewSadadBillType.ALL_COMPANY) {
      setFilterData(sadadBillsCompanyData);
    } else {
      const filterWithTab = sadadBillsCompanyData.filter((item) => item.type === value);
      setFilterData(filterWithTab);
    }
  };

  const dataToRender = filterData?.filter((item) =>
    search ? item?.text?.toLowerCase().includes(search.toLowerCase()) : true,
  );

  return (
    <IPayFormProvider<FormValues>
      validationSchema={validationSchema}
      defaultValues={{
        companyName: '',
        serviceType: '',
        accountNumber: '',
        billName: '',
        saveBill: false,
      }}
    >
      {({ handleSubmit, setValue, getValues, control, watch }) => {
        const onSelectValue = (item: SelectedValue) => {
          if (sheetType === NewSadadBillType.COMPANY_NAME) {
            setValue(FormFields.COMPANY_NAME, item.text);
            setSelectedImage(item.image);
          } else {
            setValue(FormFields.SERVICE_TYPE, item.text);
          }
          setSearch('');
          selectSheeRef.current.close();
        };

        const onPressServiceAction = () => {
          if (watch(FormFields.COMPANY_NAME)) onOpenSheet(NewSadadBillType.SERVICE_TYPE);
        };

        return (
          <IPaySafeAreaView>
            <IPayHeader
              testID="sadad-bill-ipay-header"
              backBtn
              title={
                isSaveOnly
                  ? localizationText.NEW_SADAD_BILLS.PAY_SADAD_BILLS
                  : localizationText.NEW_SADAD_BILLS.NEW_SADAD_BILLS
              }
              titleStyle={styles.headerText}
              applyFlex
            />
            {selectedBills?.length ? (
              <IPayView style={styles.contentContainer}>
                <IPayBillBalance
                  selectedBills={selectedBills}
                  saveBillToggle={watch(FormFields.SAVE_BILL)}
                  toggleControl={control}
                  isSaveOnly={isSaveOnly}
                  isPayPartially={isPayPartially}
                />
              </IPayView>
            ) : (
              <IPayScrollView showsVerticalScrollIndicator={false}>
                <IPayView style={styles.contentContainer}>
                  <IPaySadadBillDetailForm
                    onCompanyAction={() => onOpenSheet(NewSadadBillType.COMPANY_NAME)}
                    onServiceAction={onPressServiceAction}
                    companyLeftImage={
                      selectedImage ? <IPayImage image={selectedImage} style={styles.listImg} /> : <IPayView />
                    }
                    isCompanyValue={!!watch(FormFields.COMPANY_NAME)}
                    isServiceValue={!!watch(FormFields.SERVICE_TYPE)}
                    companyInputName={FormFields.COMPANY_NAME}
                    accountInputName={FormFields.ACCOUNT_NUMBER}
                    serviceInputName={FormFields.SERVICE_TYPE}
                  />
                  {watch(FormFields.SERVICE_TYPE) && (
                    <IPaySadadSaveBill
                      saveBillToggle={watch(FormFields.SAVE_BILL)}
                      billInputName={FormFields.BILL_NAME}
                      toggleInputName={FormFields.SAVE_BILL}
                      toggleControl={control}
                    />
                  )}
                  <IPayButton
                    btnText={localizationText.NEW_SADAD_BILLS.INQUIRY}
                    btnType="primary"
                    onPress={handleSubmit(onSubmit)}
                    large
                    btnIconsDisabled
                    disabled={!watch(FormFields.ACCOUNT_NUMBER)}
                  />
                  {watch(FormFields.SAVE_BILL) && (
                    <IPayButton
                      btnText={localizationText.NEW_SADAD_BILLS.SAVE_ONLY}
                      btnType="outline"
                      onPress={() => navigate(ScreenNames.PAY_BILL_SUCCESS, { isSaveOnly: true })}
                      large
                      disabled={!watch(FormFields.BILL_NAME)}
                      btnIconsDisabled
                    />
                  )}
                </IPayView>
              </IPayScrollView>
            )}
            <IPayBottomSheet
              heading={
                sheetType === NewSadadBillType.COMPANY_NAME
                  ? localizationText.COMMON.COMPANY
                  : localizationText.NEW_SADAD_BILLS.SERVICE_TYPE
              }
              customSnapPoint={['1%', '90%']}
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
                <IPayView style={styles.sheetContainer}>
                  <IPayView style={styles.searchInputWrapper}>
                    <IPayTextInput
                      text={search}
                      onChangeText={setSearch}
                      placeholder={localizationText.LOCAL_TRANSFER.SEARCH_FOR_NAME}
                      rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                      simpleInput
                      style={styles.inputStyle}
                      containerStyle={[styles.searchInputStyle, search ? styles.clearInput : {}]}
                    />
                    {search && (
                      <IPayButton
                        btnText={localizationText.COMMON.CANCEL}
                        btnIconsDisabled
                        small
                        btnType="link-button"
                        onPress={() => setSearch('')}
                      />
                    )}
                  </IPayView>
                  {sheetType === NewSadadBillType.COMPANY_NAME && (
                    <IPayTabs scrollable tabs={tabOption} onSelect={onSelect} />
                  )}
                </IPayView>
                {dataToRender?.length ? (
                  <IPayListView
                    list={dataToRender}
                    onPressListItem={onSelectValue}
                    selectedListItem={
                      sheetType === NewSadadBillType.COMPANY_NAME
                        ? getValues(FormFields.COMPANY_NAME)
                        : getValues(FormFields.SERVICE_TYPE)
                    }
                    isCompleteItem
                  />
                ) : (
                  <IPayView style={styles.noRecordContainer}>
                    <IPayNoResult
                      containerStyle={styles.noRecordWrapper}
                      message={localizationText.NEW_SADAD_BILLS.NO_SERVICE_PROVIDER_FOUND}
                      showIcon
                      icon={icons.note_remove1}
                      iconSize={40}
                      iconColor={colors.primary.primary800}
                    />
                  </IPayView>
                )}
              </IPayView>
            </IPayBottomSheet>
            <IPayBottomSheet
              heading={localizationText.NEW_SADAD_BILLS.SADAD_BILLS}
              customSnapPoint={['1%', isAndroidOS ? '43%' : '50%']}
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
                title={localizationText.NEW_SADAD_BILLS.NO_INVOICE_FOUND}
                message={localizationText.NEW_SADAD_BILLS.INVOICE_WARNING_MESSAGE}
                btnText={localizationText.COMMON.TRY_AGAIN}
                isShowButton
                icon={<IPayIcon icon={icons.note_remove_warning} size={64} />}
                onBtnPress={() => invoiceSheetRef.current.close()}
              />
            </IPayBottomSheet>
          </IPaySafeAreaView>
        );
      }}
    </IPayFormProvider>
  );
};

export default AddNewSadadBillScreen;
