import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFER_QUERY_KEYS from '../international-transfer-query-keys';
import getWUBeneficiaryCurrencies from './wu-beneficiary-currencies.service';

const useGetWUCurrencies = ({ countryCode, enabled }: { countryCode?: string; enabled?: boolean }) => {
  const { res, isLoading, error } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFER_QUERY_KEYS.GET_WU_CURRENCIES, countryCode],
    queryFn: () => getWUBeneficiaryCurrencies({ countryCode }),
    enabled: enabled && !!countryCode,
  });

  return {
    wuCurrencies: res?.response?.currencies,
    isLoadingWUCurrencies: isLoading,
    wuCurrenciesError: error,
  };
};

export default useGetWUCurrencies;
