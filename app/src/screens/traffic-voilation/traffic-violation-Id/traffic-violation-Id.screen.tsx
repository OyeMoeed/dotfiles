import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayList, IPayNoResult, SadadFooterComponent } from '@app/components/molecules';
import IPayTrafficViolationCard from '@app/components/organism/ipay-traffic-violation-card/ipay-traffic-violation-card.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import { useRoute } from '@react-navigation/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useTrafficViolation from './traffic-violation-Id.hook';
import trafficViolationStyles from './traffic-violation-Id.style';

const TrafficViolationIDScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = trafficViolationStyles(colors);
  const { t } = useTranslation();
  const route = useRoute();
  const { violationDetails, dynamicFields } = route.params;
  const { billsData, selectedBillsCount, onSelectBill, selectAllBills, deselectAllBills } = useTrafficViolation();

  const violations = billsData?.length > 1 ? t('TRAFFIC_VIOLATION.VIOLATIONS') : t('TRAFFIC_VIOLATION.VIOLATION');
  const violationsCount = violationDetails ? 1 : billsData?.length;

  const onHandlePayButton = () => {
    navigate(ScreenNames.TRAFFIC_VOILATION_PAYMENT, { variant: true, violationDetails, dynamicFields });
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title="TRAFFIC_VIOLATION.TITLE" titleStyle={styles.screenTitle} />
      <IPayView style={styles.rowStyles}>
        <IPayList
          title="TRAFFIC_VIOLATION.VIOLATOR_ID"
          detailText={`${violationsCount} ${violationDetails ? t('TRAFFIC_VIOLATION.VIOLATION') : violations}`}
          subTitle={violationDetails?.violatorId}
          isShowSubTitle
          showDetail
          detailTextStyle={styles.detailsText}
        />
      </IPayView>
      <IPayView style={[styles.rowStyles, styles.foundViolationContainer]}>
        <IPayFootnoteText color={colors.primary.primary900} regular={false} text="TRAFFIC_VIOLATION.FOUND_VIOLATION" />
        <IPayButton
          btnIconsDisabled
          btnText={selectedBillsCount === billsData?.length ? t('COMMON.DESELECT_ALL') : t('COMMON.SELECT_ALL')}
          btnType={buttonVariants.LINK_BUTTON}
          onPress={selectedBillsCount === billsData?.length ? deselectAllBills : selectAllBills}
        />
      </IPayView>

      {violationDetails ? (
        <IPayView style={styles.container}>
          <IPayView style={styles.listView}>
            <IPayFlatlist
              data={[violationDetails]}
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
          {violationDetails && (
            <IPayView style={styles.footerView}>
              <SadadFooterComponent
                textColor={colors.natural.natural500}
                onPressBtn={onHandlePayButton}
                btnText={`${t('COMMON.PAY')} : ${violationDetails?.amount ?? 0} ${t('COMMON.SAR')}`}
                selectedItemsCount={1}
                disableBtnIcons
                shouldTranslateBtnText={false}
                btnStyle={styles.btnStyle}
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
            message="SADAD.NO_ACTIVE_BILLS"
          />
          <IPayButton
            medium
            btnType={buttonVariants.PRIMARY}
            btnText="SADAD.ADD_NEW_BILL"
            btnStyle={styles.addNewBillBtn}
            leftIcon={<IPayIcon icon={icons.add_square} size={18} color={colors.natural.natural0} />}
          />
        </IPayView>
      )}
    </IPaySafeAreaView>
  );
};

export default TrafficViolationIDScreen;
