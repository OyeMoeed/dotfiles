import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useCallback, useEffect, useState } from 'react';

interface billPayDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  violationNumber?: string;
  onPress?: () => void;
}

interface declinedBilledDetail {
  id: string;
  label: string;
  value: string;
  icon?: string;
  violationNumber: string;
  onPress?: () => void;
}
const useTrafficViolationSuccess = () => {
  const [billPayDetailes, setBillPayDetailes] = useState<billPayDetail[]>([]);
  const [declinedBillPayDetails, setDeclinedBillPayDetails] = useState<declinedBilledDetail[]>([]);
  const { billPayDetailsRefundData, declinedTransationData } = useConstantData();
  const [paidBilled] = useState<number>(0);
  const [paymentDeclined] = useState<boolean>(false);
  const goToHome = useCallback(() => {
    navigate(ScreenNames.HOME);
  }, []);

  useEffect(() => {
    setBillPayDetailes(billPayDetailsRefundData);
    setDeclinedBillPayDetails(declinedTransationData);
  }, []);
  const payOtherViolation = useCallback(() => {
    navigate(ScreenNames.TRAFFIC_VOILATION);
  }, []);

  return {
    goToHome,
    billPayDetailes,
    declinedBillPayDetails,
    paidBilled,
    paymentDeclined,
    payOtherViolation,
  };
};

export default useTrafficViolationSuccess;
