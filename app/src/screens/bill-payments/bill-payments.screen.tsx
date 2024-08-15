import React from 'react';

import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';

import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPaySadadBill } from '@app/components/organism';
import { ACTIVE_SADAD_BILLS, INACTIVEACTIVE_SADAD_BILLS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { BillPaymentOptions, buttonVariants } from '@app/utilities/enums.util';
import billPaymentsStyles from './bill-payments.style';
import IPayBillPaymentNoResultsComponent from './component/ipay-bill-payment-no-results.component';
import IPayBillPaymentsFooter from './component/ipay-bill-payments-footer.component';
import IPaySadadBillsHeader from './component/ipay-sadad-bills-header.component';

const BillPaymentsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = billPaymentsStyles();
  const localizationText = useLocalization();
  const totalSadadBills = [...ACTIVE_SADAD_BILLS, ...INACTIVEACTIVE_SADAD_BILLS];
  const sadadBills = totalSadadBills.slice(0, 3);

  const onPressViewAll = () => {
    navigate(ScreenNames.SADAD_BILLS);
  };

  const onPressAddNew = () => navigate(ScreenNames.ADD_NEW_SADAD_BILLS);

  const onPressBillPaymentOption = (billPaymentOption: string) => {
    if (billPaymentOption === BillPaymentOptions.MOI_PAYEMNT) {
      navigate(ScreenNames.MOI_PAYMENT_SCREEN);
    } else {
      navigate(ScreenNames.TRAFFIC_VOILATION);
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.BILL_PAYMENTS.BILL_PAYMENTS} applyFlex />
      <IPayView style={styles.container}>
        {totalSadadBills.length > 0 ? (
          <IPayView style={styles.contentContainer}>
            <IPaySadadBillsHeader
              totalSadadBills={totalSadadBills}
              onPressViewAll={onPressViewAll}
              style={styles.headerStyles}
            />
            <IPayView style={styles.listView}>
              <IPayFlatlist
                testID="ipay-flatlist"
                data={sadadBills}
                keyExtractor={(_, index) => index.toString()}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <IPaySadadBill billDetails={item} showMoreOption={false} />}
              />
            </IPayView>
            <IPayButton
              large
              onPress={onPressAddNew}
              btnStyle={styles.addNewBillBtn}
              btnType={buttonVariants.OUTLINED}
              btnText={localizationText.SADAD.ADD_NEW_BILL}
              leftIcon={<IPayIcon icon={icons.add} size={18} color={colors.primary.primary500} />}
            />
          </IPayView>
        ) : (
          <IPayBillPaymentNoResultsComponent onPressViewAll={onPressViewAll} />
        )}
      </IPayView>
      <IPayBillPaymentsFooter onPressBillPaymentOption={onPressBillPaymentOption} />
    </IPaySafeAreaView>
  );
};

export default BillPaymentsScreen;
