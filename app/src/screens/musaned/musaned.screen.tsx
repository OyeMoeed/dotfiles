import icons from '@app/assets/icons';
import { IPayIcon, IPayPaginatedFlatlist, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '@app/components/molecules/ipay-toast/ipay-toast.interface';
import IPayMoneyRequestList from '@app/components/organism/ipay-money-request-list/ipay-money-request-list.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { IPayRequestMoneyProps } from '@app/components/templates/ipay-request-detail/iipay-request-detail.interface';
import { heightMapping } from '@app/components/templates/ipay-request-detail/ipay-request-detail.constant';
import { MoneyRequestStatus } from '@app/enums/money-request-status.enum';
import { getAllRecivedRequests } from '@app/network/services/request-management/recevied-requests/recevied-requests.service';
import { getAllSentRequests } from '@app/network/services/request-management/sent-requests/sent-requests.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { formatDate } from '@app/utilities/date-helper.util';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RequestItem } from '@app/network/services/request-management/recevied-requests/recevied-requests.interface';
import musanedStyle from './musaned.styles';
import { useNavigation } from '@react-navigation/core';
import ScreenNames from '@app/navigation/screen-names.navigation';

const MusanedScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const styles = musanedStyle(colors);
  const [sentRequestsPage, setSentRequestsPage] = useState(1);
  const [receivedRequestsPage, setReceivedRequestsPage] = useState(1);

  const ALINMA_PAY_USERS = 'MUSANED.ALINMA_PAY_USERS';
  const OTHER_USERS = 'MUSANED.OTHER_USERS';
  const MUSANED_USERS_TABS = [ALINMA_PAY_USERS, OTHER_USERS];

  const [selectedTab, setSelectedTab] = useState<string>(MUSANED_USERS_TABS[0]);
  const [requestDetail, setRequestDetail] = useState<IPayRequestMoneyProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);
  const [showDetailSheet, setShowDetailSheet] = useState<boolean>(false);
  const { showToast } = useToastContext();

  // // states
  const [sentRequestsData, setSentRequestsData] = useState([]);
  const [recivedRequestsData, setRecivedRequestsData] = useState([]);
  const dataForPaginatedFLatlist = selectedTab === ALINMA_PAY_USERS ? sentRequestsData : recivedRequestsData;

  // // selectors
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

  /**
   * Get getRequestsData
   * @param page - Page number
   * @param pageSize - Page size
   * @returns Promise with getRequestsData data and hasMore flag
   */
  const getRequestsData = async (
    page: number,
    pageSize: number,
  ): Promise<{ data: Notification[]; hasMore: boolean }> => {
    const payload = {
      walletNumber: walletInfo.walletNumber,
      currentPage: page,
      pageSize,
    };
    try {
      // call getAllRecivedRequests if tab is recevied other wise call getAllSentRequests
      let apiResponse;
      if (selectedTab === ALINMA_PAY_USERS) {
        apiResponse = await getAllSentRequests(payload);
      } else {
        apiResponse = await getAllRecivedRequests(payload);
      }
      switch (apiResponse?.status?.type) {
        case 'SUCCESS': {
          const data = apiResponse?.response?.requests || [];

          const start = (page - 1) * pageSize;
          const end = page * pageSize;
          const paginatedData = data.slice(start, end);
          const hasMore = data.length > end;

          // set data according to the tabs
          if (selectedTab === ALINMA_PAY_USERS) {
            setSentRequestsData(page === 1 ? paginatedData : [...sentRequestsData, ...paginatedData]);
            setSentRequestsPage(page + 1);
          } else {
            setRecivedRequestsData(page === 1 ? paginatedData : [...recivedRequestsData, ...paginatedData]);
            setReceivedRequestsPage(page + 1);
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
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }

    return { data: [], hasMore: false };
  };

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
    if (tab === ALINMA_PAY_USERS) {
      setSentRequestsPage(1);
    } else {
      setReceivedRequestsPage(1);
    }
  };

  const mapTransactionKeys = (item: any) => {
    const baseMapping = {
      id: item.transactionId,
      title: item.targetFullName,
      status: item.transactionState,
      type: selectedTab === ALINMA_PAY_USERS ? 'CR' : 'DR',
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
          ref_number: item.realTransactionRefNumber,
        };
      case MoneyRequestStatus.PENDING:
        return {
          ...baseMapping,
          ref_number: item.realTransactionRefNumber,
        };
      case MoneyRequestStatus.REJECTED:
        return {
          ...baseMapping,
          rejection_date: item.rejection_date,
          ref_number: item.realTransactionRefNumber,
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

  const renderItem = ({ item }: { item: RequestItem }) => {
    const { transactionTime, targetFullName, transactionState, targetAmount } = item;
    return (
      <IPayView style={styles.listView}>
        <IPayMoneyRequestList
          date={formatDate(transactionTime)}
          titleText={targetFullName}
          status={transactionState}
          amount={targetAmount}
          onPress={() => openBottomSheet(item)}
          shouldTranslateTitle={false}
        />
      </IPayView>
    );
  };

  const noResult = () => (
    <IPayView style={styles.noResult}>
      <IPayNoResult
        textColor={colors.primary.primary800}
        iconColor={colors.primary.primary800}
        message="MUSANED.NO_LABORERS"
        showIcon
        containerStyle={styles.noResultContent}
        iconSize={40}
        icon={icons.people}
      />
    </IPayView>
  );

  const onPressHistory = () => {
    navigate(ScreenNames.MUSANED_HISTORY);
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="request-money-header"
        backBtn
        title="MUSANED.HEADER"
        applyFlex
        rightComponent={
          <IPayPressable onPress={onPressHistory}>
            <IPayView style={styles.headerRightContent}>
              <IPayIcon icon={icons.clock_1} size={20} color={colors.primary.primary500} />
              <IPaySubHeadlineText regular color={colors.primary.primary500} text="COMMON.HISTORY" />
            </IPayView>
          </IPayPressable>
        }
      />
      <IPaySegmentedControls
        onSelect={handleSelectedTab}
        selectedTab={selectedTab}
        tabs={MUSANED_USERS_TABS}
        customStyles={styles.tabs}
        unselectedTabStyle={styles.unselectedTab}
      />
      <IPayView style={styles.listContainer}>
        <IPayPaginatedFlatlist
          showsVerticalScrollIndicator={false}
          externalData={dataForPaginatedFLatlist} // Pass externalData for pagination
          keyExtractor={(item: RequestItem, index: number) => `${item?.targetFullName}-${index}`} // Convert the index to a string
          renderItem={renderItem}
          fetchData={(page, pageSize) =>
            getRequestsData(selectedTab === ALINMA_PAY_USERS ? sentRequestsPage : receivedRequestsPage, pageSize)
          } // Pass fetchData for pagination
          pageSize={10} // Optional: Set page size for pagination
          data={dataForPaginatedFLatlist}
          ListEmptyComponent={noResult}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MusanedScreen;
