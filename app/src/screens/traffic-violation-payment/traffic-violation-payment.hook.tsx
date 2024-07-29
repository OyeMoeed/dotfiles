import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useEffect, useState } from 'react';

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

//TODO wiill be replaced by API
const useBillPaymentConfirmation = () => {
  const localizationText = useLocalization();
  const { billPayDetailsData } = useConstantData();
  const [balanceData, setBalanceData] = useState<BalanceData>({
    availableBalance: '0',
    balance: '0',
    calculatedBill: '0',
  });

  const [billPayDetailes, setBillPayDetailes] = useState<billPayDetail[]>([]);

  useEffect(() => {
    setBillPayDetailes(billPayDetailsData);
  }, []);

  const extraDetails: billPayDetail[] = [
    {
      id: '2',
      label: localizationText.TRAFFIC_VIOLATION.AMOUNT,
      value: '1000',
    },
  ];

  return {
    localizationText,
    billPayDetailes,
    balanceData,
    extraDetails,
  };
};

export default useBillPaymentConfirmation;
