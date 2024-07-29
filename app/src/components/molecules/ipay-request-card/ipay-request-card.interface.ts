export type StatusType = 'paid' | 'cancelled' | 'rejected';

export interface PendingRequestProps {
  isPending: true;
  description: string;
  dateTime: string;
}

export interface PreviousRequestProps {
  isPending: false;
  status: StatusType;
  description: string;
  dateTime: string;
}

export type IpayRequestCardProps = PendingRequestProps | PreviousRequestProps;
