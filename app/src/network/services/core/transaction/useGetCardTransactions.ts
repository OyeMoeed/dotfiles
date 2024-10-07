import { useCustomQuery } from '@app/network/hooks';
import TRANSACTION_QUERY_KEYS from './transaction.query-keys';
import { TransactionsProp } from './transaction.interface';
import { getTransactions } from './transactions.service';

const useGetCardsTransactions = ({
  payload,
  refetchOnMount = true,
}: {
  payload: TransactionsProp;
  refetchOnMount?: boolean;
}) => {
  const { isLoading, res, error, refetch } = useCustomQuery({
    queryKey: TRANSACTION_QUERY_KEYS.GET_CARDS_TRANSACTIONS,
    queryFn: () => getTransactions(payload, false),
    refetchOnMount,
    refetchOnWindowFocus: true,
  });

  return {
    isLoadingTransactions: isLoading,
    transactionsData: res?.response?.transactions,
    errorTransactions: error,
    refetchTransactions: refetch,
  };
};

export default useGetCardsTransactions;
