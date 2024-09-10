import React, { useEffect, useState } from 'react';
import { IPaySafeAreaView } from '@app/components/templates';
import { IPayHeader, IPayNoResult } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayCaption1Text, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import IPayNotificationList from '@app/components/organism/ipay-notification-list/ipay-notification-list.component';
import icons from '@app/assets/icons';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import IPaySectionHeader from '@app/components/molecules/ipay-section-header/ipay-section-header.component';
import IPayBannerAnimation from '@app/components/molecules/ipay-banner-animation/ipay-banner-animation.component';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedSelector } from '@app/store/store';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { spinnerVariant } from '@app/utilities/enums.util';
import {
  deleteSingleNotification,
  getAllRetainedMessages,
  readSingleNotification,
} from '@app/network/services/core/notifications/notifications.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { Notification } from './notification-center.interface';
import getNotificationCenterStyles from './notification-center.styles';

/**
 * NoRequestComponent displays a message when there are no pending requests.
 * @param {Object} props - Component props.
 * @param {Object} props.localization - Localization object.
 * @param {Object} props.colors - Colors object.
 * @param {Object} props.styles - Styles object.
 */
const NoRequestComponent: React.FC<{ localization: any; colors: any; styles: any }> = ({
  localization,
  colors,
  styles,
}) => (
  <IPayView style={styles.noRequestContainer}>
    <IPayIcon size={24} icon={icons.empty_box_icon} />
    <IPayCaption1Text
      style={styles.noRequestText}
      regular={false}
      text={localization.NOTIFICATION_CENTER.ALL_CAUGHT_UP}
    />
    <IPayCaption1Text style={styles.noPendingRequestText} text={localization.NOTIFICATION_CENTER.NO_PENDING_REQUESTS} />
    <IPayPressable onPress={() => navigate(ScreenNames.REQUEST_LISTING_SCREEN)}>
      <IPaySubHeadlineText
        color={colors.primary.primary500}
        regular
        text={localization.NOTIFICATION_CENTER.SHOW_REQUESTS}
      />
    </IPayPressable>
  </IPayView>
);

/**
 * NotificationCenterScreen
 */
const NotificationCenterScreen: React.FC = () => {
  // hooks
  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { showToast } = useToastContext();
  const localization = useLocalization();
  const { colors } = useTheme();

  // states
  const [notifications, setNotifications] = useState<Notification[]>([] as Notification[]);
  const [pendingNotifications] = useState<Notification[]>([]);

  // selectors
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  // variables
  const pendingNotificationsCount = pendingNotifications.length;
  const hasPendingRequest = pendingNotificationsCount > 0;
  const hasNotifications = notifications.length > 0;
  const unreadNotificationCount = 1;

  const styles = getNotificationCenterStyles(colors);

  /**
   * Render spinner
   * @param isVisible - Boolean to show or hide spinner
   */ const renderSpinner = (isVisible: boolean) => {
    if (isVisible) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  };

  /**
   * Handle delete notification
   * @param id - Notification ID
   */
  const handleDeleteNotification = async (id: string) => {
    renderSpinner(true);
    const payload = {
      walletNumber: walletInfo.walletNumber,
      messageId: id,
    };

    const apiResponse = await deleteSingleNotification(payload);

    if (apiResponse) {
      setNotifications((prevNotifications) =>
        prevNotifications?.filter((notification) => notification.messageId !== id),
      );
    }

    renderSpinner(false);
    return apiResponse;
  };

  /**
   * Handle mark as read
   * @param id - Notification ID
   */
  const handleMarkAsRead = async (id: string) => {
    renderSpinner(true);
    const payload = {
      walletNumber: walletInfo.walletNumber,
      apiPayload: {
        deviceInfo: appData.deviceInfo as DeviceInfoProps,
        messageIds: [id],
      },
    };

    const apiResponse = await readSingleNotification(payload);

    if (apiResponse?.status?.type === 'SUCCESS') {
      renderSpinner(false);
      // mark the notification as read
      setNotifications((prevNotifications) =>
        prevNotifications?.map((notification) =>
          notification.messageId === id ? { ...notification, read: true } : notification,
        ),
      );
      return apiResponse;
    }
    renderSpinner(false);
    return null;
  };

  /**
   * Get notifications
   * @param page - Page number
   * @param pageSize - Page size
   * @returns Promise with notifications data and hasMore flag
   */
  const getNotifications = async (
    page: number,
    pageSize: number,
  ): Promise<{ data: Notification[]; hasMore: boolean }> => {
    renderSpinner(true);
    const payload = {
      walletNumber: walletInfo.walletNumber,
      currentPage: page,
      pageSize,
    };

    const apiResponse: any = await getAllRetainedMessages(payload);

    if (apiResponse?.status?.type === 'SUCCESS') {
      const newNotifications = apiResponse?.response?.retainedMessages || [];
      const start = (page - 1) * pageSize;
      const end = page * pageSize;
      const paginatedData = newNotifications.slice(start, end);
      const hasMore = newNotifications.length > end;

      if (page === 1) {
        setNotifications(paginatedData);
      } else {
        setNotifications((prevNotifications) => [...(prevNotifications || []), ...paginatedData]);
      }

      renderSpinner(false);
      return { data: paginatedData, hasMore };
    }

    renderSpinner(false);
    return { data: [], hasMore: false };
  };

  // Fetch notifications on component mount with page 1 and page size 10
  useEffect(() => {
    getNotifications(1, 10);
  }, []);

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
              showRightIcon
            />
            <IPayBannerAnimation onVerify={() => {}} />
          </>
        ) : (
          <>
            <IPaySectionHeader leftText={localization.NOTIFICATION_CENTER.REQUESTS} />
            <NoRequestComponent localization={localization} colors={colors} styles={styles} />
          </>
        )}
      </IPayView>
      <IPayView style={styles.mainContainer}>
        <IPayView style={styles.headerContainer}>
          <IPaySectionHeader
            subTextColor={colors.primary.primary500}
            showDotBeforeSubtext
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
              onDeleteNotification={(id) => handleDeleteNotification(id)}
              onMarkAsRead={(id) => handleMarkAsRead(id)}
              fetchData={getNotifications}
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
