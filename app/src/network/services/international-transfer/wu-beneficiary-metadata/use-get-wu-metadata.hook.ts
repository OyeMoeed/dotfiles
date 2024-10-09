import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFER_QUERY_KEYS from '../international-transfer-query-keys';
import getWUBeneficiaryMetaData from './wu-beneficiary-metadata.service';

const useGetWUMetadata = ({ enabled }: { enabled?: boolean }) => {
  const { res, isLoading, error } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFER_QUERY_KEYS.GET_WU_METADATA],
    queryFn: () => getWUBeneficiaryMetaData(),
    enabled,
  });

  return {
    wuMetadata: res?.response?.westernUnionCountryList,
    isLoadingWUMeyadata: isLoading,
    wuError: error,
  };
};

export default useGetWUMetadata;
