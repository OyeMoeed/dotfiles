import React, { useRef } from 'react';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import icons from '@app/assets/icons';
import { IPayActionSheet } from '@app/components/organism';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatDate } from '@app/utilities/date-helper.util';
import { IPayNotificationCardProps } from './ipay-notification-card.interface';
import getNotificationCardStyles from './ipay-notification-card.styles';

const IPayNotificationCard: React.FC<IPayNotificationCardProps> = ({
  id,
  title,
  message,
  date,
  icon = icons.discount_shape3,
  isRead = false,
  testID,
  onDeleteNotification = () => {},
  onMarkAsRead = () => {},
}) => {
  const formattedDate = formatDate(date);
  const actionSheetRef = useRef<any>(null);
  const { colors } = useTheme();
  const styles = getNotificationCardStyles(colors);

  const handleMorePress = () => {
    actionSheetRef.current.show();
  };

  const handleActionSheetPress = (index: number) => {
    if (!isRead) {
      if (index === 0) {
        onMarkAsRead(id);
      } else if (index === 1) {
        onDeleteNotification(id);
      }
    } else if (index === 0) {
      onDeleteNotification(id);
    }
    actionSheetRef.current.hide();
  };

  const dateColor = isRead ? colors.natural.natural500 : colors.secondary.secondary500;

  const options = isRead
    ? ['NOTIFICATION_CENTER.DELETE_NOTIFICATION', 'COMMON.CANCEL']
    : ['NOTIFICATION_CENTER.MARK_AS_READ', 'NOTIFICATION_CENTER.DELETE_NOTIFICATION', 'COMMON.CANCEL'];

  const cancelButtonIndex = isRead ? 1 : 2;
  const destructiveButtonIndex = isRead ? 0 : 1;

  return (
    <IPayView testID={`${testID}-notifation-card`} style={styles.cardContainer}>
      <IPayView style={styles.row}>
        <IPayView style={styles.iconContainer}>
          <IPayIcon disableStokeColor={isRead} icon={icon} />
          {!isRead && <IPayView style={styles.dot} />}
        </IPayView>
        <IPayView style={styles.textContainer}>
          <IPayFootnoteText color={colors.natural.natural900} style={styles.title} regular={false}>
            {title}
          </IPayFootnoteText>
          <IPayFootnoteText color={colors.natural.natural900} style={styles.message}>
            {message}
          </IPayFootnoteText>
          <IPayCaption2Text color={dateColor}>{formattedDate}</IPayCaption2Text>
        </IPayView>
        <IPayPressable onPress={handleMorePress} style={styles.moreIconContainer}>
          <IPayIcon icon={icons.more_option} size={18} color={colors.natural.natural500} />
        </IPayPressable>
      </IPayView>
      <IPayActionSheet
        ref={actionSheetRef}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={handleActionSheetPress}
      />
    </IPayView>
  );
};

export default IPayNotificationCard;
