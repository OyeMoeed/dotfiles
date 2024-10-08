import { RequestItem } from '@app/network/services/request-management/recevied-requests/recevied-requests.interface';

export interface NoRequestComponentProps {
  pendingRequests: RequestItem[];
  previousRequests: RequestItem[];
}
