import React, { useRef } from 'react';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import icons from '@app/assets/icons';
import styles from './ipay-notification-card.styles';
import { IPayActionSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayNotificationCardProps } from './ipay-notification-card.interface';



const IPayNotificationCard: React.FC<IPayNotificationCardProps> = ({
  id,
  title,
  message,
  date,
  icon = icons.discount_shape3,
  isRead = false,
  testID,
  onDeleteNotification = ()=>{},
  onMarkAsRead = ()=>{},
}) => {
  const actionSheetRef =  useRef<any>(null);
  const localization = useLocalization()

  const handleMorePress = () => {
    actionSheetRef.current.show();
  };

  const handleActionSheetPress = (index: number) => {
    if (index === 0) {
      onMarkAsRead(id);
    } else if (index === 1) {
      onDeleteNotification(id);
    }
    actionSheetRef.current.hide();
  };

  const dateColor = isRead ? colors.natural.natural500 : colors.secondary.secondary500;

  return (
    <IPayView testID={`${testID}-notifation-card`} style={styles.cardContainer}>
      <IPayView style={styles.row}>
        <IPayView style={styles.iconContainer}>
          <IPayIcon icon={icon} />
          {!isRead && <IPayView style={styles.dot} />}
        </IPayView>
        <IPayView style={styles.textContainer}>
          <IPayFootnoteText color={colors.natural.natural900} style={styles.title} regular={false}>
            {title}
          </IPayFootnoteText>
          <IPayFootnoteText color={colors.natural.natural900} style={styles.message}>
            {message}
          </IPayFootnoteText>
          <IPayCaption2Text color={dateColor}>{date}</IPayCaption2Text>
        </IPayView>
        <IPayPressable onPress={handleMorePress} style={styles.moreIconContainer}>
          <IPayIcon icon={icons.more_option} size={18} color={colors.natural.natural500} />
        </IPayPressable>
      </IPayView>
      <IPayActionSheet
        ref={actionSheetRef}
        options={[localization.NOTIFICATION_CENTER.MARK_AS_READ, localization.NOTIFICATION_CENTER.DELETE_NOTIFICATION, localization.COMMON.CANCEL]}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={handleActionSheetPress}
      />
    </IPayView>
  );
};

export default IPayNotificationCard;