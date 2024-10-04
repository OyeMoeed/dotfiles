import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayNoResult, useToastContext } from '@app/components/molecules';
import IPayBannerAnimation from '@app/components/molecules/ipay-banner-animation/ipay-banner-animation.component';
import IPaySectionHeader from '@app/components/molecules/ipay-section-header/ipay-section-header.component';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import IPayNotificationList from '@app/components/organism/ipay-notification-list/ipay-notification-list.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  deleteSingleNotification,
  getAllRetainedMessages,
  readNotification,
} from '@app/network/services/core/notifications/notifications.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setNafathSheetVisibility } from '@app/store/slices/bottom-sheets-slice';
import { isBasicTierSelector } from '@app/store/slices/wallet-info-slice';
import { getAllRecivedRequests } from '@app/network/services/request-management/recevied-requests/recevied-requests.service';
import IPayRequestCard from '@app/components/molecules/ipay-request-card/ipay-request-card.component';
import { formatDate } from '@app/utilities';
import getNotificationCenterStyles from './notification-center.styles';
import { Notification } from './notification-center.interface';

/**
 * NoRequestComponent displays a message when there are no pending requests.
 * @param {Object} props - Component props.
 * @param {Object} props.colors - Colors object.
 * @param {Object} props.styles - Styles object.
 */
const NoRequestComponent: React.FC<{ colors: any; styles: any; pendingRequests: any; previousRequests: any }> = ({
  colors,
  styles,
  pendingRequests,
  previousRequests,
}) => (
  <IPayView style={styles.noRequestContainer}>
    <IPayIcon size={24} icon={icons.empty_box_icon} />
    <IPayCaption1Text style={styles.noRequestText} regular={false} text="NOTIFICATION_CENTER.ALL_CAUGHT_UP" />
    <IPayCaption1Text style={styles.noPendingRequestText} text="NOTIFICATION_CENTER.NO_PENDING_REQUESTS" />
    <IPayPressable
      onPress={() =>
        navigate(ScreenNames.REQUEST_LISTING_SCREEN, {
          pendingRequests,
          previousRequests,
        })
      }
    >
      <IPaySubHeadlineText color={colors.primary.primary500} regular text="NOTIFICATION_CENTER.SHOW_REQUESTS" />
    </IPayPressable>
  </IPayView>
);

/**
 * NotificationCenterScreen
 */
const NotificationCenterScreen: React.FC = () => {
  // hooks
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { showToast } = useToastContext();
  const dispatch = useDispatch();

  // states
  const [notifications, setNotifications] = useState<Notification[]>([] as Notification[]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [previousRequests, setPreviousRequests] = useState<any[]>([]);

  // selectors
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const appData = useTypedSelector((state) => state.appDataReducer.appData);
  const isBasicTier = useTypedSelector(isBasicTierSelector);

  // variables
  const pendingNotificationsCount = pendingRequests.length;
  const hasNotifications = notifications.length > 0;
  const unreadNotificationCount = notifications.filter((notification) => !notification.read).length;
  const notificationSubText =
    unreadNotificationCount > 0 ? `${unreadNotificationCount} ${t('NOTIFICATION_CENTER.UNREAD')}` : undefined;

  const styles = getNotificationCenterStyles(colors);

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        subTitle,
        toastType,
        isShowRightIcon: false,
        containerStyle: styles.toastStyle,
        leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  const getAllRecivedRequest = async () => {
    const payload = {
      walletNumber: walletInfo.walletNumber,
      currentPage: 1,
      pageSize: 20,
    };
    try {
      const apiResponse = await getAllRecivedRequests(payload);

      if (apiResponse?.status?.type === 'SUCCESS') {
        const data = apiResponse?.response?.requests || [];

        console.log('apiResponse', data);

        if (data.length > 0) {
          const pendingRequestsData = data.filter((request) => request.transactionState === 'initiated');
          const previousRequestsData = data.filter((request) => request.transactionState !== 'initiated');
          setPendingRequests(pendingRequestsData);
          setPreviousRequests(previousRequestsData);
        }

        if (apiResponse?.status?.type === 'FAILURE') {
          renderToast(apiResponse?.error);
        }
        if (apiResponse?.status?.type === 'apiResponseNotOk') {
          renderToast({
            title: 'ERROR.API_ERROR_RESPONSE',
            toastType: 'WARNING',
          });
        }
      }
    } catch (error: any) {
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }

    return { data: [], hasMore: false };
  };
  /**
   * Handle delete notification
   * @param id - Notification ID
   */ const handleDeleteNotification = async (id: string) => {
    const payload = {
      walletNumber: walletInfo.walletNumber,
      messageId: id,
    };

    try {
      const apiResponse = await deleteSingleNotification(payload);

      if (apiResponse?.status?.type === 'SUCCESS') {
        // remove the deleted notification from the list
        setNotifications((prevNotifications) =>
          prevNotifications?.filter((notification) => notification.messageId !== id),
        );
        return apiResponse;
      }
      return { apiResponseNotOk: true };
    } catch (error: any) {
      return { error: error.message || 'Unknown error' };
    }
  };

  /**
   * Handle mark all as read
   * @param id - Notification ID
   */
  const handleAllMarkAsRead = async () => {
    const payload = {
      walletNumber: walletInfo.walletNumber,
      apiPayload: {
        deviceInfo: appData.deviceInfo as DeviceInfoProps,
        messageIds: [],
      },
    };

    try {
      const apiResponse = await readNotification(payload);

      if (apiResponse?.status?.type === 'SUCCESS') {
        // mark the notification as read
        setNotifications((prevNotifications) =>
          prevNotifications?.map((notification) => ({ ...notification, read: true })),
        );
        return apiResponse;
      }
      return { apiResponseNotOk: true };
    } catch (error: any) {
      return { error: error.message || 'Unknown error' };
    }
  };

  /**
   * Handle mark as read
   * @param id - Notification ID
   */
  const handleMarkAsRead = async (id: string) => {
    const payload = {
      walletNumber: walletInfo.walletNumber,
      apiPayload: {
        deviceInfo: appData.deviceInfo as DeviceInfoProps,
        messageIds: [id],
      },
    };

    try {
      const apiResponse = await readNotification(payload);

      if (apiResponse?.status?.type === 'SUCCESS') {
        // mark the notification as read
        setNotifications((prevNotifications) =>
          prevNotifications?.map((notification) =>
            notification.messageId === id ? { ...notification, read: true } : notification,
          ),
        );
        return apiResponse;
      }
      return { apiResponseNotOk: true };
    } catch (error: any) {
      return { error: error.message || 'Unknown error' };
    }
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
    const payload = {
      walletNumber: walletInfo.walletNumber,
      pageNumber: page,
      pageSize,
    };
    try {
      const apiResponse = await getAllRetainedMessages(payload);

      switch (apiResponse?.status?.type) {
        case 'SUCCESS': {
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

          return { data: paginatedData, hasMore };
        }

        case 'apiResponseNotOk':
          renderToast({
            title: 'ERROR.API_ERROR_RESPONSE',
            toastType: 'WARNING',
          });
          break;

        case 'FAILURE':
          renderToast(apiResponse?.error);
          break;

        default:
          break;
      }
    } catch (error: any) {
      renderToast(error?.message || 'ERROR.SOMETHING_WENT_WRONG');
    }

    return { data: [], hasMore: false };
  };

  // Fetch notifications on component mount with page 1 and page size 10
  useEffect(() => {
    getNotifications(1, 20);
    getAllRecivedRequest();
  }, []);

  return (
    <IPaySafeAreaView style={styles.safeArea}>
      <IPayHeader title="COMMON.NOTIFICATIONS" backBtn applyFlex />
      <IPayView style={styles.bannerContainer}>
        <IPaySectionHeader
          subText={`( ${pendingNotificationsCount} ${t('NOTIFICATION_CENTER.PENDING')})`}
          leftText="NOTIFICATION_CENTER.REQUESTS"
          rightText={pendingRequests.length > 0 ? 'NOTIFICATION_CENTER.VIEW_ALL' : undefined}
          rightIcon={pendingRequests.length > 0 ? icons.arrow_right_square : undefined}
          onRightOptionPress={() =>
            navigate(ScreenNames.REQUEST_LISTING_SCREEN, {
              pendingRequests,
              previousRequests,
            })
          }
          showRightIcon
        />
        {isBasicTier && (
          <IPayBannerAnimation
            onVerify={() => {
              dispatch(setNafathSheetVisibility(true));
            }}
          />
        )}
        {pendingRequests.length === 0 ? (
          <>
            <IPaySectionHeader leftText="NOTIFICATION_CENTER.REQUESTS" />
            <NoRequestComponent colors={colors} styles={styles} />
          </>
        ) : (
          <IPayRequestCard
            id={pendingRequests[0].transactionId}
            key={pendingRequests[0].transactionId}
            isPending={pendingRequests[0].transactionState === 'initiated'}
            description={`${pendingRequests[0].targetFullName} has requested ${pendingRequests[0].targetAmount} SAR from you `}
            dateTime={formatDate(pendingRequests[0].transactionTime)}
            onPress={() => {}}
          />
        )}
      </IPayView>
      <IPayView style={styles.mainContainer}>
        <IPayView style={styles.headerContainer}>
          <IPaySectionHeader
            subTextColor={colors.primary.primary500}
            showDotBeforeSubtext
            leftText="NOTIFICATION_CENTER.NOTIFICATIONS"
            subText={notificationSubText}
            rightText="NOTIFICATION_CENTER.READ_ALL"
            onRightOptionPress={handleAllMarkAsRead}
          />

          <IPayTabs
            scrollEnabled
            scrollable
            unSelectedTabStyle={styles.unSelectedTabStyle}
            tabs={[
              t('NOTIFICATION_CENTER.ALL'),
              t('NOTIFICATION_CENTER.GIFTS'),
              t('NOTIFICATION_CENTER.QATTAHS'),
              t('NOTIFICATION_CENTER.OFFERS'),
              t('NOTIFICATION_CENTER.SUGGESTED_FOR_YOU'),
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
            <IPayNoResult message="NOTIFICATION_CENTER.NO_NOTIFICATIONS" showEmptyBox />
          </IPayView>
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default NotificationCenterScreen;
