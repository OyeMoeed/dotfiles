import icons from '@app/assets/icons';
import { IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
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
import { IPayBillBalance, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { FormFields, NewSadadBillType } from '@app/enums/bill-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { getValidationSchemas } from '@app/services/validation-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { FC, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormValues, NewSadadBillProps, SelectedValue } from './add-new-sadad-bill.interface';
import addSadadBillStyles from './add-new-sadad-bill.style';

const AddNewSadadBillScreen: FC<NewSadadBillProps> = ({ route }) => {
  const selectedBills = route.params?.selectedBills;
  const localizationText = useLocalization();
  const { colors } = useTheme();
  const styles = addSadadBillStyles(colors);
  const selectSheeRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [sheetType, setSheetType] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [nickNameValue, setNickNameValue] = useState<string>('');

  const tabOption = ['All', 'Communications', 'Banks', 'Global Services']; // TODO

  const { sadadBillsCompanyData, sadadServiceTypeData } = useConstantData();

  const { companyName, serviceType, accountNumber, billName } = getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    companyName,
    serviceType,
    accountNumber,
    billName,
  });

  const onSubmit = () => {};

  const onOpenSheet = (type: string) => {
    setSheetType(type);
    selectSheeRef.current.present();
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
            {selectedBills ? (
              <IPayView style={styles.contentContainer}>
                <IPayBillBalance selectedBills={selectedBills} toggleControl={control} />
              </IPayView>
            ) : (
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
                    billNameValue={nickNameValue}
                    onBillNameChange={setNickNameValue}
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
                  {sheetType === NewSadadBillType.COMPANY_NAME && <IPayTabs scrollable tabs={tabOption} />}
                </IPayView>
                <IPayListView
                  list={sheetType === NewSadadBillType.COMPANY_NAME ? sadadBillsCompanyData : sadadServiceTypeData}
                  onPressListItem={onSelectValue}
                  selectedListItem={
                    sheetType === NewSadadBillType.COMPANY_NAME
                      ? getValues(FormFields.COMPANY_NAME)
                      : getValues(FormFields.SERVICE_TYPE)
                  }
                  isItem
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
