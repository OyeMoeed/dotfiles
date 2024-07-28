import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayImage, IPayTitle2Text, IPayView } from '@app/components/atoms';
import {
  IPayButton,
  IPayHeader,
  IPayListView,
  IPaySadadBillDetailForm,
  IPayTextInput,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPaySadadSaveBill from '@app/components/molecules/ipay-sadad-save-bill/ipay-sadad-save-bill.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { FormFields, NewSadadBillType } from '@app/enums/bill-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormValues, SelectedValue } from './add-new-sadad-bill.interface';
import addSadadBillStyles from './add-new-sadad-bill.style';

const AddNewSadadBillScreen = () => {
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = addSadadBillStyles(colors);
  const selectSheeRef = useRef<any>(null);
  const invoiceSheetRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [sheetType, setSheetType] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filterData, setFilterData] = useState<Array<object>>([]);

  const tabOption = ['All', 'Communications', 'Banks', 'Global Services']; // TODO

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

  const onSubmit = () => {
    invoiceSheetRef.current.present();
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

        return (
          <IPaySafeAreaView>
            <IPayHeader
              testID="sadad-bill-ipay-header"
              backBtn
              title={localizationText.NEW_SADAD_BILLS.NEW_SADAD_BILLS}
              titleStyle={styles.headerText}
              applyFlex
            />

            <IPayView style={styles.contentContainer}>
              <IPaySadadBillDetailForm
                onCompanyAction={() => onOpenSheet(NewSadadBillType.COMPANY_NAME)}
                onServiceAction={() => {
                  onOpenSheet(NewSadadBillType.SERVICE_TYPE);
                }}
                companyLeftImage={
                  selectedImage ? <IPayImage image={selectedImage} style={styles.listImg} /> : <IPayView />
                }
                isCompanyValue={!watch(FormFields.COMPANY_NAME)}
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
                  onPress={onSubmit}
                  large
                  btnIconsDisabled
                />
              )}
            </IPayView>
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
            >
              <IPayView>
                <IPayView style={styles.sheetContainer}>
                  <IPayTextInput
                    text={search}
                    onChangeText={setSearch}
                    placeholder={localizationText.LOCAL_TRANSFER.SEARCH_FOR_NAME}
                    rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                    simpleInput
                    style={styles.inputStyle}
                    containerStyle={styles.searchInputStyle}
                  />
                  {sheetType === NewSadadBillType.COMPANY_NAME && (
                    <IPayTabs scrollable tabs={tabOption} onSelect={onSelect} />
                  )}
                </IPayView>
                <IPayListView
                  list={filterData?.filter((item) => (search ? item.text.toLowerCase().includes(search) : true))}
                  onPressListItem={onSelectValue}
                  selectedListItem={
                    sheetType === NewSadadBillType.COMPANY_NAME
                      ? getValues(FormFields.COMPANY_NAME)
                      : getValues(FormFields.SERVICE_TYPE)
                  }
                  isItem
                  noRecordIcon={icons.note_remove1}
                  noRecordMessage={localizationText.NEW_SADAD_BILLS.NO_SERVICE_PROVIDER_FOUND}
                />
              </IPayView>
            </IPayBottomSheet>
            <IPayBottomSheet
              heading={localizationText.NEW_SADAD_BILLS.SADAD_BILLS}
              customSnapPoint={['1%', '45%']}
              onCloseBottomSheet={() => invoiceSheetRef.current.close()}
              ref={invoiceSheetRef}
              simpleBar
              cancelBnt
              bold
            >
              <IPayView style={styles.invoiceSheetContentWrapper}>
                <IPayIcon icon={icons.note_remove_warning} size={64} />
                <IPayView style={styles.textWrapper}>
                  <IPayTitle2Text
                    style={styles.darkColor}
                    regular={false}
                    text={localizationText.NEW_SADAD_BILLS.NO_INVOICE_FOUND}
                  />
                  <IPayCaption1Text
                    style={styles.messageText}
                    text={localizationText.NEW_SADAD_BILLS.INVOICE_WARNING_MESSAGE}
                  />
                </IPayView>
                <IPayButton
                  btnText={localizationText.COMMON.TRY_AGAIN}
                  btnStyle={styles.tryAgainBtn}
                  btnIconsDisabled
                  btnType="primary"
                  large
                  onPress={() => invoiceSheetRef.current.close()}
                />
              </IPayView>
            </IPayBottomSheet>
          </IPaySafeAreaView>
        );
      }}
    </IPayFormProvider>
  );
};

export default AddNewSadadBillScreen;
