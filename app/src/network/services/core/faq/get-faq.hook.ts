import { useCustomQuery } from '@app/network/hooks';
import { UseFaqProps } from './faq.interface';
import FAQ_QUERY_KEYS from './faq.query-keys';
import getFAQ from './faq.service';

const useGetFaq = ({ payload, onSuccess, onError, refetchOnMount }: UseFaqProps) =>
  useCustomQuery({
    queryFn: () => getFAQ(payload),
    queryKey: [FAQ_QUERY_KEYS.GET_FAQ],
    onSuccess,
    onError,
    refetchOnMount,
  });

export default useGetFaq;
