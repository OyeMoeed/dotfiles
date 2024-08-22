import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRef, useState } from 'react';

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

//TODO wiill be replaced by API
const useBillPaymentConfirmation = (isPayPartially?: boolean, isPayOnly?: boolean) => {
  const localizationText = useLocalization();
  const otpRef = useRef<bottomSheetTypes>(null);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);

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
    //TODO wiill be replaced by API
    title: 'My Electricity Bill',
    companyDetails: '123 - Saudi electricity co.',
    companyImage: images.electricityBill,
  };

  const balanceData = {
    availableBalance: '52000',
    balance: '50000',
    calculatedBill: '300',
  };

  const onConfirm = () => {
    otpRef?.current?.close();
    navigate(ScreenNames.PAY_BILL_SUCCESS, { isPayOnly, isPayPartially });
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
  };
};

export default useBillPaymentConfirmation;
