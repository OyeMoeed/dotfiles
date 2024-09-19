import { useCustomQuery } from '@app/network/hooks';
import getCards from './get-cards.service';
import TRANSACTION_QUERY_KEYS from '../transaction.query-keys';

interface UseCardProps {
  payload: any;
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
