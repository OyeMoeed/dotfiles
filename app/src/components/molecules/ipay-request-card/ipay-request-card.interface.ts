export type StatusType = 'paid' | 'executed' | 'cancelled' | 'rejected';

export interface PendingRequestProps {
  id?: string;
  isPending: true;
  description: string;
  dateTime: string;
  onPress: () => void;
  status?: StatusType;
}

export interface PreviousRequestProps {
  id?: string;
  isPending?: Boolean;
  status?: StatusType;
  description: string;
  dateTime: string;
  onPress?: () => void;
}

export type IPayRequestCardProps = PendingRequestProps | PreviousRequestProps;
