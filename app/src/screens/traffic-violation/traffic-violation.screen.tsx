import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayNoResult, SadadFooterComponent } from '@app/components/molecules';
import IPayTrafficViolationCard from '@app/components/organism/ipay-traffic-violation-card/ipay-traffic-violation-card.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import useTrafficViolation from './traffic-violation.hook';
import sadadBillsStyles from './traffic-violation.style';

const TrafficViolationScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sadadBillsStyles(colors);
  const localizationText = useLocalization();
  const { billsData, selectedBillsCount, onSelectBill, selectAllBills, deselectAllBills } = useTrafficViolation();

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.TRAFFIC_VIOLATION.TITLE} titleStyle={styles.screenTitle} />
      <IPayView style={styles.rowStyles}>
        <IPayFootnoteText regular={false} text="My Traffic violation" />
        <IPayButton
          btnIconsDisabled
          btnText={selectedBillsCount === billsData.length ? 'Deselect all' : 'Select all'}
          btnType="link-button"
          onPress={selectedBillsCount === billsData.length ? deselectAllBills : selectAllBills}
        />
      </IPayView>

      {billsData.length > 0 ? (
        <IPayView style={styles.container}>
          <IPayView style={styles.listView}>
            <IPayFlatlist
              testID="ipay-flatlist"
              data={billsData}
              keyExtractor={(_, index) => index.toString()}
              itemSeparatorStyle={styles.itemSeparatorStyle}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <IPayView>
                  <IPayTrafficViolationCard billDetails={item} onSelectBill={onSelectBill} showCheckBox={true} />
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

export default TrafficViolationScreen;
