import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFER_QUERY_KEYS from '../international-transfer-query-keys';
import getAEBeneficiaryBanks from './ae-beneficiary-banks.service';
import { AEBeneficiaryBanksParam } from './ae-beneficiary-banks.interface';

const useGETAEBanks = ({
  alinmaExpressType,
  countryCode,
  enabled,
}: {
  alinmaExpressType: AEBeneficiaryBanksParam['alinmaExpressType'];
  countryCode: AEBeneficiaryBanksParam['countryCode'];
  enabled?: boolean;
}) => {
  const { isLoading, res, error } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFER_QUERY_KEYS.GET_AE_BANKS, alinmaExpressType, countryCode],
    queryFn: () => getAEBeneficiaryBanks({ alinmaExpressType, countryCode }),
    enabled: !!alinmaExpressType && !!countryCode && !!enabled,
  });
  return {
    isLoadingAEBanks: isLoading,
    aeBanksError: error,
    aeBanks: res?.response?.banks,
  };
};

export default useGETAEBanks;
