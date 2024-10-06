import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFERS_QUERY_KEYS from '../international-transfer.query-keys';
import getAlinmaExpressBeneficiaries from './alinma-express-beneficiary.service';
import { AlinmaExpressBeneficiary } from './alinma-express-beneficiary.interface';

const useGetAlinmaExpressBeneficiary = () => {
  const { isLoading, res, error, refetch } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFERS_QUERY_KEYS.ALINMA_EXPRESS_BENEFICIARY],
    queryFn: () => getAlinmaExpressBeneficiaries(),
  });

  const data: AlinmaExpressBeneficiary[] = res?.response?.beneficiaries ?? [];

  return { isLoading, data, error, refetch };
};

export default useGetAlinmaExpressBeneficiary;
