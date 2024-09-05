import React from 'react';
import { IPayPaginatedFlatlist } from '@app/components/atoms';
import IPayNotificationCard from '@app/components/molecules/ipay-notification-card/ipay-notification-card.component';
import { Notification } from '@app/screens/notification-center/notification-center.interface';
import icons from '@app/assets/icons';
import styles from './ipay-notificaiton-list.styles';
import { IPayNotificationListProps } from './ipay-notification-list.interface';

const IPayNotificationList: React.FC<IPayNotificationListProps> = ({
  notifications,
  onDeleteNotification,
  onMarkAsRead,
  fetchData,
}) => {
  const renderItem = ({ item }: { item: Notification }) => (
    <IPayNotificationCard
      id={item.messageId}
      title={item.messageHeader}
      message={item.messageBody}
      date={item.receivedDate}
      icon={item?.read ? icons.ticket_discount : icons.gift}
      isRead={item.read}
      onDeleteNotification={onDeleteNotification}
      onMarkAsRead={onMarkAsRead}
    />
  );

  return (
    <IPayPaginatedFlatlist
      showsVerticalScrollIndicator={false}
      itemSeparatorStyle={styles.separator}
      externalData={notifications} // Pass externalData for pagination
      keyExtractor={(item: Notification) => Number(item.messageId)}
      renderItem={renderItem}
      fetchData={fetchData} // Pass fetchData for pagination
      pageSize={10} // Optional: Set page size for pagination
      data={notifications}
    />
  );
};

export default IPayNotificationList;
