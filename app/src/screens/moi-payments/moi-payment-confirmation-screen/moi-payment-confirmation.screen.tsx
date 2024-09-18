import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { MOIBillPaymentPayloadProps } from '@app/network/services/bill-managment/moi/bill-payment/bill-payment.interface';
import moiBillPayment from '@app/network/services/bill-managment/moi/bill-payment/bill-payment.service';
import { PrepareBillPayloadProps } from '@app/network/services/bill-managment/moi/prepare-bill/prepare-bill.interface';
import prepareBill from '@app/network/services/bill-managment/moi/prepare-bill/prepare-bill.service';
import { getDeviceInfo } from '@app/network/utilities';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import React, { useMemo, useRef, useState } from 'react';
import useMoiPaymentConfirmation from './moi-payment-confirmation-details.hook';
import moiPaymentConfirmationStyls from './moi-payment-confirmation.styles';

const MoiPaymentConfirmationScreen: React.FC = ({ route }) => {
  const { moiBillData } = route.params || {}; 
  const styles = moiPaymentConfirmationStyls();
  const localizationText = useLocalization();
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { showToast } = useToastContext();
  const { availableBalance, currentBalance, userContactInfo } = walletInfo;
  const { mobileNumber } = userContactInfo;
  const { moiPaymentDetailes, otp, setOtp, isLoading, otpError, setOtpError, setAPIError, otpVerificationRef } =
    useMoiPaymentConfirmation();
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { otpConfig } = useConstantData();
  const otpBottomSheetRef = useRef<any>(null);
  const helpCenterRef = useRef<any>(null);
  const [otpRef, setOtpRef] = useState<string>('');

  // temporary TODO
  // const totalAmount = '500';

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
    onCloseBottomSheet();
    helpCenterRef?.current?.present();
  };

  const openOptModal = () => {
    otpBottomSheetRef?.current?.present();
  };

  const onPressCompletePayment = async () => {
    try {
      const deviceInfo = await getDeviceInfo();
      const payload: PrepareBillPayloadProps = {
        deviceInfo,
        walletNumber,
        showLoader: true,
      };
      const apiResponse: any = await prepareBill(payload, 'moi');
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS: {
          setOtpRef(apiResponse?.response?.otpRef);
          openOptModal();
          break;
        }
        case apiResponse?.apiResponseNotOk:
          renderToast(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          renderToast(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
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
          // redirectToSuccess();
        }
      } else {
        renderToast(localizationText.ERROR.API_ERROR_RESPONSE);
        setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
      }
    } catch (error: any) {
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const onConfirmOtp = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      verifyOtp();
    }
  };

  const totalAmount = useMemo(
    () =>
      moiBillData?.find((item: { label: string }) => item.label === localizationText.BILL_PAYMENTS.DUE_AMOUNT)
        ?.value.split(' ')[0] || null,
    [moiBillData],
  );

  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={localizationText.BILL_PAYMENTS.MOI_PAYMENT}
        titleStyle={styles.screenTitle}
      />
      <IPayView style={styles.container}>
        <IPayAccountBalance
          balance={availableBalance}
          availableBalance={currentBalance}
          showRemainingAmount
          topUpBtnStyle={styles.topUpButton}
        />
        <IPayBillDetailsOption
          data={moiPaymentDetailes}
          showHeader={false}
          optionsStyles={styles.moiPaymentDetailesTab}
        />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          onPressBtn={onPressCompletePayment}
          btnText={localizationText.SADAD.PAY}
          totalAmount={totalAmount}
          backgroundGradient={['transparent', 'transparent']}
          gradientViewStyle={styles.sadadFooterGradient}
          btnStyle={styles.sadadBtn}
          disableBtnIcons
        />
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.BILL_PAYMENTS.NEW_MOI_BILL}
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
        heading={localizationText.FORGOT_PASSCODE.HELP_CENTER}
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

export default MoiPaymentConfirmationScreen;
