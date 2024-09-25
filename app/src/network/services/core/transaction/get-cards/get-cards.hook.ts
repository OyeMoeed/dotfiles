import { useCustomQuery } from '@app/network/hooks';
import { UseQueryOptions } from 'react-query';
import { CardsProp } from '../transaction.interface';
import TRANSACTION_QUERY_KEYS from '../transaction.query-keys';
import getCards from './get-cards.service';

interface UseCardProps extends UseQueryOptions {
  payload: CardsProp;
}

const useGetCards = ({ payload, onSuccess, onError }: UseCardProps) =>
  useCustomQuery({
    queryFn: () => getCards(payload),
    queryKey: [TRANSACTION_QUERY_KEYS.GET_CARDS],
    onSuccess,
    onError,
  });

export default useGetCards;
