import { useCustomQuery } from '@app/network/hooks';
import getCards from './get-cards.service';
import TRANSACTION_QUERY_KEYS from '../transaction.query-keys';
import { CardsProp } from '../transaction.interface';

interface UseCardProps {
  payload: CardsProp;
  onSuccess?: ((data?: object | undefined) => void) | undefined;
  onError?: ((data?: object | undefined) => void) | undefined;
}

const useGetCards = ({ payload, onSuccess, onError }: UseCardProps) =>
  useCustomQuery({
    queryFn: () => getCards(payload),
    queryKey: [TRANSACTION_QUERY_KEYS.GET_CARDS],
    onSuccess,
    onError,
  });

export default useGetCards;
