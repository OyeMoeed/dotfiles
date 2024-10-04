import icons from '@app/assets/icons';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
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
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayBillBalance, IPaySafeAreaView } from '@app/components/templates';
import { FormFields, NewSadadBillType } from '@app/enums/bill-payment.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import BILLS_MANAGEMENT_URLS from '@app/network/services/bills-management/bills-management.urls';
import { BillersCategoryType } from '@app/network/services/bills-management/get-billers-categories/get-billers-categories.interface';
import getBillersCategoriesService from '@app/network/services/bills-management/get-billers-categories/get-billers-categories.service';
import { BillersService } from '@app/network/services/bills-management/get-billers-services/get-billers-services.interface';
import getBillersServiceProvider from '@app/network/services/bills-management/get-billers-services/get-billers-services.service';
import { BillersTypes } from '@app/network/services/bills-management/get-billers/get-billers.interface';
import getBillers from '@app/network/services/bills-management/get-billers/get-billers.service';
import { InquireBillPayloadProps } from '@app/network/services/bills-management/inquire-bill/inquire-bill.interface';
import inquireBillService from '@app/network/services/bills-management/inquire-bill/inquire-bill.service';
import { SaveBillPayloadTypes } from '@app/network/services/bills-management/save-bill/save-bill.interface';
import saveBillService from '@app/network/services/bills-management/save-bill/save-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import { getValidationSchemas } from '@app/services';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType, buttonVariants, LanguageCode } from '@app/utilities';
import { isAndroidOS } from '@app/utilities/constants';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { FormValues, NewSadadBillProps, SelectedValue } from './add-new-sadad-bill.interface';
import addSadadBillStyles from './add-new-sadad-bill.style';

const AddNewSadadBillScreen: FC<NewSadadBillProps> = ({ route }) => {
  const { selectedBills = [], isSaveOnly, isPayPartially } = route.params || {};
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = addSadadBillStyles(colors);
  const invoiceSheetRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [sheetType, setSheetType] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filterData, setFilterData] = useState<Array<object>>([]);
  const [tabOption, setTabOption] = useState<BillersCategoryType[]>();
  const [billers, setBillers] = useState<BillersTypes[]>();
  const [selectedBiller, setSelectedBiller] = useState<BillersTypes>();
  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const selectedLanguage = useTypedSelector((state) => state.languageReducer.selectedLanguage);

  const [services, setServices] = useState<BillersService[]>([]);
  const [selectedService, setSelectedService] = useState<BillersService>();
  const [billerBottomSheetVisible, setBillerBottomSheetVisible] = useState<boolean>(false);
  const { showToast } = useToastContext();

  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);

  const { companyName, serviceType, accountNumber, billName } = getValidationSchemas(t);

  const validationSchema = Yup.object().shape({
    companyName,
    serviceType,
    accountNumber,
    billName,
  });

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const onGetBillersCategory = async () => {
    const apiResponse: any = await getBillersCategoriesService();
    if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
      setTabOption(apiResponse.response.billerCategoryList);
    }
  };

  const onGetBillers = async () => {
    const apiResponse = await getBillers();
    if (apiResponse.successfulResponse) {
      setBillers(
        apiResponse.response.billersList.map((billerItem: BillersTypes) => ({
          ...billerItem,
          id: billerItem.billerId,
          image: BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(billerItem.billerId), // TODO: There is no image on get billers response will add image here when receive from response
          text: billerItem.billerDesc,
          type: billerItem.billerTypeDesc,
        })),
      );
    }
  };

  const onGetBillersServices = async (billerID: string | number) => {
    try {
      const apiResponse = await getBillersServiceProvider(billerID);
      if (apiResponse.successfulResponse) {
        const serviceList = apiResponse.response.servicesList.map((serviceItem: BillersService) => ({
          ...serviceItem,
          id: serviceItem.serviceId,
          text: serviceItem.serviceDesc,
        }));
        setServices(serviceList);
      }
    } catch (error: any) {
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

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
    const payload: InquireBillPayloadProps = {
      billerId: selectedBiller?.billerId,
      billAccountNumber: values.accountNumber,
      serviceId: selectedService?.serviceId,
      deviceInfo,
    };
    const apiResponse: any = await inquireBillService(payload);
    if (apiResponse.successfulResponse) {
      const billDetailsList = {
        billNickname: values.billName,
        billerName: values.companyName,
        billerIcon: BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(selectedBiller?.billerId || '001'),
        serviceType: values.serviceType,
        billNumOrBillingAcct: values.accountNumber,
        dueDate: apiResponse.response.dueDate,
        amount: apiResponse.response.dueAmount || '0',
        billerId: selectedBiller?.billerId,
        billIdType: selectedBiller?.billIdType,
        serviceDescription: selectedService?.serviceDesc,
      };
      navigate(ScreenNames.NEW_SADAD_BILL, { newBill: true, billDetailsList: [billDetailsList] });
    } else {
      invoiceSheetRef.current.present();
    }
  };

  const onOpenSheet = (type: string) => {
    setSheetType(type);
    setBillerBottomSheetVisible(true);
  };

  const onSelect = (tabObject: BillersCategoryType) => {
    const billersValue = billers || [];

    if (billersValue?.length > 0) {
      if (tabObject.code === '0') {
        setFilterData(billersValue);
      } else {
        const filterWithTab = billersValue?.filter((item) => item.billerType === tabObject.code);
        setFilterData(filterWithTab);
      }
    }
    setSelectedCategory(tabObject?.code);
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

  const getCategoryText = (caategory: BillersCategoryType) => {
    switch (selectedLanguage) {
      case LanguageCode.AR:
        return caategory.addtionalAttribute1;
      default:
        return caategory.desc;
    }
  };

  const onPressSaveOnly = (values: FormValues, payload: InquireBillPayloadProps) => {
    const headerAttributes = {
      billNickname: values.billName,
      billerName: values.companyName,
      billerIcon: BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(selectedBiller?.billerId || '001'),
    };
    const billPaymentInfos = {
      billerId: selectedBiller?.billerId,
      billNumOrBillingAcct: values.accountNumber,
      serviceType: values.serviceType,
      billIdType: selectedBiller?.billIdType,
      serviceDescription: selectedService?.serviceDesc,
      billerName: values.companyName,
      billNickname: values.billName,
      billerIcon: BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(selectedBiller?.billerId || '001'),
    };
    const billPaymentData = [
      {
        id: '1',
        label: 'PAY_BILL.SERVICE_TYPE',
        value: values.serviceType,
      },
      {
        id: '2',
        label: 'PAY_BILL.ACCOUNT_NUMBER',
        value: values.accountNumber,
      },
    ];

    navigate(ScreenNames.PAY_BILL_SUCCESS, {
      isSaveOnly: true,
      billPaymentData,
      billPaymentInfos,
      headerAttributes,
      inquireBillPayload: payload,
    });
  };

  const onSaveBill = async (values: FormValues) => {
    const deviceInfo = await getDeviceInfo();
    const payload: SaveBillPayloadTypes = {
      billerId: selectedBiller?.billerId,
      billNumOrBillingAcct: values.accountNumber,
      billIdType: selectedBiller?.billerType,
      billerName: values.companyName,
      deviceInfo,
      billNickname: values.billName,
      walletNumber,
    };

    const inquireBillPayload: InquireBillPayloadProps = {
      billerId: selectedBiller?.billerId,
      billAccountNumber: values.accountNumber,
      serviceId: selectedService?.serviceId,
      deviceInfo,
    };

    const apiResponse: any = await saveBillService(payload);
    if (apiResponse.successfulResponse) {
      onPressSaveOnly(values, inquireBillPayload);
    } else {
      invoiceSheetRef.current.present();
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
          setBillerBottomSheetVisible(false);
          if (sheetType === NewSadadBillType.COMPANY_NAME) {
            setValue(FormFields.COMPANY_NAME, item.text);
            setSelectedImage(item.image);
            setSelectedBiller(item);
            onGetBillersServices(item?.id);
          } else {
            setValue(FormFields.SERVICE_TYPE, item.text);
            setSelectedService(item);
          }
          setSearch('');
        };

        const onPressServiceAction = () => {
          if (watch(FormFields.COMPANY_NAME)) onOpenSheet(NewSadadBillType.SERVICE_TYPE);
        };

        return (
          <IPaySafeAreaView>
            <IPayHeader
              testID="sadad-bill-ipay-header"
              backBtn
              title={isSaveOnly ? 'NEW_SADAD_BILLS.PAY_SADAD_BILLS' : 'NEW_SADAD_BILLS.NEW_SADAD_BILLS'}
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
                    btnText="NEW_SADAD_BILLS.INQUIRE"
                    btnType={buttonVariants.PRIMARY}
                    onPress={handleSubmit(onInquireBill)}
                    large
                    btnIconsDisabled
                    disabled={!watch(FormFields.ACCOUNT_NUMBER)}
                  />
                  {watch(FormFields.SAVE_BILL) && (
                    <IPayButton
                      btnText="NEW_SADAD_BILLS.SAVE_ONLY"
                      btnType={buttonVariants.OUTLINED}
                      onPress={handleSubmit(onSaveBill)}
                      large
                      disabled={!watch(FormFields.BILL_NAME)}
                      btnIconsDisabled
                    />
                  )}
                </IPayView>
              </IPayScrollView>
            )}

            <IPayPortalBottomSheet
              heading={sheetType === NewSadadBillType.COMPANY_NAME ? 'COMMON.COMPANY' : 'NEW_SADAD_BILLS.SERVICE_TYPE'}
              customSnapPoint={['90%', '90%']}
              onCloseBottomSheet={() => setBillerBottomSheetVisible(false)}
              simpleBar
              cancelBnt
              bold
              headerContainerStyles={styles.sheetHeader}
              bgGradientColors={colors.sheetGradientPrimary10}
              bottomSheetBgStyles={styles.sheetBackground}
              isVisible={billerBottomSheetVisible}
            >
              <IPayView style={styles.bottomSheetContainer}>
                <IPayView style={styles.sheetContainer}>
                  <IPayView style={styles.searchInputWrapper}>
                    <IPayTextInput
                      text={search}
                      onChangeText={setSearch}
                      placeholder={t('LOCAL_TRANSFER.SEARCH_FOR_NAME')}
                      rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
                      simpleInput
                      style={styles.inputStyle}
                      containerStyle={[styles.searchInputStyle, search ? styles.clearInput : {}]}
                    />
                    {search && (
                      <IPayButton
                        btnText="COMMON.CANCEL"
                        btnIconsDisabled
                        small
                        btnType={buttonVariants.LINK_BUTTON}
                        onPress={() => setSearch('')}
                      />
                    )}
                  </IPayView>
                  {sheetType === NewSadadBillType.COMPANY_NAME && (
                    <IPayFlatlist
                      horizontal
                      data={tabOption}
                      showsHorizontalScrollIndicator={false}
                      itemSeparatorStyle={styles.categoryItemSeparatorStyle}
                      renderItem={({ item }) => (
                        <IPayPressable
                          style={[
                            styles.categoryTabView,
                            selectedCategory === item.code && styles.categoryTabCViewConditional,
                          ]}
                          onPress={() => onSelect(item)}
                        >
                          <IPayFootnoteText
                            regular={selectedCategory !== item.code}
                            text={getCategoryText(item)}
                            color={selectedCategory === item.code ? colors.natural.natural0 : colors.natural.natural500}
                          />
                        </IPayPressable>
                      )}
                    />
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
                      message="NEW_SADAD_BILLS.NO_SERVICE_PROVIDER_FOUND"
                      showIcon
                      icon={icons.note_remove1}
                      iconSize={40}
                      iconColor={colors.primary.primary800}
                    />
                  </IPayView>
                )}
              </IPayView>
            </IPayPortalBottomSheet>
            <IPayBottomSheet
              heading="NEW_SADAD_BILLS.SADAD_BILLS"
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
                title="NEW_SADAD_BILLS.NO_INVOICE_FOUND"
                message="NEW_SADAD_BILLS.INVOICE_WARNING_MESSAGE"
                btnText="COMMON.TRY_AGAIN"
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
