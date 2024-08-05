import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPayFilterBottomSheet, IPayGiftTransactionList } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import GiftStatus from '@app/enums/gift-status.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, FiltersType } from '@app/utilities/enums.util';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useRef, useState } from 'react';
import sendGiftStyles from './send-gift-list.style';

interface Item {
  date: string;
  titleText: string;
  footText: string;
  status: typeof GiftStatus;
  amount: number;
  onPress?: () => void;
}
const SendGiftListScreen: React.FC = ({ isDataAvailable = true }) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = sendGiftStyles(colors);
  const GIFT_TABS = [localizationText.SEND_GIFT.SEND, localizationText.SEND_GIFT.RECEIVED];
  const { sendGiftFilterData, sendGiftFilterDefaultValues, sendGiftBottomFilterData, giftData } = useConstantData();
  const filterRef = useRef<bottomSheetTypes>(null);
  const [filters, setFilters] = useState<Array<string>>([]);

  const [selectedTab, setSelectedTab] = useState<string>(GIFT_TABS[0]);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };
  const handleSubmit = (data: SubmitEvent) => {
    let filtersArray: string[] = [];
    if (Object.keys(data)?.length) {
      const {
        contact_number: contactNumber,
        amount_from: amountFrom,
        amount_to: amountTo,
        date_from: dateFrom,
        date_to: dateTo,
        status,
        occasion,
      } = data;
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

  const sendGiftDetail = (item: Item) => {
    navigate(ScreenNames.GIFT_DETAILS_SCREEN, { details: item });
  };

  const noResultMessage = `
  ${localizationText.SEND_GIFT.YOU_DIDNT} ${selectedTab.toLowerCase()} ${localizationText.SEND_GIFT.ANY_GIFT_YET}
  `;

  const renderItem = ({ item }: { item: Item }) => {
    const { dates, title, occasion, status, amount } = item;
    return (
      <IPayView style={styles.listView}>
        <IPayGiftTransactionList
          date={dates}
          titleText={title}
          footText={occasion}
          status={status}
          amount={amount}
          onPress={() => sendGiftDetail(item)}
        />
      </IPayView>
    );
  };
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
      {!!filters.length && (
        <IPayView style={styles.filterWrapper}>
          <IPayScrollView horizontal showsHorizontalScrollIndicator={false}>
            <>
              {filters?.map((text) => (
                <IPayChip
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
            </>
          </IPayScrollView>
        </IPayView>
      )}
      {isDataAvailable && selectedTab === localizationText.SEND_GIFT.SEND ? (
        <IPayView style={styles.view}>
          <IPayView>
            <IPayFlatlist data={giftData} renderItem={renderItem} style={styles.flexStyle} />
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
          {selectedTab === localizationText.SEND_GIFT.SEND && (
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
