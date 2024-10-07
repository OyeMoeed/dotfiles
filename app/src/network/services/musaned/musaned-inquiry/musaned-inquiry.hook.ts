import { useCustomQuery } from '@app/network/hooks';
import MUSANED_QUERY_KEYS from '../musaned.query-keys';
import getMusanedInquiryList from './musaned-inquiry.service';
import { MusanedInquiryMockProps, MusanedInquiryReqParams } from './musaned-inquiry.interface';

interface UseGetMusanedInquiryProps {
  payload: MusanedInquiryReqParams;
  onSuccess?: ((data?: MusanedInquiryMockProps) => void) | undefined;
  onError?: (() => void) | undefined;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
}

const useGetMusanedInquiry = ({ payload, onSuccess, onError, refetchOnMount }: UseGetMusanedInquiryProps) =>
  useCustomQuery({
    queryFn: () => getMusanedInquiryList(payload),
    queryKey: [MUSANED_QUERY_KEYS.GET_MUSANED_INQUIRY],
    onSuccess,
    onError,
    refetchOnMount,
  });

export default useGetMusanedInquiry;
