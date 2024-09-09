export interface IPayNotificationCardProps {
  id: string;
  testID?: string;
  title: string;
  message: string;
  date: string;
  icon?: string;
  isRead: boolean;
  onDeleteNotification: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}
