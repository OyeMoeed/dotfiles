import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayGiftTransactionList } from '@app/components/organism';
import { IPayFilterTransactions, IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { GiftStatus } from '@app/enums/gift-status.enum';
import { TransactionTypes } from '@app/enums/transaction-types.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { ExecuteGiftMockProps } from '@app/network/services/transfers/execute-gift/execute-gift.interface';
import executeGift from '@app/network/services/transfers/execute-gift/execute-gift.service';
import { TransferItem } from '@app/network/services/transfers/wallet-to-wallet-transfers/wallet-to-wallet-transfer.interface';
import getWalletToWalletTransfers from '@app/network/services/transfers/wallet-to-wallet-transfers/wallet-to-wallet-transfers.service';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, buttonVariants } from '@app/utilities/enums.util';
import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useContacts from '@app/hooks/use-contacts';
import sendGiftStyles from './send-gift-list.style';
import FiltersArrayProps from '../transaction-history/transaction-history.interface';

const SendGiftListScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const styles = sendGiftStyles(colors);
  const GIFT_TABS = [t('SEND_GIFT.SENT'), t('SEND_GIFT.RECEIVED')];
  const { sendGiftFilterDefaultValues } = useConstantData();
  const [filterTags, setFilterTags] = useState<Map<any, any>>();
  const [appliedFilters, setAppliedFilters] = useState<FiltersArrayProps | null>(null);

  const [walletTransferData, setWalletTransferData] = useState({});

  const [selectedTab, setSelectedTab] = useState<string>(GIFT_TABS[0]);

  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState<boolean>(false);
  const contacts = useContacts();
  const { showToast } = useToastContext();

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleFiltersShow = () => {
    // filterRef.current?.showFilters();
    setIsFilterSheetVisible(true);
  };

  const applyFilters = (data: any) => {
    // apply filters functionality
  };

  const handleSubmit = (data: any, filterTagsToRender: Map<any, any>) => {
    setFilterTags(filterTagsToRender);
    setAppliedFilters(data);
    applyFilters(data);
  };

  const removeFilter = (filter: string) => {
    const filterTagKeys = filterTags;
    const deletedFilterValues = filterTagKeys?.get(filter);

    filterTagKeys?.delete(filter);

    let updatedFilters = { ...appliedFilters };

    updatedFilters = {
      ...updatedFilters,
      ...deletedFilterValues,
    };

    setAppliedFilters(updatedFilters);
    applyFilters(updatedFilters);
    setFilterTags(filterTagKeys);
  };
  const onPressClose = (text: string) => {
    if (filterTags && filterTags?.size > 0) {
      removeFilter(text);
    }
  };

  const sendGiftNow = () => {
    navigate(ScreenNames.SEND_GIFT_CARD);
  };

  let noResultMessage;

  if (selectedTab === t('SEND_GIFT.RECEIVED')) {
    noResultMessage = `
    ${t('SEND_GIFT.RECIEVE_ANY_GIFT')}
    `;
  } else {
    noResultMessage = `
    ${t('SEND_GIFT.SENT_ANY_GIFT')}
    `;
  }

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: '',
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const executeReceivedGift = async (giftDetails: TransferItem, isSend: boolean, giftCategory: string) => {
    const payload = {
      trxReqType: TransactionTypes.COUT_GIFT,
      trxId: giftDetails?.requestID ?? '',
      deviceInfo: await getDeviceInfo(),
    };
    try {
      const apiResponse: ExecuteGiftMockProps = await executeGift(walletNumber, payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          navigate(ScreenNames.GIFT_DETAILS_SCREEN, { details: giftDetails, isSend, giftCategory });
          break;
        case apiResponse?.apiResponseNotOk:
          renderToast(t('ERROR.API_ERROR_RESPONSE'));
          break;
        default:
          break;
      }
    } catch (error: any) {
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const getWalletToWalletTransferData = async () => {
    try {
      const apiResponse: any = await getWalletToWalletTransfers({
        walletNumber,
      });
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setWalletTransferData(apiResponse?.response?.transferRequestsResult?.groupedCategories);
          break;
        case apiResponse?.apiResponseNotOk:
          renderToast(t('ERROR.API_ERROR_RESPONSE'));
          break;
        default:
          break;
      }
    } catch (error: any) {
      renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
    }
  };

  const sendGiftDetail = (item: TransferItem, isSend: boolean, giftCategory: string) => {
    if (!isSend && item?.status === GiftStatus.INITIATED) {
      executeReceivedGift(item, isSend, giftCategory);
    } else {
      navigate(ScreenNames.GIFT_DETAILS_SCREEN, { details: item, isSend, giftCategory });
    }
  };

  useEffect(() => {
    if (isFocused) {
      getWalletToWalletTransferData();
    }
  }, [isFocused]);

  const giftTypeMapping = {
    eid: t('SEND_GIFT.EIYDIAH'),
    birthday: t('SEND_GIFT.BIRTHDAY'),
    congrat: t('SEND_GIFT.CONGRATULATIONS'),
  };

  const renderItem = ({ item }) => {
    const { trnsDateTime, senderName, receiverName, userNotes, status, amount, receiverMobile, senderMobile } = item;
    const isSend = selectedTab === t('SEND_GIFT.SENT');

    const giftCategory = userNotes.split('#')[1];
    const giftType = giftCategory?.split('_')[0]?.toLowerCase();
    const occasion = giftTypeMapping[giftType as keyof typeof giftTypeMapping];
    const title = isSend ? receiverName || receiverMobile : senderName || senderMobile;

    return (
      <IPayView style={styles.listView}>
        <IPayGiftTransactionList
          date={trnsDateTime}
          titleText={title}
          footText={occasion}
          status={status}
          amount={amount}
          onPress={() => sendGiftDetail(item, isSend, giftCategory)}
          titleWrapper={styles.titleWrapper}
          tab={selectedTab}
        />
      </IPayView>
    );
  };

  const selectedTabData = selectedTab === t('SEND_GIFT.SENT') ? walletTransferData?.SENT : walletTransferData.RECEIVED;

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="send-gift-header"
        backBtn
        title="SEND_GIFT.GIFTS"
        applyFlex
        rightComponent={
          <IPayPressable onPress={handleFiltersShow}>
            <IPayIcon
              icon={filterTags && filterTags.size > 0 ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={filterTags && filterTags.size > 0 ? colors.secondary.secondary500 : colors.primary.primary500}
            />
          </IPayPressable>
        }
      />
      <IPaySegmentedControls
        onSelect={handleSelectedTab}
        selectedTab={selectedTab}
        tabs={GIFT_TABS}
        customStyles={styles.tabs}
        unselectedTabStyle={styles.unselectedTab}
      />
      {filterTags && filterTags?.size > 0 ? (
        <IPayView style={styles.filterWrapper}>
          <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from(filterTags?.keys()).map((key) => (
              <IPayChip
                key={key as string}
                containerStyle={styles.chipContainer}
                headingStyles={styles.chipHeading}
                textValue={key as string}
                icon={
                  <IPayPressable onPress={() => onPressClose(key as string)}>
                    <IPayIcon icon={icons.CLOSE_SQUARE} size={16} color={colors.secondary.secondary500} />
                  </IPayPressable>
                }
              />
            ))}
          </IPayScrollView>
        </IPayView>
      ) : (
        <IPayView />
      )}
      {selectedTabData?.length ? (
        <IPayView style={styles.view}>
          <IPayView style={styles.listWrapper}>
            <IPayFlatlist
              data={selectedTabData}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              style={styles.flexStyle}
            />
          </IPayView>
          <IPayView>
            <IPayButton
              leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} />}
              btnType={buttonVariants.PRIMARY}
              btnText="SEND_GIFT.SEND_NEW_GIFT"
              large
              onPress={sendGiftNow}
              btnStyle={styles.btnStyle}
            />
          </IPayView>
        </IPayView>
      ) : (
        <IPayView style={styles.noResult}>
          <IPayNoResult textColor={colors.primary.primary800} message={noResultMessage} showEmptyBox />
          {selectedTab === t('SEND_GIFT.SENT') && (
            <IPayButton
              btnType={buttonVariants.PRIMARY}
              medium
              btnText="SEND_GIFT.SEND_GIFT_NOW"
              hasRightIcon
              onPress={sendGiftNow}
              btnStyle={styles.sendButton}
              rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
            />
          )}
        </IPayView>
      )}
      {/* <IPayFilterBottomSheet
        heading="TRANSACTION_HISTORY.FILTER"
        defaultValues={sendGiftFilterDefaultValues}
        showAmountFilter
        showDateFilter
        ref={filterRef}
        onSubmit={handleSubmit}
        filters={sendGiftFilterData}
        isBottomDropdowns
        bottomFilters={sendGiftBottomFilterData}
        applySearchOn={[FiltersType.CONTACT_NUMBER]}
      /> */}

      <IPayFilterTransactions
        // ref={filterRef}
        heading="TRANSACTION_HISTORY.FILTER"
        showAmountFilter
        showDateFilter
        showGiftFilters
        contacts={contacts ?? []}
        onSubmit={handleSubmit}
        defaultValues={sendGiftFilterDefaultValues}
        isVisible={isFilterSheetVisible}
        onCloseFilterSheet={() => setIsFilterSheetVisible(false)}
      />
    </IPaySafeAreaView>
  );
};

export default SendGiftListScreen;
