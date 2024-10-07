import { useCustomQuery } from '@app/network/hooks';
import INTERNATIONAL_TRANSFERS_QUERY_KEYS from '../international-transfer.query-keys';
import getAlinmaExpressBeneficiaries from './alinma-express-beneficiary.service';
import { AlinmaExpressBeneficiary, UseGetAlinmaExpressBeneficiary } from './alinma-express-beneficiary.interface';

const useGetAlinmaExpressBeneficiary = ({ onSuccess }: UseGetAlinmaExpressBeneficiary) => {
  const { isLoading, res, error, refetch } = useCustomQuery({
    queryKey: [INTERNATIONAL_TRANSFERS_QUERY_KEYS.ALINMA_EXPRESS_BENEFICIARY],
    queryFn: () => getAlinmaExpressBeneficiaries(),
    onSuccess,
  });

  const data: AlinmaExpressBeneficiary[] = res?.beneficiaries ?? [];

  return { isLoading, data, error, refetch };
};

export default useGetAlinmaExpressBeneficiary;
