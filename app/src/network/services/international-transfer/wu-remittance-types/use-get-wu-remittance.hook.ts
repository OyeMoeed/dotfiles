import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFER_QUERY_KEYS from '../international-transfer-query-keys';
import getWURemittanceTypes from './wu-remittance-types.service';
import { BeneficiaryCurrenciesReq } from './wu-remittance-types.interface';

const useGetWURemittance = ({
  countryCode,
  currencyCode,
  enabled,
}: {
  countryCode: BeneficiaryCurrenciesReq['countryCode'];
  currencyCode: BeneficiaryCurrenciesReq['currencyCode'];
  enabled?: boolean;
}) => {
  const { res, isLoading, error } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFER_QUERY_KEYS.GET_WU_REMITTANCE, countryCode, currencyCode],
    queryFn: () => getWURemittanceTypes({ countryCode, currencyCode }),
    enabled: !!countryCode && !!currencyCode && !!enabled,
  });

  return {
    wuRemittanceTypes: res?.response?.remittanceTypes,
    isLoadingWURemittance: isLoading,
    errorWURemittance: error,
  };
};

export default useGetWURemittance;
