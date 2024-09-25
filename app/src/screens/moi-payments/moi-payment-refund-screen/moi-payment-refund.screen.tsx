import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { MOIBillPaymentPayloadProps } from '@app/network/services/bill-managment/moi/bill-payment/bill-payment.interface';
import moiBillPayment from '@app/network/services/bill-managment/moi/bill-payment/bill-payment.service';
import { PrepareBillPayloadProps } from '@app/network/services/bill-managment/moi/prepare-bill/prepare-bill.interface';
import prepareBill from '@app/network/services/bill-managment/moi/prepare-bill/prepare-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMoiPaymentConfirmation from '../moi-payment-confirmation-screen/moi-payment-confirmation-details.hook';
import { MOIItemProps } from './moi-payment-refund.interface';
import moiPaymentRefundStyles from './moi-payment-refund.style';

const MoiPaymentRefund: React.FC = ({ route }) => {
  const { t } = useTranslation();
  const { moiBillData } = route.params;
  const { colors } = useTheme();
  const styles = moiPaymentRefundStyles(colors);
  const [refundPaymentDetails, setRefundPaymentDetails] = useState<MOIItemProps[]>([]);
  const [otpRef, setOtpRef] = useState<string>('');
  const otpBottomSheetRef = useRef<bottomSheetTypes>(null);
  const { otpConfig } = useConstantData();
  const { showToast } = useToastContext();
  const { otp, setOtp, isLoading, otpError, setOtpError, otpVerificationRef, moiRefundBillSubList } =
    useMoiPaymentConfirmation();
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer?.walletInfo?.walletNumber);
  const mobileNumber = useTypedSelector((state) => state.walletInfoReducer?.walletInfo?.userContactInfo?.mobileNumber);

  const helpCenterRef = useRef<any>(null);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onPressConfirm = () => {
    otpBottomSheetRef?.current?.present();
  };

  const getDataToRender = useCallback(() => {
    // Remove the item with id '1'
    const updatedPaymentDetails = moiBillData?.filter((item: { id: string }) => item.id !== '1');

    // Update the ids accordingly
    const updatedPaymentDetailsWithNewIds = updatedPaymentDetails?.map((item: any, index: number) => ({
      ...item,
      id: (index + 1).toString(),
    }));

    setRefundPaymentDetails(updatedPaymentDetailsWithNewIds);
  }, [moiBillData]);

  const onPressCompletePayment = async () => {
    try {
      const deviceInfo = await getDeviceInfo();
      const payload: PrepareBillPayloadProps = {
        deviceInfo,
        walletNumber,
        showLoader: true,
      };
      const apiResponse: any = await prepareBill(payload, 'moi-refund');
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS: {
          setOtpRef(apiResponse?.response?.otpRef);
          onPressConfirm();
          break;
        }
        case apiResponse?.apiResponseNotOk:
          renderToast(t('ERROR.API_ERROR_RESPONSE'));
          break;
        case ApiResponseStatusType.FAILURE:
          renderToast(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const redirectToSuccess = () => {
    navigate(ScreenNames.MOI_PAYMENT_SUCCESS, {
      moiPaymentDetailes: moiBillData,
      successMessage: t('BILL_PAYMENTS.PAYMENT_SUCCESS_MESSAGE'),
      subDetails: moiRefundBillSubList,
      refund: false,
    });
  };

  const verifyOtp = async () => {
    try {
      const deviceInfo = await getDeviceInfo();

      const payload: MOIBillPaymentPayloadProps = {
        deviceInfo,
        otp,
        otpRef,
        walletNumber,
        moiBillPaymentType: 'Payment',
        billerId: '',
        billNumOrBillingAcct: '',
        dueDateTime: '',
        billIdType: '',
        billingCycle: '',
        serviceDescription: '',
      };

      const apiResponse: any = await moiBillPayment(payload);

      if (apiResponse?.status?.type === 'SUCCESS') {
        if (apiResponse?.response) {
          onCloseBottomSheet();
          redirectToSuccess();
        }
      } else {
        renderToast(t('ERROR.API_ERROR_RESPONSE'));
      }
    } catch (error: any) {
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'));
    } else {
      verifyOtp();
    }
  };

  useEffect(() => {
    getDataToRender();
  }, [moiBillData]);

  const totalAmount = useMemo(
    () =>
      moiBillData?.find((item: { label: string }) => item.label === t('BILL_PAYMENTS.DUE_AMOUNT'))
        ?.value.split(' ')[0] || null,
    [moiBillData],
  );

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title="BILL_PAYMENTS.REFUND_BILLS" />
      <IPayView style={styles.container}>
        <IPayBillDetailsOption
          data={refundPaymentDetails}
          showHeader={false}
          optionsStyles={styles.moiPaymentDetailesTab}
        />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          onPressBtn={onPressCompletePayment}
          btnText="COMMON.CONFIRM"
          totalAmount={totalAmount}
          btnRightIcon={<IPayIcon size={20} color={colors.natural.natural0} />}
          totalAmountText="LOCAL_TRANSFER.AMOUNT_TO_BE_REFUND"
          backgroundGradient={[colors.transparent, colors.transparent]}
          gradientViewStyle={styles.sadadFooterGradient}
        />
      </IPayView>
      <IPayBottomSheet
        heading="BILL_PAYMENTS.NEW_MOI_BILL"
        enablePanDownToClose
        simpleBar
        customSnapPoint={['1%', '97%']}
        onCloseBottomSheet={onCloseBottomSheet}
        ref={otpBottomSheetRef}
        bold
        cancelBnt
      >
        <IPayOtpVerification
          ref={otpVerificationRef}
          onPressConfirm={onConfirmOtp}
          mobileNumber={mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          otp={otp}
          showHelp
          timeout={otpConfig.login.otpTimeout}
          handleOnPressHelp={onPressHelp}
        />
      </IPayBottomSheet>

      <IPayBottomSheet
        heading="FORGOT_PASSCODE.HELP_CENTER"
        enablePanDownToClose
        simpleBar
        backBtn
        customSnapPoint={['1%', '97%']}
        ref={helpCenterRef}
      >
        <HelpCenterComponent />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default MoiPaymentRefund;
