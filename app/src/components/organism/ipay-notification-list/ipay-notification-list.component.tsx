import React from 'react';
import { IPayFlatlist } from '@app/components/atoms';
import { Notification } from '@app/screens/notification-center/notification-center.mock';
import IPayNotificationCard from '@app/components/molecules/ipay-notification-card/ipay-notification-card.component';
import styles from './ipay-notificaiton-list.styles';

interface IPayNotificationListProps {
  notifications: Notification[];
  onDeleteNotification: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

const IPayNotificationList: React.FC<IPayNotificationListProps> = ({
  notifications,
  onDeleteNotification,
  onMarkAsRead,
}) => {
  const renderItem = ({ item }: { item: Notification }) => (
    <IPayNotificationCard
      id={item.id}
      title={item.discountMessage}
      message={item.transferMessage}
      date={item.date}
      icon={item.icon}
      isRead={item.isRead}
      onDeleteNotification={onDeleteNotification}
      onMarkAsRead={onMarkAsRead}
    />
  );

  return (
    <IPayFlatlist
      showsVerticalScrollIndicator={false}
      itemSeparatorStyle={styles.separator}
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default IPayNotificationList;
