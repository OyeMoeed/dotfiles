import { useCustomQuery } from '@app/network/hooks';
import { ApiResponse } from '@app/network/services/services.interface';
import { CardResponseInterface, CardsProp } from '../transaction.interface';
import TRANSACTION_QUERY_KEYS from '../transaction.query-keys';
import getCards from './get-cards.service';

interface UseCardProps {
  payload: CardsProp;
  onSuccess?: ((data?: ApiResponse<{ cards: CardResponseInterface[] }>) => void) | undefined;
  onError?: (() => void) | undefined;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
}

const useGetCards = ({ payload, onSuccess, onError, refetchOnMount }: UseCardProps) =>
  useCustomQuery({
    queryFn: () => getCards(payload),
    queryKey: [TRANSACTION_QUERY_KEYS.GET_CARDS],
    onSuccess,
    onError,
    refetchOnMount,
  });

export default useGetCards;
