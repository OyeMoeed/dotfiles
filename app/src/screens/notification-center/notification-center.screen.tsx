import React, { useState } from 'react';
import { IPaySafeAreaView } from '@app/components/templates';
import { IPayHeader, IPayNoResult } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayCaption1Text, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import IPayNotificationList from '@app/components/organism/ipay-notification-list/ipay-notification-list.component';
import { notifications } from './notification-center.mock';
import icons from '@app/assets/icons';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import IPaySectionHeader from '@app/components/molecules/ipay-section-header/ipay-section-header.component';
import IPayBannerAnimation from '@app/components/molecules/ipay-banner-animation/ipay-banner-animation.component';
import { Alert } from 'react-native';
import { Notification } from './notification-center.interface';
import getNotificationCenterStyles from './notification-center.styles';
import useTheme from '@app/styles/hooks/theme.hook';

const NotificationCenterScreen: React.FC = () => {
  const localization = useLocalization();
  const hasNotifications = notifications.length > 0;
  const [pendingNotifications] = useState<Notification[]>([]);
  const pendingNotificationsCount = pendingNotifications.length;
  const hasPendingRequest = pendingNotificationsCount > 0;
  const unreadNotificationCount = 1;
  const { colors } = useTheme();
  const styles = getNotificationCenterStyles(colors);

  const handleDeleteNotification = (id: string) => {
    Alert.alert(`Delete notification with id: ${id}`);
    // Call your delete API here
  };

  const handleMarkAsRead = (id: string) => {
    Alert.alert(`Mark notification as read with id: ${id}`);
    // Call your mark as read API here
  };

  const NoRequestComponent: React.FC = () => (
    <IPayView style={styles.noRequestContainer}>
      {/* <EmptyBox style={styles.emptyBox} /> */}
      <IPayIcon style={{ marginBottom: 100 }} size={24} icon={icons.empty_box_icon}></IPayIcon>
      <IPayCaption1Text
        style={styles.noRequestText}
        regular={false}
        text={localization.NOTIFICATION_CENTER.ALL_CAUGHT_UP}
      />
      <IPayCaption1Text
        style={styles.noPendingRequestText}
        text={localization.NOTIFICATION_CENTER.NO_PENDING_REQUESTS}
      />
      <IPayPressable onPress={() => navigate(ScreenNames.REQUEST_LISTING_SCREEN)}>
        <IPaySubHeadlineText
          color={colors.primary.primary500}
          regular
          text={localization.NOTIFICATION_CENTER.SHOW_REQUESTS}
        />
      </IPayPressable>
    </IPayView>
  );

  return (
    <IPaySafeAreaView style={styles.safeArea}>
      <IPayHeader title={localization.COMMON.NOTIFICATIONS} backBtn applyFlex />
      <IPayView style={styles.bannerContainer}>
        {hasPendingRequest ? (
          <>
            <IPaySectionHeader
              subText={`( ${pendingNotificationsCount} ${localization.NOTIFICATION_CENTER.PENDING})`}
              leftText={localization.NOTIFICATION_CENTER.REQUESTS}
              rightText={localization.NOTIFICATION_CENTER.VIEW_ALL}
              rightIcon={icons.arrow_right_square}
              showRightIcon={true}
            />
            <IPayBannerAnimation onVerify={() => {}} />
          </>
        ) : (
          <>
            <IPaySectionHeader leftText={localization.NOTIFICATION_CENTER.REQUESTS} />
            <NoRequestComponent />
          </>
        )}
      </IPayView>
      <IPayView style={styles.mainContainer}>
        <IPayView style={styles.headerContainer}>
          <IPaySectionHeader
            subTextColor={colors.primary.primary500}
            showDotBeforeSubtext={true}
            leftText={localization.NOTIFICATION_CENTER.NOTIFICATIONS}
            subText={`${unreadNotificationCount} ${localization.NOTIFICATION_CENTER.UNREAD}`}
            rightText={localization.NOTIFICATION_CENTER.READ_ALL}
          />
          <IPayTabs
            scrollEnabled
            scrollable
            unSelectedTabStyle={styles.unSelectedTabStyle}
            tabs={[
              localization.NOTIFICATION_CENTER.ALL,
              localization.NOTIFICATION_CENTER.GIFTS,
              localization.NOTIFICATION_CENTER.QATTAHS,
              localization.NOTIFICATION_CENTER.OFFERS,
              localization.NOTIFICATION_CENTER.SUGGESTED_FOR_YOU,
            ]}
          />
        </IPayView>
        {hasNotifications ? (
          <IPayView style={styles.notificationListContainer}>
            <IPayNotificationList
              notifications={notifications}
              onDeleteNotification={handleDeleteNotification}
              onMarkAsRead={handleMarkAsRead}
            />
          </IPayView>
        ) : (
          <IPayView style={styles.noResultContainer}>
            <IPayNoResult message={localization.NOTIFICATION_CENTER.NO_NOTIFICATIONS} showEmptyBox />
          </IPayView>
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default NotificationCenterScreen;
