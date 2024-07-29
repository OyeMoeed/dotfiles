import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult, SadadFooterComponent } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySadadBill } from '@app/components/organism';
import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import { ACTIVE_SADAD_BILLS, INACTIVEACTIVE_SADAD_BILLS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { BillsStatusTypes, buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import sadadBillsStyles from './sadad-bills.style';

const SadadBillsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sadadBillsStyles();
  const localizationText = useLocalization();
  const [selectedTab, setSelectedTab] = useState<string>(BillsStatusTypes.ACTIVE_BILLS);
  const [billsData, setBillsData] = useState<BillDetailsProps[]>([]);
  const tabs = [localizationText.SADAD.ACTIVE_BILLS, localizationText.SADAD.INACTIVE_BILLS];
  const selectedBillsCount = useMemo(
    () => billsData.filter((bill) => bill.selected).length,
    [billsData, ACTIVE_SADAD_BILLS],
  );

  const onPressAddNew = () => {};

  const handleTabSelect = useCallback(
    (tab: string) => {
      if (tab === BillsStatusTypes.ACTIVE_BILLS) {
        setBillsData(ACTIVE_SADAD_BILLS);
      } else {
        setBillsData(INACTIVEACTIVE_SADAD_BILLS);
      }
      setSelectedTab(tab);
    },
    [selectedTab, ACTIVE_SADAD_BILLS],
  );

  useEffect(() => {
    handleTabSelect(selectedTab);
  }, []);

  const onSelectBill = (billId: string | number) => {
    const updatedBills = billsData.map((bill) => (bill.id === billId ? { ...bill, selected: !bill.selected } : bill));
    setBillsData(updatedBills);
  };

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
      {billsData.length > 0 ? (
        <IPayView style={styles.container}>
          <IPayTabs customStyles={styles.tabWrapper} tabs={tabs} onSelect={handleTabSelect} />
          <IPayView style={styles.listView}>
            <IPayFlatlist
              testID="ipay-flatlist"
              data={billsData}
              keyExtractor={(_, index) => index.toString()}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <IPayView>
                  <IPaySadadBill
                    billDetails={item}
                    onSelectBill={onSelectBill}
                    showCheckBox={selectedTab === BillsStatusTypes.ACTIVE_BILLS}
                  />
                  {index === billsData.length - 1 && selectedBillsCount > 0 && (
                    <IPayView style={styles.listBottomView} />
                  )}
                </IPayView>
              )}
            />
          </IPayView>
          {selectedBillsCount > 0 && (
            <IPayView style={styles.footerView}>
              <SadadFooterComponent
                btnText={localizationText.SADAD.COMPLETE_PAYMENT}
                selectedItemsCount={selectedBillsCount}
                btnRightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.natural.natural0} />}
              />
            </IPayView>
          )}
        </IPayView>
      ) : (
        <IPayView style={styles.noResultView}>
          <IPayNoResult
            showIcon
            icon={icons.note_remove}
            iconColor={colors.primary.primary800}
            iconSize={40}
            iconViewStyles={styles.noResultIconView}
            message={localizationText.SADAD.NO_ACTIVE_BILLS}
          />
          <IPayButton
            medium
            btnType={buttonVariants.PRIMARY}
            btnText={localizationText.SADAD.ADD_NEW_BILL}
            btnStyle={styles.addNewBillBtn}
            leftIcon={<IPayIcon icon={icons.add_square} size={18} color={colors.natural.natural0} />}
          />
        </IPayView>
      )}
    </IPaySafeAreaView>
  );
};

export default SadadBillsScreen;
