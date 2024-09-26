import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import { SNAP_POINT } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { MOIBillPaymentPayloadProps } from '@app/network/services/bill-managment/moi/bill-payment/bill-payment.interface';
import moiBillPayment from '@app/network/services/bill-managment/moi/bill-payment/bill-payment.service';
import prepareMoiBill from '@app/network/services/bills-management/prepare-moi-bill/prepare-moi-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { PaymentType } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const { otpConfig } = useConstantData();
  const { showToast } = useToastContext();
  const { billData } = route?.params || {};
  const {
    otp,
    setOtp,
    isLoading,
    otpError,
    setOtpError,
    otpVerificationRef,
    moiRefundBillSubList,
    isOtpSheetVisible,
    setOtpSheetVisible,
  } = useMoiPaymentConfirmation(billData);
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
    setOtpSheetVisible(false);
  };

  const onPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const getDataToRender = useCallback(() => {
    const updatedPaymentDetails = billData?.dynamicFields?.filter((item: { id: string }) => item.id !== '1');

    const updatedPaymentDetailsWithNewIds = updatedPaymentDetails?.map((item: any, index: number) => ({
      ...item,
      id: (index + 1).toString(),
    }));

    const serviceType = {
      id: (updatedPaymentDetailsWithNewIds.length + 1).toString(),
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: billData?.serviceTypeFromLOV?.desc,
    };
    const serviceProvider = {
      id: (updatedPaymentDetailsWithNewIds.length + 2).toString(),
      label: t('TRAFFIC_VIOLATION.SERVICE_PROVIDER'),
      value: billData?.serviceProviderDesc?.desc,
    };

    setRefundPaymentDetails([serviceProvider, serviceType, ...updatedPaymentDetailsWithNewIds]);
  }, [moiBillData]);

  const onPressCompletePayment = async () => {
    const deviceInfo = await getDeviceInfo();
    const payLoad = {
      deviceInfo: deviceInfo,
      walletNumber: walletNumber,
    };

    const apiResponse = await prepareMoiBill(PaymentType.REFUND, payLoad);
    if (apiResponse?.successfulResponse) {
      setOtpRef(apiResponse?.response.otpRef);
      setOtpSheetVisible(true);
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
          totalAmount={billData?.totalFeeAmount}
          btnRightIcon={<IPayIcon size={20} color={colors.natural.natural0} />}
          totalAmountText="LOCAL_TRANSFER.AMOUNT_TO_BE_REFUND"
          backgroundGradient={[colors.transparent, colors.transparent]}
          gradientViewStyle={styles.sadadFooterGradient}
        />
      </IPayView>

      <IPayPortalBottomSheet
        heading="BILL_PAYMENTS.NEW_MOI_BILL"
        enablePanDownToClose
        simpleBar
        customSnapPoint={SNAP_POINT.MEDIUM_LARGE}
        onCloseBottomSheet={onCloseBottomSheet}
        isVisible={isOtpSheetVisible}
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
      </IPayPortalBottomSheet>

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
