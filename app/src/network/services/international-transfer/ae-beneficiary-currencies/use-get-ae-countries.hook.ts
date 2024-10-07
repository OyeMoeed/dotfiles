import { useCustomQuery } from '@app/network/hooks';
import getAECurrencies from './ae-beneficiary-currencies.service';
import INTERNATIONAL_TRANSFER_QUERY_KEYS from '../international-transfer-query-keys';
import { AECurrenciesParams } from './ae-beneficiary-currencies.interface';

const useGetAECurrencies = ({
  alinmaExpressType,
  bank,
  enabled,
}: {
  alinmaExpressType?: AECurrenciesParams['alinmaExpressType'];
  bank?: AECurrenciesParams['bank'];
  enabled?: boolean;
}) => {
  const { isLoading, res, error } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFER_QUERY_KEYS.GET_COUNTRIES_AE, alinmaExpressType, bank],
    queryFn: () => getAECurrencies({ alinmaExpressType, bank }),
    enabled: !!alinmaExpressType && !!enabled && !!bank,
  });

  return {
    aeCurrencies: res?.response?.currencies,
    isLoadingAECurrencies: isLoading,
    aeCurrenciesError: error,
  };
};

export default useGetAECurrencies;
