import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFERS_QUERY_KEYS from '../international-transfer.query-keys';
import getWesternUnionBeneficiaries from './western-union-beneficiary.service';
import { WesternUnionBeneficiary } from './western-union-beneficiary.interface';

const useGetWesternUnionBeneficiaries = () => {
  const { isLoading, res, error, refetch } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFERS_QUERY_KEYS.WESTERN_UNION_BENEFICIARY],
    queryFn: () => getWesternUnionBeneficiaries(),
  });

  const data: WesternUnionBeneficiary[] = res?.response?.beneficiaries ?? [];
  return { isLoading, data, error, refetch };
};

export default useGetWesternUnionBeneficiaries;
