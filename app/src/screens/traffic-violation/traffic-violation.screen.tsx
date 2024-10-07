import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult, SadadFooterComponent } from '@app/components/molecules';
import IPayTrafficViolationCard from '@app/components/organism/ipay-traffic-violation-card/ipay-traffic-violation-card.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useTrafficViolation from './traffic-violation.hook';
import trafficViolationStyles from './traffic-violation.style';

const TrafficViolationScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = trafficViolationStyles();
  const { t } = useTranslation();
  const {
    billsData,
    selectedBillsCount,
    onSelectBill,
    selectAllBills,
    deselectAllBills,
    selectedBillsAmount,
    handlePayButton,
    handleInquire,
  } = useTrafficViolation();

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title="TRAFFIC_VIOLATION.TITLE" titleStyle={styles.screenTitle} />
      <IPayView style={styles.rowStyles}>
        <IPayFootnoteText
          color={colors.primary.primary900}
          regular={false}
          text="TRAFFIC_VIOLATION.MY_TRAFFIC_VIOLATION"
        />
        <IPayButton
          btnIconsDisabled
          btnText={selectedBillsCount === billsData?.length ? 'COMMON.DESELECT_ALL' : 'COMMON.SELECT_ALL'}
          btnType={buttonVariants.LINK_BUTTON}
          onPress={selectedBillsCount === billsData?.length ? deselectAllBills : selectAllBills}
        />
      </IPayView>

      <IPayView style={styles.container}>
        {billsData && billsData?.length > 0 ? (
          <IPayView style={styles.listView}>
            <IPayFlatlist
              testID="ipay-flatlist"
              data={billsData}
              keyExtractor={(_, index) => index.toString()}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <IPayView>
                  <IPayTrafficViolationCard billDetails={item} onSelectBill={onSelectBill} showCheckBox />
                  {index === (billsData || []).length - 1 && selectedBillsCount > 0 && (
                    <IPayView style={styles.listBottomView} />
                  )}
                </IPayView>
              )}
            />
          </IPayView>
        ) : (
          <IPayView style={styles.noResultView}>
            <IPayNoResult
              showIcon
              icon={icons.note_remove}
              iconColor={colors.primary.primary800}
              iconSize={40}
              iconViewStyles={styles.noResultIconView}
              message="SADAD.NO_ACTIVE_BILLS"
            />
          </IPayView>
        )}
        {selectedBillsCount > 0 ? (
          <IPayView style={styles.footerView}>
            <SadadFooterComponent
              textColor={colors.natural.natural500}
              onPressBtn={handlePayButton}
              btnText={`${t('COMMON.PAY')} (${selectedBillsAmount} ${t('COMMON.SAR')})`}
              selectedItemsCount={selectedBillsCount}
              disableBtnIcons
            />
          </IPayView>
        ) : (
          <IPayView style={styles.footerViewSecondary}>
            <IPayButton
              onPress={handleInquire}
              btnText="TRAFFIC_VIOLATION.INQUIRE_ANOTHER"
              btnType={buttonVariants.OUTLINED}
              rightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.primary.primary500} />}
              large
            />
          </IPayView>
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default TrafficViolationScreen;
