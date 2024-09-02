import { Notification } from '@app/screens/notification-center/notification-center.interface';

export interface IPayNotificationListProps {
  notifications: Notification[];
  onDeleteNotification: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  fetchData: (page: number, pageSize: number) => Promise<{ data: Notification[]; hasMore: boolean }>;
}
