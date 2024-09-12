import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import {
  IPayButton,
  IPayContentNotFound,
  IPayHeader,
  IPayListView,
  IPayMoiPaymentDetailForm,
  IPayNoResult,
  IPayTextInput,
} from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { MoiPaymentFormFields, MoiPaymentType } from '@app/enums/moi-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { getValidationSchemas } from '@app/services';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { MoiPaymentTypes } from '@app/utilities/enums.util';
import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import MoiFormFormValues from './moi-payment.interface';
import moiPaymentStyles from './moi-payment.style';

const MoiPaymentScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = moiPaymentStyles(colors);
  const { t } = useTranslation();
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
  const selectSheeRef = useRef<any>(null);
  const invoiceSheetRef = useRef<any>(null);
  const { myBeneficiaryId } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const tabs = [t('BILL_PAYMENTS.PAYMENT'), t('BILL_PAYMENTS.REFUND]')];

  const { serviceProvider, serviceType, idType, myIdCheck, duration, beneficiaryId, myIdInput, myId } =
    getValidationSchemas(t);

  const validationSchema = Yup.object().shape({
    serviceProvider,
    serviceType,
    idType,
    myIdCheck,
    duration,
    beneficiaryId,
    myIdInput,
    myId,
  });

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
        return t('BILL_PAYMENTS.SERVICE_TYPE');
      case MoiPaymentType.ID_TYPE:
        return t('BILL_PAYMENTS.ID_TYPE');
      case MoiPaymentType.DURATION:
        return t('BILL_PAYMENTS.DURATION');
      default:
        return t('BILL_PAYMENTS.SERVICE_PROVIDER');
    }
  };

  return (
    <IPayFormProvider<MoiFormFormValues>
      validationSchema={validationSchema}
      defaultValues={{
        serviceProvider: '',
        serviceType: '',
        idType: '',
        duration: '',
        beneficiaryId: '',
        myIdCheck: '',
        myIdInput: '',
        myId: '',
      }}
    >
      {({ setValue, getValues, control, watch }) => {
        const myIdChecked = watch(MoiPaymentFormFields.MY_ID_CHECK); // Watch the checkbox value
        const checkBtnDisabled = () => {
          setBtnEnabled(() =>
            Object.keys(MoiPaymentFormFields)
              .filter((key) => key !== 'MY_ID_CHECK')
              .some((key) => !getValues(MoiPaymentFormFields[key])),
          );
        };

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
          checkBtnDisabled();
          setSearch('');
          selectSheeRef.current.close();
        };

        const onCheckboxAction = () => {
          const currentCheck = !getValues(MoiPaymentFormFields.MY_ID_CHECK);

          /// TODO will change this
          if (currentCheck) {
            setValue(MoiPaymentFormFields.MY_ID, myBeneficiaryId); // TODO Set MY_ID if checkbox is checked
          } else {
            setValue(MoiPaymentFormFields.MY_ID, ''); // Clear MY_ID if checkbox is unchecked
          }
          setValue(MoiPaymentFormFields.MY_ID_CHECK, currentCheck); // Toggle the checkbox value
          checkBtnDisabled();
          setErrorMessage('');
        };

        const getSelectedValue = () => {
          checkBtnDisabled();
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

        const clearBeneficiaryFelid = () => {
          setErrorMessage('');
          if (getValues(MoiPaymentFormFields.MY_ID).length > 0) {
            setValue(MoiPaymentFormFields.MY_ID, '');
          }
          checkBtnDisabled();
        };

        const onChangeText = (text: string) => {
          if (text.length > 0) {
            setBtnEnabled(false);
          } else {
            setBtnEnabled(true);
          }
          setErrorMessage('');
        };

        const onSubmit = () => {
          if (selectedTab === MoiPaymentTypes.REFUND) {
            navigate(ScreenNames.MOI_PAYMENT_REFUND);
          } else {
            navigate(ScreenNames.MOI_PAYMENT_CONFIRMATION);
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
                  title="BILL_PAYMENTS.MOI_PAYMENT"
                  titleStyle={styles.screenTitle}
                />
                <IPayView style={styles.container}>
                  <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />

                  <IPayView style={styles.contentContainer}>
                    <IPayMoiPaymentDetailForm
                      onServiceProviderAction={() => onOpenSheet(MoiPaymentType.SERVICE_PROVIDER)}
                      onServiceTypeAction={() => onOpenSheet(MoiPaymentType.SERVICE_TYPE)}
                      onCheckboxAction={onCheckboxAction}
                      onBeneficiaryIdAction={clearBeneficiaryFelid}
                      onIdTypeAction={() => onOpenSheet(MoiPaymentType.ID_TYPE)}
                      onDurationAction={() => onOpenSheet(MoiPaymentType.DURATION)}
                      isServiceProviderValue={!!watch(MoiPaymentFormFields.SERVICE_PROVIDER)}
                      isServiceTypeValue={!!watch(MoiPaymentFormFields.SERVICE_TYPE)}
                      myIdCheck={myIdChecked}
                      control={control}
                      onChangeText={onChangeText}
                      errorMessage={errorMessage}
                    />
                    <IPayButton
                      btnText="NEW_SADAD_BILLS.INQUIRY"
                      btnType="primary"
                      onPress={onSubmit}
                      large
                      btnIconsDisabled
                      disabled={isBtnEnabled}
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
                        placeholder="LOCAL_TRANSFER.SEARCH_FOR_NAME"
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
                    />
                  ) : (
                    <IPayView style={styles.noRecordContainer}>
                      <IPayNoResult
                        containerStyle={styles.noRecordWrapper}
                        iconViewStyles={styles.iconView}
                        message={
                          sheetType === MoiPaymentType.SERVICE_PROVIDER
                            ? t('BILL_PAYMENTS.NO_SERVICE_PROVIDER_FOUND')
                            : t('BILL_PAYMENTS.NO_SERVICE_TYPE_FOUND')
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
              heading="BILL_PAYMENTS.MOI_BILLS"
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

export default MoiPaymentScreen;
