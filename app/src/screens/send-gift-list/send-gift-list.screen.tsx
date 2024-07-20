import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import sendGiftStyles from './send-gift-list.style';

const SendGiftListScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = sendGiftStyles(colors);
  const GIFT_TABS = [localizationText.SEND_GIFT.SEND, localizationText.SEND_GIFT.RECEIVED];

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
    </IPaySafeAreaView>
  );
};

export default SendGiftListScreen;
