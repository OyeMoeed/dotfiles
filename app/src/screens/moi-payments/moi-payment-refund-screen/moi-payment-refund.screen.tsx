import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayOtpVerification, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import HelpCenterComponent from '@app/screens/auth/forgot-passcode/help-center.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useMoiPaymentConfirmation from '../moi-payment-confirmation-screen/moi-payment-confirmation-details.hook';
import { MOIItemProps } from './moi-payment-refund.interface';
import moiPaymentRefundStyles from './moi-payment-refund.style';

const MoiPaymentRefund: React.FC = () => {
  const { colors } = useTheme();
  const styles = moiPaymentRefundStyles();
  const localizationText = useLocalization();
  const { moiPaymentDetailes, moiRefundBillSubList } = useMoiPaymentConfirmation();
  const [refundPaymentDetails, setRefundPaymentDetails] = useState<MOIItemProps[]>([]);
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const { userContactInfo } = walletInfo;
  const { mobileNumber } = userContactInfo;
  const otpBottomSheetRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { otpConfig } = useConstantData();

  const helpCenterRef = useRef<any>(null);
  // Temporary TODO
  const totalAmount = '500';

  const onCloseBottomSheet = () => {
    otpBottomSheetRef?.current?.close();
  };

  const onConfirmPressOtp = () => {
    onCloseBottomSheet();
    navigate(ScreenNames.MOI_PAYMENT_SUCCESS, {
      moiPaymentDetailes,
      successMessage: localizationText.BILL_PAYMENTS.PAYMENT_REFUND_SUCCESS,
      subDetails: moiRefundBillSubList,
      refund: true,
    });
  };

  const onPressHelp = () => {
    helpCenterRef?.current?.present();
  };

  const onPressConfirm = () => {
    otpBottomSheetRef?.current?.present();
  };

  const getDataToRender = useCallback(() => {
    // Remove the item with id '1'
    const updatedPaymentDetails = moiPaymentDetailes.filter((item) => item.id !== '1');

    // Update the ids accordingly
    const updatedPaymentDetailsWithNewIds = updatedPaymentDetails.map((item, index) => ({
      ...item,
      id: (index + 1).toString(),
    }));

    setRefundPaymentDetails(updatedPaymentDetailsWithNewIds);
  }, [moiPaymentDetailes]);

  const handlePay = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      onConfirmPressOtp();
    }
  };

  useEffect(() => {
    getDataToRender();
  }, []);

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.BILL_PAYMENTS.REFUND_BILLS} />
      <IPayView style={styles.container}>
        <IPayBillDetailsOption
          data={refundPaymentDetails}
          showHeader={false}
          optionsStyles={styles.moiPaymentDetailesTab}
        />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          onPressBtn={onPressConfirm}
          btnText={localizationText.COMMON.CONFIRM}
          totalAmount={totalAmount}
          btnRightIcon={<IPayIcon size={20} color={colors.natural.natural0} />}
          totalAmountText={localizationText.LOCAL_TRANSFER.AMOUNT_TO_BE_REFUND}
          backgroundGradient={['transparent', 'transparent']}
          gradientViewStyle={styles.sadadFooterGradient}
        />
      </IPayView>
      <IPayBottomSheet
        heading={localizationText.LOCAL_TRANSFER.TRANSFER}
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
          onPressConfirm={handlePay}
          mobileNumber={mobileNumber}
          setOtp={setOtp}
          setOtpError={setOtpError}
          otpError={otpError}
          isLoading={isLoading}
          apiError={apiError}
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

export default MoiPaymentRefund;
