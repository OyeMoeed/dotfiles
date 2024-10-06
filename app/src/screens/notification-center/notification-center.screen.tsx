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
import { IPayActionSheet } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayRequestDetails from '@app/components/templates/ipay-request-detail/ipay-request-detail.component';
import { heightMapping } from '@app/components/templates/ipay-request-detail/ipay-request-detail.constant';
import {
  GetAllRequestsMockProps,
  RequestItem,
} from '@app/network/services/request-management/recevied-requests/recevied-requests.interface';
import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import UpdateRequestTypes from '@app/network/services/request-management/update-request.types';
import cancelRejectRequestService from '@app/network/services/request-management/cancel-reject-request/cancel-reject-request.service';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { isAndroidOS } from '@app/utilities/constants';
import { IPayRequestMoneyProps } from '@app/components/templates/ipay-request-detail/iipay-request-detail.interface';
import getNotificationCenterStyles from './notification-center.styles';
import { ApiResponse, Notification } from './notification-center.interface';

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

    const apiResponse = (await getAllRecivedRequests(payload)) as GetAllRequestsMockProps;

    if (apiResponse?.status?.type === 'SUCCESS') {
      const data = apiResponse?.response?.requests || [];

      if (data.length > 0) {
        const pendingRequestsData = data.filter((request) => request.transactionState === 'initiated');
        const previousRequestsData = data.filter((request) => request.transactionState !== 'initiated');
        setPendingRequests(pendingRequestsData);
        setPreviousRequests(previousRequestsData);
      }
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

    const apiResponse = await deleteSingleNotification(payload);

    if (apiResponse?.status?.type === 'SUCCESS') {
      // remove the deleted notification from the list
      setNotifications((prevNotifications) =>
        prevNotifications?.filter((notification) => notification.messageId !== id),
      );
      return apiResponse;
    }
    return { apiResponseNotOk: true };
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

  const rejectRequestRef = React.createRef<bottomSheetTypes>();

  // states
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);
  const [requestDetail, setRequestDetail] = useState<IPayRequestMoneyProps | null>(null);
  const [showDetailSheet, setShowDetailSheet] = useState<boolean>(false);

  // functions
  const onCallCancelOrRejectRequest = async (UpdateRequestType: UpdateRequestTypes) => {
    setShowDetailSheet(false);

    rejectRequestRef.current?.hide();

    const apiResponse: ApiResponse = await cancelRejectRequestService(
      walletInfo.walletNumber,
      requestDetail?.id,
      UpdateRequestType,
    );
    if (apiResponse?.status?.type === 'SUCCESS') {
      renderToast({
        title: 'NOTIFICATION_CENTER.REQUEST_REJECTED',
        toastType: 'SUCCESS',
      });
      getAllRecivedRequest();
    }
  };

  const onPressRejectActionSheet = async () => {
    onCallCancelOrRejectRequest(UpdateRequestTypes.reject);
  };

  const closeRequestDetailsBottomSheet = () => {
    setShowDetailSheet(false);
  };

  // function to open reject action sheet
  const showRejectActionSheet = () => {
    rejectRequestRef.current?.show();
  };

  const mapTransactionKeys = (item: any) => {
    const baseMapping = {
      id: item.transactionId,
      title: item.targetFullName,
      status: item.transactionState,
      type: 'DR',
      receiver_mobile_number: item.targetMobileNumber,
      amount: item.targetAmount,
      note: item.transactionDescription,
      send_date: item.transactionTime,
      request_date: item.transactionTime,
    };

    switch (item.transactionState) {
      case MoneyRequestStatus.CANCEL:
        return {
          ...baseMapping,
          cancellation_date: item.cancellation_date,
        };
      case MoneyRequestStatus.PAID:
        return {
          ...baseMapping,
          payment_date: item.payment_date,
          ref_number: item.transactionId,
        };
      case MoneyRequestStatus.PENDING:
        return {
          ...baseMapping,
          ref_number: item.transactionId,
        };
      case MoneyRequestStatus.REJECTED:
        return {
          ...baseMapping,
          rejection_date: item.rejection_date,
          ref_number: item.transactionId,
        };
      default:
        return baseMapping;
    }
  };
  const openBottomSheet = (item: RequestItem) => {
    const calculatedSnapPoint = [heightMapping[item.transactionState], isAndroidOS ? '95%' : '100%'];
    setSnapPoint(calculatedSnapPoint);

    // Map the item keys
    const mappedItem = mapTransactionKeys(item);

    setRequestDetail(mappedItem);
    setShowDetailSheet(true);
  };

  const renderContent = () => {
    if (isBasicTier) {
      return (
        <IPayBannerAnimation
          onVerify={() => {
            dispatch(setNafathSheetVisibility(true));
          }}
        />
      );
    }

    if (pendingRequests.length === 0) {
      return (
        <>
          <IPaySectionHeader leftText="NOTIFICATION_CENTER.REQUESTS" />
          <NoRequestComponent
            colors={colors}
            styles={styles}
            pendingRequests={pendingRequests}
            previousRequests={previousRequests}
          />
        </>
      );
    }

    return (
      <IPayRequestCard
        id={pendingRequests[0].transactionId}
        key={pendingRequests[0].transactionId}
        isPending={pendingRequests[0].transactionState === 'initiated'}
        description={`${pendingRequests[0].targetFullName} ${t('NOTIFICATION_CENTER.HAS_REQUESTED')} ${pendingRequests[0].targetAmount} ${t('NOTIFICATION_CENTER.SAR_FROM_YOU')} `}
        dateTime={formatDate(pendingRequests[0].transactionTime)}
        onPress={() => openBottomSheet(pendingRequests[0])}
        status={pendingRequests[0].transactionState}
      />
    );
  };

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
        {renderContent()}
      </IPayView>
      <IPayActionSheet
        ref={rejectRequestRef}
        testID="reject-card-action-sheet"
        options={['COMMON.CANCEL', 'REQUEST_MONEY.REJECT_THIS_REQUEST']}
        cancelButtonIndex={0}
        destructiveButtonIndex={1}
        showCancel
        onPress={onPressRejectActionSheet}
      />
      <IPayPortalBottomSheet
        heading="REQUEST_MONEY.REQUEST_DETAILS"
        simpleHeader
        simpleBar
        cancelBnt
        bold
        customSnapPoint={snapPoint}
        onCloseBottomSheet={closeRequestDetailsBottomSheet}
        isVisible={showDetailSheet}
      >
        <IPayRequestDetails
          transaction={requestDetail}
          onCloseBottomSheet={closeRequestDetailsBottomSheet}
          showRejectActionSheet={showRejectActionSheet}
        />
      </IPayPortalBottomSheet>
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
