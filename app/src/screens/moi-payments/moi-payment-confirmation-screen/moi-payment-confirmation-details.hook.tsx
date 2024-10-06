import moiBillPayment from '@app/network/services/bills-management/moi-bill-payment/moi-bill-payment.service';

import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidateBillRes } from '../moi-payment-screen/moi-payment.interface';

const useMoiPaymentConfirmation = (billData: ValidateBillRes, isRefund: boolean) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [isOtpSheetVisible, setOtpSheetVisible] = useState<boolean>(false);
  const [otpRef, setOtpRef] = useState<string>('');
  const [apiError] = useState<string>('');
  const otpBottomSheetRef = useRef<any>(null);
  const [isLoading] = useState<boolean>(false);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const { walletNumber, mobileNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const onConfirm = async () => {
    const payLoad = {
      billerId: billData?.serviceProviderFromLOV?.code,
      serviceId: billData?.serviceTypeFromLOV?.code,
      dynamicFields: billData?.dynamicFields,
      billIdType: '',
      moiBillPaymentType: isRefund ? 'REFUND' : 'PAYMENT',
      amount: isRefund ? '' : billData.totalFeeAmount,
      serviceDescription: billData?.serviceTypeFromLOV?.desc,
      applyTax: 'N',
      groupPaymentId: billData.groupPaymentId,
      paymentId: billData.paymentId,
      walletNumber,
      mobileNo: mobileNumber,
      otp,
      otpRef,
    };

    setOtpSheetVisible(false);
    const apiResponse = await moiBillPayment(payLoad);
    if (apiResponse?.successfulResponse) {
      otpBottomSheetRef.current?.close();
      navigate(ScreenNames.MOI_PAYMENT_SUCCESS, {
        moiPaymentDetailes: billData,
        successMessage: isRefund ? 'BILL_PAYMENTS.PAYMENT_REFUND_SUCCESS' : 'BILL_PAYMENTS.PAYMENT_SUCCESS_MESSAGE',
        subDetails: apiResponse.response,
        isRefund,
      });
    }
  };

  const handlePay = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(t('COMMON.INCORRECT_CODE'), false);
    } else {
      onConfirm();
    }
  };

  return {
    otpBottomSheetRef,
    handlePay,
    setOtp,
    otp,
    isLoading,
    otpError,
    setOtpError,
    apiError,
    otpVerificationRef,
    setOtpRef,
    isOtpSheetVisible,
    setOtpSheetVisible,
    onConfirm,
  };
};

export default useMoiPaymentConfirmation;
