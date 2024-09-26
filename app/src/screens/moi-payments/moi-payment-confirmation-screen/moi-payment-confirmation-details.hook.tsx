import icons from '@app/assets/icons';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import moiBillPayment from '@app/network/services/bills-management/moi-bill-payment/moi-bill-payment.service';

import { useTypedSelector } from '@app/store/store';
import { MoiPaymentTypes } from '@app/utilities';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidateBillRes } from '../moi-payment-screen/moi-payment.interface';

interface MoiPaymentDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}

// TODO will be replaced by API
const useMoiPaymentConfirmation = (billData: ValidateBillRes) => {
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

  const moiPayBillSubList: MoiPaymentDetail[] = [
    {
      id: '1',
      label: t('BILL_PAYMENTS.BILL_TYPE'),
      value: 'Traffic Violation',
    },
    {
      id: '2',
      label: t('BILL_PAYMENTS.TRAFFIC_NUMBER'),
      value: '1965873233',
    },
    {
      id: '5',
      label: t('TRAFFIC_VIOLATION.VIOLATION_DATE'),
      value: '14/03/2023 - 15:30',
    },
    {
      id: '3',
      label: t('BILL_PAYMENTS.DUE_AMOUNT'),
      value: '500 SAR',
    },
    {
      id: '6',
      label: t('COMMON.REF_NUM'),
      value: 'FAT35346',
      icon: icons.copy,
    },
  ];

  const onConfirm = async () => {
    const payLoad = {
      billIdType: '',
      moiBillPaymentType: MoiPaymentTypes.PAYMENT,
      amount: billData.totalFeeAmount,
      billerId: billData?.billerId,
      serviceDescription: billData?.serviceTypeFromLOV?.desc,
      applyTax: 'N',
      serviceId: billData?.serviceTypeFromLOV?.code,
      groupPaymentId: billData?.groupPaymentId,
      paymentId: billData?.paymentId,
      dynamicFields: billData?.dynamicFields,
      walletNumber: walletNumber,
      mobileNo: mobileNumber,
      otp: otp,
      otpRef: otpRef,
    };

    const apiResponse = await moiBillPayment(payLoad);
    if (apiResponse?.successfulResponse) {
      setOtpSheetVisible(false);
      navigate(ScreenNames.MOI_PAYMENT_SUCCESS, {
        moiPaymentDetailes: billData,
        successMessage: 'BILL_PAYMENTS.PAYMENT_SUCCESS_MESSAGE',
        subDetails: moiPayBillSubList,
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
    moiPayBillSubList,
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
  };
};

export default useMoiPaymentConfirmation;
