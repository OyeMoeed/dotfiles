import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface billPayDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  onPress?: () => void;
}
interface BalanceData {
  availableBalance: string;
  balance: string;
  calculatedBill: string;
}

// TODO wiill be replaced by API
const useBillPaymentConfirmation = () => {
  const { t } = useTranslation();
  const { billPayDetailsData } = useConstantData();
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const otpRef = useRef<bottomSheetTypes>(null);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const [otp, setOtp] = useState<string>('');
  const [billPayDetails, setBillPayDetails] = useState<billPayDetail[]>([]);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError] = useState<string>('');
  const [isLoading] = useState<boolean>(false);

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };
  const handleOtpVerification = () => {
    otpRef?.current?.present();
  };
  const [balanceData] = useState<BalanceData>({
    availableBalance: '0',
    balance: '0',
    calculatedBill: '3000',
  });

  useEffect(() => {
    setBillPayDetails(billPayDetailsData);
  }, []);

  const extraDetails: billPayDetail[] = [
    {
      id: '2',
      label: t('TRAFFIC_VIOLATION.AMOUNT'),
      value: `1000 ${t('COMMON.SAR')}`,
    },
  ];

  const onConfirm = () => {
    otpRef?.current?.close();
    navigate(ScreenNames.TRAFFIC_VOILATION_REFUND_SUCCESS, { payOnly: false });
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
    billPayDetailes: billPayDetails,
    balanceData,
    extraDetails,
    handlePay,
    helpCenterRef,
    otpRef,
    handleOtpVerification,
    handleOnPressHelp,
    otp,
    isLoading,
    otpError,
    setOtpError,
    apiError,
    setOtp,
    otpVerificationRef,
  };
};

export default useBillPaymentConfirmation;
