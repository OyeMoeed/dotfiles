import icons from '@app/assets/icons';
import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  MultiPaymentBillPayloadTypes,
  BillPaymentInfosTypes,
} from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';
import multiPaymentBillService from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.service';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRef, useState } from 'react';
import { BillHeaderDetailTypes } from './bill-payment-confirmation.interface';

interface billPayDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}

interface HeaderData {
  title: string;
  companyDetails: string;
  companyImage: string;
}

// TODO wiill be replaced by API
const useBillPaymentConfirmation = (
  isPayPartially?: boolean,
  isPayOnly?: boolean,
  billPaymentInfos?: BillPaymentInfosTypes[],
  billHeaderDetail?: BillHeaderDetailTypes,
) => {
  const localizationText = useLocalization();
  const otpRef = useRef<bottomSheetTypes>(null);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const veriyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const [otpRefAPI, setOtpRefAPI] = useState<string>('');
  const billPayDetailes: billPayDetail[] = [
    {
      id: '2',
      label: localizationText.PAY_BILL.SERVICE_TYPE,
      value: 'Electricity Bill',
    },
    {
      id: '3',
      label: localizationText.PAY_BILL.ACCOUNT_NUMBER,
      value: 'AZ00876',
    },
    {
      id: '4',
      label: localizationText.COMMON.DUE_DATE,
      value: '14/03/2024',
    },
  ];

  const headerData: HeaderData = {
    // TODO wiill be replaced by API
    title: 'My Electricity Bill',
    companyDetails: '123 - Saudi electricity co.',
    companyImage: images.electricityBill,
  };

  const shortString = (text: string) => {
    if (text.length < 20) {
      return text;
    }
    return `${text.slice(0, 15)}...`;
  };

  const balanceData = {
    availableBalance: '52000',
    balance: '50000',
    calculatedBill: '300',
  };

  const billPayDetailesArr = [
    {
      id: '1',
      label: localizationText.PAY_BILL.SERVICE_TYPE,
      value: shortString(billPaymentInfos[0].serviceDescription),
    },
    {
      id: '2',
      label: localizationText.PAY_BILL.ACCOUNT_NUMBER,
      value: billPaymentInfos[0].billNumOrBillingAcct,
    },
    {
      id: '3',
      label: localizationText.COMMON.DUE_DATE,
      value: billPaymentInfos[0].dueDateTime,
    },
    {
      id: '4',
      label: localizationText.COMMON.REF_NUM,
      value: apiResponse.response.billPaymentResponses[0].transactionId,
      icon: icons.copy,
    },
  ];

  const onConfirm = async () => {
    const payload: MultiPaymentBillPayloadTypes = {
      otpRef: otpRefAPI,
      otp,
      billPaymentInfos,
    };
    setIsLoading(true);
    const apiResponse = await multiPaymentBillService(payload);
    setIsLoading(false);
    if (apiResponse.successfulResponse) {
      veriyOTPSheetRef.current?.close();
      otpRef?.current?.close();
      navigate(ScreenNames.PAY_BILL_SUCCESS, {
        isPayOnly,
        isPayPartially,
        billPayDetailes: billPayDetailesArr,
        billHeaderDetail,
        totalAmount: billPaymentInfos[0].amount,
      });
    } else {
      setAPIError(apiResponse?.error || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const handlePay = () => {
    if (otp === '' || otp.length < 4) {
      setOtpError(true);
      otpVerificationRef.current?.triggerToast(localizationText.COMMON.INCORRECT_CODE, false);
    } else {
      onConfirm();
    }
  };

  return {
    localizationText,
    billPayDetailes,
    headerData,
    balanceData,
    handlePay,
    setOtp,
    isLoading,
    otpError,
    setOtpError,
    apiError,
    otpVerificationRef,
    veriyOTPSheetRef,
    setOtpRefAPI,
  };
};

export default useBillPaymentConfirmation;
