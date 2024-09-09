import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import { useSpinnerContext } from '@app/components/atoms/ipay-spinner/context/ipay-spinner-context';
import { IPayButton, IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayFilterBottomSheet, IPayGiftTransactionList } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { GiftStatus } from '@app/enums/gift-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getWalletToWalletTransfers from '@app/network/services/transfers/wallet-to-wallet-transfers/wallet-to-wallet-transfers.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, FiltersType, buttonVariants, spinnerVariant } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import sendGiftStyles from './send-gift-list.style';

interface Item {
  date: string;
  titleText: string;
  footText: string;
  status: typeof GiftStatus;
  amount: number;
  onPress?: () => void;
}
const SendGiftListScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = sendGiftStyles(colors);
  const GIFT_TABS = [localizationText.SEND_GIFT.SENT, localizationText.SEND_GIFT.RECEIVED];
  const { sendGiftFilterData, sendGiftFilterDefaultValues, sendGiftBottomFilterData, giftData } = useConstantData();
  const filterRef = useRef<bottomSheetTypes>(null);
  const [filters, setFilters] = useState<Array<string>>([]);
  const [walletTransferData, setWalletTransferData] = useState({});
  const [apiError, setAPIError] = useState<string>('');

  const [selectedTab, setSelectedTab] = useState<string>(GIFT_TABS[0]);

  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const { showSpinner, hideSpinner } = useSpinnerContext();
  const { showToast } = useToastContext();

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };
  const handleSubmit = (data: SubmitEvent) => {
    let filtersArray: string[] = [];
    if (Object.keys(data)?.length) {
      const { contactNumber, amountFrom, amountTo, dateFrom, dateTo, status, occasion } = data;
      const amountRange = `${amountFrom} - ${amountTo} ${localizationText.COMMON.SAR}`;
      const dateRange = `${dateFrom} - ${dateTo}`;

      filtersArray = [contactNumber, amountRange, dateRange, status, occasion];
    } else {
      filtersArray = [];
    }

    setFilters(filtersArray);
  };

  const onPressClose = (text: string) => {
    const deletedFilter = filters.filter((value) => value !== text);
    setFilters(deletedFilter);
  };
  const applyFilter = () => {
    filterRef.current?.showFilters();
  };

  const sendGiftNow = () => {
    navigate(ScreenNames.SEND_GIFT_CARD);
  };

  const sendGiftDetail = (item: Item, isSend: boolean) => {
    navigate(ScreenNames.GIFT_DETAILS_SCREEN, { details: item, isSend });
  };

  let noResultMessage;

  if (selectedTab === localizationText.SEND_GIFT.RECEIVED) {
    noResultMessage = `
  ${localizationText.SEND_GIFT.RECIEVE_ANY_GIFT}
  `;
  } else {
    noResultMessage = `
  ${localizationText.SEND_GIFT.SENT_ANY_GIFT}
  `;
  }

  const renderSpinner = useCallback((isVisbile: boolean) => {
    if (isVisbile) {
      showSpinner({
        variant: spinnerVariant.DEFAULT,
        hasBackgroundColor: true,
      });
    } else {
      hideSpinner();
    }
  }, []);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getWalletToWalletTransferData = async () => {
    renderSpinner(true);
    try {
      const apiResponse: any = await getWalletToWalletTransfers({
        walletNumber,
      });
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS:
          setWalletTransferData(apiResponse.data.transferRequestsResult.groupedCategories);
          break;
        case apiResponse?.apiResponseNotOk:
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          setAPIError(apiResponse?.error);
          break;
        default:
          break;
      }
      renderSpinner(false);
    } catch (error: any) {
      renderSpinner(false);
      setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    getWalletToWalletTransferData();
  }, []);

  const renderItem = ({ item }) => {
    const { trnsDateTime, senderName, receiverName, userNotes, status, amount } = item;
    const isSend = selectedTab === localizationText.SEND_GIFT.SEND;
    return (
      <IPayView style={styles.listView}>
        <IPayGiftTransactionList
          date={trnsDateTime}
          titleText={isSend ? receiverName : senderName}
          footText={userNotes}
          status={status}
          amount={amount}
          onPress={() => sendGiftDetail(item, isSend)}
          titleWrapper={styles.titleWrapper}
          tab={selectedTab}
        />
      </IPayView>
    );
  };

  const selectedTabData =
    selectedTab === localizationText.SEND_GIFT.SENT ? walletTransferData?.SENT : walletTransferData.RECEIVED;

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="send-gift-header"
        backBtn
        title={localizationText.SEND_GIFT.GIFTS}
        applyFlex
        rightComponent={
          <IPayPressable onPress={applyFilter}>
            <IPayIcon
              icon={!!filters.length ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={!!filters.length ? colors.secondary.secondary500 : colors.primary.primary500}
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
      {filters?.length ? (
        <IPayView style={styles.filterWrapper}>
          <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters?.map((text) => (
              <IPayChip
                testID="filter-chip"
                key={text}
                containerStyle={styles.chipContainer}
                headingStyles={styles.chipHeading}
                textValue={text}
                icon={
                  <IPayPressable onPress={() => onPressClose(text)}>
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
          <IPayView>
            <IPayFlatlist data={selectedTabData} renderItem={renderItem} style={styles.flexStyle} />
          </IPayView>
          <IPayView>
            <IPayButton
              leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} />}
              btnType="primary"
              btnText={localizationText.SEND_GIFT.SEND_NEW_GIFT}
              large
              onPress={sendGiftNow}
              btnStyle={styles.btnStyle}
            />
          </IPayView>
        </IPayView>
      ) : (
        <IPayView style={styles.noResult}>
          <IPayNoResult textColor={colors.primary.primary800} message={noResultMessage} showEmptyBox />
          {selectedTab === localizationText.SEND_GIFT.SENT && (
            <IPayButton
              btnType={buttonVariants.PRIMARY}
              medium
              btnText={localizationText.SEND_GIFT.SEND_GIFT_NOW}
              hasRightIcon
              onPress={sendGiftNow}
              btnStyle={styles.sendButton}
              rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
            />
          )}
        </IPayView>
      )}
      <IPayFilterBottomSheet
        heading={localizationText.TRANSACTION_HISTORY.FILTER}
        defaultValues={sendGiftFilterDefaultValues}
        showAmountFilter
        showDateFilter
        ref={filterRef}
        onSubmit={handleSubmit}
        filters={sendGiftFilterData}
        isBottomDropdowns
        bottomFilters={sendGiftBottomFilterData}
        applySearchOn={[FiltersType.CONTACT_NUMBER]}
      />
    </IPaySafeAreaView>
  );
};

export default SendGiftListScreen;
