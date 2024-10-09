import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFER_QUERY_KEYS from '../international-transfer-query-keys';
import getAEBeneficiaryMetaData from './ae-beneficiary-metadata.service';

const useGetAEMetadata = ({ enabled }: { enabled?: boolean }) => {
  const { isLoading, res, error } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFER_QUERY_KEYS.GET_AE_METADATA],
    queryFn: () => getAEBeneficiaryMetaData(),
    enabled,
  });

  return {
    isLoadingAEMetadata: isLoading,
    aeMetadata: res?.response?.alinmaExpressTypeList,
    aeError: error,
  };
};

export default useGetAEMetadata;
