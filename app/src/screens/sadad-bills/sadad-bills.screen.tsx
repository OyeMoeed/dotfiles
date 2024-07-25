import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { BillsStatusTypes, buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback, useState } from 'react';
import sadadBillsStyles from './sadad-bills.style';

const SadadBills: React.FC = () => {
  const { colors } = useTheme();
  const styles = sadadBillsStyles(colors);
  const localizationText = useLocalization();
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [billsData, setBillsData] = useState<object[]>([]);

  const tabs = [localizationText.SADAD.ACTIVE_BILLS, localizationText.SADAD.INACTIVE_BILLS];

  const onPressAddNew = () => {};
  const handleTabSelect = useCallback(
    (tab: string) => {
      if (tab === BillsStatusTypes.ACTIVE_BILLS) {
        setBillsData([]);
      } else {
        setBillsData([]);
      }
      setSelectedTab(tab);
    },
    [selectedTab],
  );
  return (
    <IPaySafeAreaView>
      <IPayHeader
        backBtn
        applyFlex
        title={localizationText.SADAD.SADAD_BILLS}
        titleStyle={styles.screenTitle}
        rightComponent={
          <IPayButton
            small
            onPress={onPressAddNew}
            btnType={buttonVariants.LINK_BUTTON}
            btnText={localizationText.COMMON.NEW}
            rightIcon={<IPayIcon icon={icons.add_square} size={20} color={colors.primary.primary500} />}
          />
        }
      />
      <IPayView style={styles.container}>
        <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          btnText={localizationText.SADAD.COMPLETE_PAYMENT}
          selectedItemsCount={2}
          // totalAmount={200}
          btnRightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default SadadBills;
