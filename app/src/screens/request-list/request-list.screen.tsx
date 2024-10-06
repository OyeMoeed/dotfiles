import React, { useState, useRef } from 'react';
import { IPaySafeAreaView } from '@app/components/templates';
import { IPayHeader, useToastContext } from '@app/components/molecules';
import { IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import SectionHeader from '@app/components/molecules/ipay-section-header/ipay-section-header.component';
import colors from '@app/styles/colors.const';
import IPayRequestCard from '@app/components/molecules/ipay-request-card/ipay-request-card.component';
import icons from '@app/assets/icons';
import { ApiResponseStatusType, FiltersType, ToastTypes } from '@app/utilities/enums.util';
import { IPayActionSheet, IPayFilterBottomSheet } from '@app/components/organism';
import SelectedFilters from '@app/components/molecules/ipay-selected-filters-list/ipay-selected-filters-list.component';
import useConstantData from '@app/constants/use-constants';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/core';
import cancelRejectRequestService from '@app/network/services/request-management/cancel-reject-request/cancel-reject-request.service';
import UpdateRequestTypes from '@app/network/services/request-management/update-request.types';
import { useTypedSelector } from '@app/store/store';
import { formatDate } from '@app/utilities';
import { isAndroidOS } from '@app/utilities/constants';
import { IPayRequestMoneyProps } from '@app/components/templates/ipay-request-detail/iipay-request-detail.interface';
import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import { RequestItem } from '@app/network/services/request-management/recevied-requests/recevied-requests.interface';
import { heightMapping } from '@app/components/templates/ipay-request-detail/ipay-request-detail.constant';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayRequestDetails from '@app/components/templates/ipay-request-detail/ipay-request-detail.component';
import styles from './request-list.styles';

const RequestListScreen: React.FC = () => {
  // hooks
  const filterSheetRef = useRef<bottomSheetTypes>(null);
  const { showToast } = useToastContext();
  const constants = useConstantData();
  const { t } = useTranslation();
  const route = useRoute<any>();

  // refs
  const rejectRequestRef = React.createRef<bottomSheetTypes>();

  // states
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);
  const [requestDetail, setRequestDetail] = useState<IPayRequestMoneyProps | null>(null);
  const [showDetailSheet, setShowDetailSheet] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);

  // params
  const { previousRequests } = route.params;
  const [pendingRequests, setPendingRequests] = useState(route.params.pendingRequests);

  // selectors
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  // /**
  //  * Render toast message
  //  * @param title - Title of the toast
  //  * @param subTitle - Subtitle of the toast
  //  * @param icon - Icon to display in the toast
  //  * @param toastType - Type of the toast
  //  * @param displayTime - Duration to display the toast
  //  */
  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        subTitle,
        toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.trash} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  // functions
  const onCallCancelOrRejectRequest = async (UpdateRequestType: UpdateRequestTypes) => {
    setShowDetailSheet(false);
    try {
      rejectRequestRef.current?.hide();

      const apiResponse = await cancelRejectRequestService(
        walletInfo.walletNumber,
        requestDetail?.id,
        UpdateRequestType,
      );

      if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
        renderToast({
          title: 'NOTIFICATION_CENTER.REQUEST_REJECTED',
          toastType: ToastTypes.SUCCESS,
        });
        // remove the request from the pending list
        const updatedRequests = pendingRequests.filter((request: any) => request.transactionId !== requestDetail?.id);
        // update the state
        setPendingRequests(updatedRequests);
      }
    } catch (error: any) {
      throw new Error(`Error: ${error}`);
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

  const openFilters = () => {
    filterSheetRef.current?.showFilters();
  };

  const handleFilterSubmit = (data: any) => {
    setFilters(Object.values(data).filter((value) => value) as string[]);
  };

  const onRemoveFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  return (
    <IPaySafeAreaView style={styles.safeArea}>
      <IPayHeader
        title="NOTIFICATION_CENTER.REQUESTS"
        backBtn
        applyFlex
        rightComponent={
          <IPayPressable onPress={openFilters}>
            <IPayIcon
              icon={filters.length ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={filters.length ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />
      {filters.length > 0 ? <SelectedFilters filters={filters} onRemoveFilter={onRemoveFilter} /> : <IPayView />}

      <IPayScrollView contentContainerStyle={styles.scrollViewContent}>
        <>
          <IPayView style={styles.sectionContainer}>
            <SectionHeader
              containerStyle={styles.sectionHeader}
              leftTextColor={colors.warning.warning500}
              isLeftTextRegular
              leftText={`${pendingRequests.length} ${t('NOTIFICATION_CENTER.PENDING_REQUESTS')}`}
            />
            {pendingRequests.map((request) => (
              <IPayRequestCard
                id={request.transactionId}
                key={request.transactionId}
                isPending={request.transactionState === 'initiated'}
                description={`${request.targetFullName} has requested ${request.targetAmount} SAR from you `}
                dateTime={formatDate(request.transactionTime)}
                onPress={() => openBottomSheet(request)}
              />
            ))}
          </IPayView>
          <IPayView style={styles.sectionContainer}>
            <SectionHeader
              containerStyle={styles.sectionHeader}
              leftTextColor={colors.natural.natural500}
              isLeftTextRegular
              leftText="NOTIFICATION_CENTER.PREVIOUS_REQUESTS"
            />
            {previousRequests.map((request) => (
              <IPayRequestCard
                id={request.transactionId}
                key={request.transactionId}
                isPending={request.transactionState === 'initiated'}
                description={`${request.targetFullName} has requested ${request.targetAmount} SAR from you `}
                dateTime={formatDate(request.transactionTime)}
                status={request.transactionState!}
              />
            ))}
          </IPayView>
        </>
      </IPayScrollView>
      <IPayActionSheet
        ref={rejectRequestRef}
        testID="reject-card-action-sheet"
        options={[t('COMMON.CANCEL'), t('REQUEST_MONEY.REJECT_THIS_REQUEST')]}
        cancelButtonIndex={0}
        destructiveButtonIndex={1}
        showCancel
        buttonStyle={styles.rejectThisRequestBtn}
        cancelButtonStyle={styles.rejectThisRequestCancelBtn}
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
      <IPayFilterBottomSheet
        ref={filterSheetRef}
        onSubmit={handleFilterSubmit}
        testID="filterBottomSheet"
        showAmountFilter
        showDateFilter
        filters={constants.notificationRequestFilters}
        defaultValues={{
          [FiltersType.BENEFICIARY_NAME]: '',
          [FiltersType.STATUS]: '',
          [FiltersType.AMOUNT_FROM]: '',
          [FiltersType.AMOUNT_TO]: '',
          [FiltersType.DATE_FROM]: '',
          [FiltersType.DATE_TO]: '',
        }}
        heading="NOTIFICATION_CENTER.FILTER"
      />
    </IPaySafeAreaView>
  );
};

export default RequestListScreen;
