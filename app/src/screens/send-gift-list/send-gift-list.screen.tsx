import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import { IPayGiftTransactionList } from '@app/components/organism';
import GiftStatus from '@app/enums/gift-status.enum';
import useConstantData from '@app/constants/use-constants';
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
  const { giftData } = useConstantData();

  const [selectedTab, setSelectedTab] = useState<string>(GIFT_TABS[0]);
  const [isFilterApply, setIsFilterApply] = useState<boolean>(false);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const applyFilter = () => {
    setIsFilterApply(!isFilterApply);
  };

  const noResultMessage = `
  ${localizationText.SEND_GIFT.YOU_DIDNT} ${selectedTab.toLowerCase()} ${localizationText.SEND_GIFT.ANY_GIFT_YET}
  `;

  const renderItem = ({ item }: { item: Item }) => {
    const { dates, title, occasion, status, amount } = item;
    return (
      <IPayView style={styles.listView}>
        <IPayGiftTransactionList date={dates} titleText={title} footText={occasion} status={status} amount={amount} />
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
              icon={isFilterApply ? icons.filter_edit_purple : icons.filter}
              size={20}
              color={isFilterApply ? colors.secondary.secondary500 : colors.primary.primary500}
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
              btnStyle={styles.sendButton}
              rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
            />
          )}
        </IPayView>
      )}
    </IPaySafeAreaView>
  );
};

export default SendGiftListScreen;
