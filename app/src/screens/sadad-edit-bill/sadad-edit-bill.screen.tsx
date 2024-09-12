import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayImage, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayAnimatedTextInput, IPayButton, IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import { SadadEditBillFields } from '@app/enums/edit-sadad-bill.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { goBack } from '@app/navigation/navigation-service.navigation';
import BILLS_MANAGEMENT_URLS from '@app/network/services/bills-management/bills-management.urls';
import { EditBillPayloadTypes } from '@app/network/services/bills-management/edit-bill/edit-bill.interface';
import editBillService from '@app/network/services/bills-management/edit-bill/edit-bill.service';
import { PaymentInfoProps } from '@app/network/services/bills-management/get-sadad-bills-by-status/get-sadad-bills-by-status.interface';
import { getDeviceInfo } from '@app/network/utilities/device-info-helper';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType, buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import sadadEditBillsStyles from './sadad-edit-bill.style';

const SadadEditBillsScreen: React.FC = ({ route }) => {
  const { billData, setEditBillSuccessToast } = route.params;
  const {
    billerId = '004',
    billId = '1',
    billDesc = '',
    billerName = '',
    serviceDescription = '',
    billNumOrBillingAcct = '',
  }: PaymentInfoProps = billData;
  const { colors } = useTheme();
  const styles = sadadEditBillsStyles(colors);
  const localizationText = useLocalization();
  const [showAlert, setShowAlert] = useState(false);
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { showToast } = useToastContext();
  const { showSpinner, hideSpinner } = useSpinnerContext();

  const { getValues, control, setValue, watch } = useForm();

  const renderSpinner = (isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  };

  const renderToast = ({ title, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        borderColor: colors.error.error25,
        isShowRightIcon: false,
        leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  const onSubmit = async () => {
    renderSpinner(true);
    try {
      const deviceInfo = await getDeviceInfo();
      // Handle form submission here
      const billName = getValues(SadadEditBillFields.BILL_NICK_NAME);
      if (billName) {
        const payload: EditBillPayloadTypes = {
          billNumOrBillingAcct,
          billId,
          billNickname: billName,
          walletNumber,
          deviceInfo,
        };
        const apiResponse = await editBillService(payload);
        if (apiResponse.status.type === APIResponseType.SUCCESS) {
          setEditBillSuccessToast(billName);
          goBack();
        }
      }
      renderSpinner(false);
    } catch (error) {
      renderSpinner(false);
      renderToast({ title: localizationText.ERROR.SOMETHING_WENT_WRONG });
    }
  };

  useEffect(() => {
    setValue(SadadEditBillFields.BILL_NICK_NAME, billDesc);
  }, []);

  // Watch the bill nickname field to dynamically update button state
  const billNickName = watch(SadadEditBillFields.BILL_NICK_NAME);

  const checkIfNickNameUpdated = () => {
    if (billNickName !== billDesc) {
      return false;
    }
    return true;
  };

  const onBackPress = () => {
    if (!checkIfNickNameUpdated()) {
      setShowAlert(true);
    } else {
      goBack();
    }
  };

  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const isSaveButtonDisabled = !billNickName || checkIfNickNameUpdated();

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="sadad-edit-bill-header"
        backBtn
        onBackPress={onBackPress}
        title={localizationText.SADAD.EDIT_BILL}
        titleStyle={styles.headerText}
        applyFlex
      />
      <IPayView style={styles.formView}>
        <IPayView style={styles.contentContainer}>
          <Controller
            name={SadadEditBillFields.BILL_NICK_NAME}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <IPayAnimatedTextInput
                testID="bill-nick-name-input"
                label={localizationText.NEW_SADAD_BILLS.BILL_NICK_NAME}
                labelColor={colors.primary.primary500}
                editable
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <IPayView style={styles.diabledCardView}>
            <IPayView style={styles.infoView}>
              <IPayImage image={BILLS_MANAGEMENT_URLS.GET_BILLER_IMAGE(billerId)} style={styles.vendorIcon} />
              <IPayView>
                <IPayCaption1Text
                  text={localizationText.NEW_SADAD_BILLS.COMPANY_NAME}
                  color={colors.natural.natural500}
                />
                <IPaySubHeadlineText regular text={billerName} style={styles.inputValueText} />
              </IPayView>
            </IPayView>
            <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.natural.natural500} />
          </IPayView>

          <IPayView style={styles.diabledCardView}>
            <IPayView>
              <IPayCaption1Text
                text={localizationText.NEW_SADAD_BILLS.SERVICE_TYPE}
                color={colors.natural.natural500}
              />
              <IPaySubHeadlineText regular text={serviceDescription} style={styles.inputValueText} />
            </IPayView>
            <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.natural.natural500} />
          </IPayView>

          <IPayView style={styles.diabledCardView}>
            <IPayView>
              <IPayCaption1Text
                text={localizationText.NEW_SADAD_BILLS.ACCOUNT_NUMBER}
                color={colors.natural.natural500}
              />
              <IPaySubHeadlineText regular text={billNumOrBillingAcct} style={styles.inputValueText} />
            </IPayView>
          </IPayView>
        </IPayView>
      </IPayView>

      <IPayButton
        btnText={localizationText.COMMON.SAVE}
        btnType={buttonVariants.PRIMARY}
        onPress={onSubmit}
        large
        btnIconsDisabled
        btnStyle={styles.saveBtn}
        disabled={isSaveButtonDisabled}
      />
      <IPayAlert
        icon={<IPayIcon icon={icons.info_circle} size={64} color={colors.warning.warning600} />}
        visible={showAlert}
        closeOnTouchOutside
        animationType="fade"
        showIcon={false}
        title={localizationText.SADAD.DISCARD_CHANGES}
        onClose={onCloseAlert}
        message={localizationText.SADAD.EDIT_YOU_MADE_WILL_LOST}
        primaryAction={{
          text: localizationText.COMMON.YES,
          onPress: () => {
            setShowAlert(false);
            goBack();
          },
        }}
        tertiaryAction={{
          text: localizationText.COMMON.CANCEL,
          onPress: () => {
            setShowAlert(false);
          },
        }}
      />
    </IPaySafeAreaView>
  );
};

export default SadadEditBillsScreen;
