import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import WALLET_QUERY_KEYS from '@app/network/services/core/get-wallet/get-wallet.query-keys';
import { customInvalidateQuery, toggleAppRating } from '@app/utilities';
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
  const { billPaymentDetails, billHeaderDetail, billSaveDetails } = useConstantData();
  const goToHome = useCallback(() => {
    customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
    toggleAppRating();
    navigate(ScreenNames.HOME);
  }, []);

  useEffect(() => {
    setBillPayDetailes(billPaymentDetails);
  }, []);

  return {
    goToHome,
    billPayDetailes,
    billHeaderDetail,
    billSaveDetails,
  };
};

export default usePayBillSuccess;
