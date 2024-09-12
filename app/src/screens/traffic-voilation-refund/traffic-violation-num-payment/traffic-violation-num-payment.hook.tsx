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
  const localizationText = useLocalization();
  const { billPayDetailsData } = useConstantData();
  const helpCenterRef = useRef<bottomSheetTypes>(null);
  const otpRef = useRef<bottomSheetTypes>(null);

  const handleOnPressHelp = () => {
    helpCenterRef?.current?.present();
  };
  const handleOtpVerification = () => {
    otpRef?.current?.present();
  };
  const [balanceData] = useState<BalanceData>({
    availableBalance: '0',
    balance: '0',
    calculatedBill: '1000',
  });

  const [billPayDetailes, setBillPayDetailes] = useState<billPayDetail[]>([]);

  useEffect(() => {
    setBillPayDetailes(billPayDetailsData);
  }, []);

  const extraDetails: billPayDetail[] = [
    {
      id: '2',
      label: t('TRAFFIC_VIOLATION.AMOUNT'),
      value: '1000',
    },
  ];

  const handlePay = () => {
    otpRef?.current?.close();
    navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT_SUCCESS, { variant: ScreenNames.TRAFFIC_VOILATION_NUM_REFUND });
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
  };
};

export default useBillPaymentConfirmation;
