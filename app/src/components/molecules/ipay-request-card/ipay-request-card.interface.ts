export type StatusType = 'paid' | 'cancelled' | 'rejected';

export interface PendingRequestProps {
  id?: string;
  isPending: true;
  description: string;
  dateTime: string;
}

export interface PreviousRequestProps {
  id?: string;
  isPending: false;
  status: StatusType;
  description: string;
  dateTime: string;
}

export type IPayRequestCardProps = PendingRequestProps | PreviousRequestProps;
