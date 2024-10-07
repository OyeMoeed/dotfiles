import { useCustomQuery } from '@app/network/hooks';
import getAEBeneficiaryCountries from './ae-beneficiary-countries.service';
import INTERNATIONAL_TRANSFER_QUERY_KEYS from '../international-transfer-query-keys';
import { AEBeneficiaryCountriesParam } from './ae-beneficiary-countries.interface';

const useGetAECountries = ({
  alinmaExpressType,
  enabled,
}: {
  alinmaExpressType?: AEBeneficiaryCountriesParam['alinmaExpressType'];
  enabled?: boolean;
}) => {
  const { isLoading, res, error } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFER_QUERY_KEYS.GET_COUNTRIES_AE, alinmaExpressType],
    queryFn: () => getAEBeneficiaryCountries({ alinmaExpressType }),
    enabled: !!alinmaExpressType && !!enabled,
  });

  return {
    aeCountries: res?.response?.countries,
    isLoadingAECountries: isLoading,
    aeCountriesError: error,
  };
};

export default useGetAECountries;
