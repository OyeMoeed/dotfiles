import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useRoute } from '@react-navigation/core';
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

// TODO will be replaced by API
const useBillPaymentConfirmation = () => {
  const { t } = useTranslation();
  const localizationText = useLocalization();
  const { billPayDetailsData } = useConstantData();
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const otpRef = useRef<bottomSheetTypes>(null);
  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [apiError] = useState<string>('');
  const [isLoading] = useState<boolean>(false);
  const otpVerificationRef = useRef<bottomSheetTypes>(null);
  const route = useRoute();
  const payOnly = (route?.params as { payOnly: string })?.payOnly;

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

  const [billPayDetailes, setBillPayDetailes] = useState<billPayDetail[]>([]);

  useEffect(() => {
    setBillPayDetailes(billPayDetailsData);
  }, []);

  const extraDetails: billPayDetail[] = [
    {
      id: '2',
      label: t('TRAFFIC_VIOLATION.AMOUNT'),
      value: `1000 ${localizationText.COMMON.SAR}`,
    },
  ];

  const onConfirm = () => {
    otpRef?.current?.close();
    navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT_SUCCESS, { payOnly: !payOnly });
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
