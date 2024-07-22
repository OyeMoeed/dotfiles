import icons from '@app/assets/icons';
import { IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useState } from 'react';
import requestMoneyStyles from './request-money-transaction.style';

const RequestMoneyTransactionScreen: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = requestMoneyStyles(colors);
  const {
    REQUEST_MONEY: { REQUEST_MONEY, SEND_REQUESTS, RECEIVED_REQUESTS, YOU_HAVE_NO, MONEY_REQUESTS, CREATE_REQUEST },
  } = localizationText;
  const SEND_REQUESTS_TABS = [SEND_REQUESTS, RECEIVED_REQUESTS];

  const [selectedTab, setSelectedTab] = useState<string>(SEND_REQUESTS_TABS[0]);
  const [isFilterApply, setIsFilterApply] = useState<boolean>(false);

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  };

  const applyFilter = () => {
    setIsFilterApply(!isFilterApply);
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader
        testID="request-money-header"
        backBtn
        title={REQUEST_MONEY}
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
        tabs={SEND_REQUESTS_TABS}
        customStyles={styles.tabs}
        unselectedTabStyle={styles.unselectedTab}
      />

      <IPayView style={styles.noResult}>
        <IPayNoResult
          textColor={colors.primary.primary800}
          iconColor={colors.primary.primary800}
          message={`${YOU_HAVE_NO} ${selectedTab.split(' ')[0].toLowerCase()} ${MONEY_REQUESTS}`}
          showIcon
          containerStyle={styles.noResultContent}
          iconSize={40}
          icon={icons.money_time}
        />
        {selectedTab === SEND_REQUESTS && (
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            medium
            btnText={CREATE_REQUEST}
            btnStyle={styles.requestButton}
            leftIcon={<IPayIcon icon={icons.add_square} color={colors.natural.natural0} />}
          />
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default RequestMoneyTransactionScreen;
