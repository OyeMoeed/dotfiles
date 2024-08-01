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
const usePayBillSuccess = () => {
  const [billPayDetailes, setBillPayDetailes] = useState<billPayDetail[]>([]);
  const { billPaymentDetails, billHeaderDetail } = useConstantData();
  const goToHome = useCallback(() => {
    navigate(ScreenNames.HOME);
  }, []);

  useEffect(() => {
    setBillPayDetailes(billPaymentDetails);
  }, []);

  return {
    goToHome,
    billPayDetailes,
    billHeaderDetail,
  };
};

export default usePayBillSuccess;
