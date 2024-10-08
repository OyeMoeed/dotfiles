import { useCustomQuery } from '@app/network/hooks';
import TRANSACTION_QUERY_KEYS from './transaction.query-keys';
import { TransactionsProp } from './transaction.interface';
import { getTransactions } from './transactions.service';

const useGetTransactions = ({ payload }: { payload: TransactionsProp }) => {
  const { isLoading, res, error, refetch } = useCustomQuery({
    queryKey: [TRANSACTION_QUERY_KEYS.GET_TRANSACTIONS, TRANSACTION_QUERY_KEYS.GET_TRANSACTIONS_MUSANED],
    queryFn: () => getTransactions(payload),
  });

  return {
    isLoadingTransactions: isLoading,
    transactionsData: res?.response?.transactions,
    errorTransactions: error,
    refetchTransactions: refetch,
  };
};

export default useGetTransactions;
