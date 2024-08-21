import React from 'react';
import { IPayFlatlist } from '@app/components/atoms';
import IPayNotificationCard from '@app/components/molecules/ipay-notification-card/ipay-notification-card.component';
import styles from './ipay-notificaiton-list.styles';
import { IPayNotificationListProps } from './ipay-notification-list.interface';
import { Notification } from '@app/screens/notification-center/notification-center.interface';



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
