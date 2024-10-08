import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  BillPaymentInfosTypes,
  MultiPaymentBillPayloadTypes,
  MultiPaymentBillResponseTypes,
} from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';
import multiPaymentBillService from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.service';
import { shortString } from '@app/utilities';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
) => {
  const { t } = useTranslation();
  const otpRef = useRef<bottomSheetTypes>(null);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const verifyOTPSheetRef = useRef<bottomSheetTypes>(null);
  const [otpRefAPI, setOtpRefAPI] = useState<string>('');
  const billPayDetails: billPayDetail[] = [
    {
      id: '2',
      label: t('PAY_BILL.SERVICE_TYPE'),
      value: 'Electricity Bill',
    },
    {
      id: '3',
      label: t('PAY_BILL.ACCOUNT_NUMBER'),
      value: 'AZ00876',
    },
    {
      id: '4',
      label: t('COMMON.DUE_DATE'),
      value: '14/03/2024',
    },
  ];

  const headerData: HeaderData = {
    // TODO wiill be replaced by API
    title: 'My Electricity Bill',
    companyDetails: '123 - Saudi electricity co.',
    companyImage: images.electricityBill,
  };

  const balanceData = {
    availableBalance: '52000',
    balance: '50000',
    calculatedBill: '300',
  };

  const getTransactionIds = (apiResponse: MultiPaymentBillResponseTypes, index: number) =>
    apiResponse.response.billPaymentResponses[index].transactionId;

  const onConfirm = async () => {
    const payload: MultiPaymentBillPayloadTypes = {
      otpRef: otpRefAPI,
      otp,
      billPaymentInfos: billPaymentInfos || [],
    };
    setIsLoading(true);
    const apiResponse = await multiPaymentBillService(payload);
    const billPayDetailsArr = [
      {
        id: '1',
        label: t('PAY_BILL.SERVICE_TYPE'),
        value: shortString(billPaymentInfos?.[0].serviceDescription || ''),
      },
      {
        id: '2',
        label: t('PAY_BILL.ACCOUNT_NUMBER'),
        value: billPaymentInfos?.[0].billNumOrBillingAcct,
      },
      {
        id: '3',
        label: t('COMMON.DUE_DATE'),
        value: billPaymentInfos?.[0].dueDateTime,
      },
      {
        id: '4',
        label: t('COMMON.REF_NUM'),
        value: apiResponse.response.billPaymentResponses[0].transactionId,
        icon: icons.copy,
      },
    ];

    setIsLoading(false);
    if (apiResponse.successfulResponse) {
      verifyOTPSheetRef.current?.close();
      otpRef?.current?.close();
      navigate(ScreenNames.PAY_BILL_SUCCESS, {
        isPayOnly,
        isPayPartially,
        billPayDetailes: billPayDetailsArr,
        totalAmount: billPaymentInfos?.[0].amount,
        billPaymentInfos: billPaymentInfos?.map((el, index) => ({
          ...el,
          transactionId: getTransactionIds(apiResponse, index),
        })),
      });
    } else {
      setAPIError(apiResponse?.error || t('ERROR.SOMETHING_WENT_WRONG'));
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
    billPayDetails,
    headerData,
    balanceData,
    handlePay,
    setOtp,
    otp,
    isLoading,
    otpError,
    setOtpError,
    apiError,
    otpVerificationRef,
    verifyOTPSheetRef,
    setOtpRefAPI,
  };
};

export default useBillPaymentConfirmation;
