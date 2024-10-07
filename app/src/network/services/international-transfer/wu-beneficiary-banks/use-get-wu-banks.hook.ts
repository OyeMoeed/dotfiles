import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFER_QUERY_KEYS from '../international-transfer-query-keys';
import getWUBanks from './wu-beneficiary-banks.service';
import { WUBeneficiaryBanksParam } from './wu-beneficiary-banks.interface';

const useGetWuBanks = ({
  currency,
  countryCode,
  remittanceType,
  enabled,
}: {
  currency?: WUBeneficiaryBanksParam['currency'];
  countryCode?: WUBeneficiaryBanksParam['countryCode'];
  remittanceType?: string;
  enabled?: boolean;
}) => {
  const { isLoading, res, error } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFER_QUERY_KEYS.GET_WU_BANKS, countryCode, currency, remittanceType],
    queryFn: () => getWUBanks({ currency, countryCode }),
    enabled: remittanceType === '500' && !!countryCode && !!enabled,
  });
  return {
    isLoadingWUBanks: isLoading,
    wuBanksError: error,
    wuBanks: res?.response?.banks || [],
  };
};

export default useGetWuBanks;
