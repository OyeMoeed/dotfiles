import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayIcon, IPayImage, IPayScrollView, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
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
import { FormFields, NewSadadBillType } from '@app/enums/bill-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { BillersCategoryType } from '@app/network/services/bills-management/get-billers-categories/get-billers-categories.interface';
import getBillersCategoriesService from '@app/network/services/bills-management/get-billers-categories/get-billers-categories.service';
import { BillersService } from '@app/network/services/bills-management/get-billers-services/get-billers-services.interface';
import getBillersServicesService from '@app/network/services/bills-management/get-billers-services/get-billers-services.service';
import { BillersTypes } from '@app/network/services/bills-management/get-billers/get-billers.interface';
import getBillersService from '@app/network/services/bills-management/get-billers/get-billers.service';
import { InquireBillPayloadTypes } from '@app/network/services/bills-management/inquire-bill/inquire-bill.interface';
import inquireBillService from '@app/network/services/bills-management/inquire-bill/inquire-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import { getValidationSchemas } from '@app/services';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { spinnerVariant } from '@app/utilities/enums.util';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
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
  const [tabOption, setTabOption] = useState<BillersCategoryType[]>();
  const [billers, setBillers] = useState<BillersTypes[]>();
  const [selectedBiller, setSelectedBiller] = useState<BillersTypes>();

  const [services, setServices] = useState<BillersService[]>();
  const [selectedService, setSelectedService] = useState<BillersService>();

  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const { companyName, serviceType, accountNumber, billName } = getValidationSchemas(localizationText);

  const validationSchema = Yup.object().shape({
    companyName,
    serviceType,
    accountNumber,
    billName,
  });

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);

  const onGetBillersCategory = async () => {
    const apiResponse = await getBillersCategoriesService();
    if (apiResponse.successfulResponse) {
      setTabOption(apiResponse.response.billerCategoryList.map((el) => ({ ...el, text: el.desc })));
    }
  };

  const onGetBillers = async () => {
    const deviceInfo = await getDeviceInfo();
    const payload = {
      includeBillerDetails: 'false',
      deviceInfo,
      billerStatus: 'E',
    };
    const apiResponse = await getBillersService(payload);
    if (apiResponse.successfulResponse) {
      setBillers(
        apiResponse.response.billersList.map((billerItem: BillersTypes) => ({
          ...billerItem,
          id: billerItem.billerId,
          image: '', // TODO: There is no image on get billers response will add image here when receive from response
          text: billerItem.billerDesc,
          type: billerItem.billerTypeDesc,
        })),
      );
    }
  };

  const onGetBillersServices = async (billerID: string) => {
    const apiResponse = await getBillersServicesService(billerID);
    if (apiResponse.successfulResponse) {
      setServices(
        apiResponse.response.servicesList.map((serviceItem: BillersService) => ({
          ...serviceItem,
          id: serviceItem.serviceId,
          text: serviceItem.serviceDesc,
        })),
      );
    }
  };

  useEffect(() => {
    onGetBillersServices(selectedBiller?.billerId);
  }, [selectedBiller]);

  useEffect(() => {
    onGetBillersCategory();
    onGetBillers();
  }, []);

  useEffect(() => {
    if (sheetType === NewSadadBillType.COMPANY_NAME) {
      setFilterData(billers);
    } else {
      setFilterData(services);
    }
  }, [sheetType]);

  const onInquireBill = async (values: FormValues) => {
    const deviceInfo = await getDeviceInfo();
    const payload: InquireBillPayloadTypes = {
      billerId: selectedBiller?.billerId,
      billNumOrBillingAcct: values.accountNumber,
      billIdType: selectedBiller?.billIdType,
      billerName: values.companyName,
      deviceInfo,
      billNickname: values.billName,
      walletNumber,
    };

    renderSpinner(true);
    const apiResponse = await inquireBillService(payload);
    renderSpinner(false);
    if (apiResponse.successfulResponse) {
      navigate(ScreenNames.NEW_SADAD_BILL, {
        billNickname: values.billName,
        billerName: values.companyName,
        billerIcon: images.saudi_electricity_co, // TODO: No Biller Icon is coming from api response for get billers once receive from response will update it
        serviceType: values.serviceType,
        billNumOrBillingAcct: values.accountNumber,
        dueDate: '14/12/2024', // TODO: No Due Date is coming from api response once receive from response will update it
        totalAmount: '200', // TODO: No Amount is coming from api response once receive from response will update it
        billerId: selectedBiller?.billerId,
        billIdType: selectedBiller?.billIdType,
        serviceDescription: selectedService?.serviceDesc,
      });
    } else {
      invoiceSheetRef.current.present();
    }
  };

  const onOpenSheet = (type: string) => {
    setSheetType(type);
    selectSheeRef.current.present();
  };

  const onSelect = (value: string, tabObject: BillersCategoryType) => {
    if (tabObject.code === '0') {
      setFilterData(billers);
    } else {
      const filterWithTab = billers.filter((item) => item.billerType === tabObject.code);
      setFilterData(filterWithTab);
    }
  };

  const dataToRenderCompany = filterData?.filter((item) =>
    search ? item?.billerDesc?.toLowerCase().includes(search.toLowerCase()) : true,
  );
  const dataToRenderService = filterData?.filter((item) =>
    search ? item?.serviceDesc?.toLowerCase().includes(search.toLowerCase()) : true,
  );

  const getLength = () => {
    if (sheetType === NewSadadBillType.COMPANY_NAME) {
      return dataToRenderCompany?.length;
    }
    return dataToRenderService?.length;
  };

  const listViewData = sheetType === NewSadadBillType.COMPANY_NAME ? dataToRenderCompany : dataToRenderService;

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
            setSelectedBiller(item);
          } else {
            setValue(FormFields.SERVICE_TYPE, item.text);
            setSelectedService(item);
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
                    accountInputLabel={selectedService?.mainBillIdLabel}
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
                    onPress={handleSubmit(onInquireBill)}
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
              <IPayView style={styles.bottomSheetContainer}>
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
                {getLength() ? (
                  <IPayListView
                    list={listViewData}
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
