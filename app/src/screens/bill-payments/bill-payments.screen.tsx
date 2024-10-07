import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPaySadadBill } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import {
  GetSadadBillByStatusProps,
  PaymentInfoProps,
} from '@app/network/services/bills-management/get-sadad-bills-by-status/get-sadad-bills-by-status.interface';
import getSadadBillsByStatus from '@app/network/services/bills-management/get-sadad-bills-by-status/get-sadad-bills-by-status.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import {
  ApiResponseStatusType,
  BillPaymentOptions,
  BillStatus,
  BillingStatus,
  buttonVariants,
} from '@app/utilities/enums.util';
import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import billPaymentsStyles from './bill-payments.style';
import IPayBillPaymentNoResultsComponent from './component/ipay-bill-payment-no-results.component';
import IPayBillPaymentsFooter from './component/ipay-bill-payments-footer.component';
import IPaySadadBillsHeader from './component/ipay-sadad-bills-header.component';

const BillPaymentsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = billPaymentsStyles();
  const [billsData, setBillsData] = useState<PaymentInfoProps[]>([]);
  const [sadadBills, setSadadBillsData] = useState<PaymentInfoProps[]>([]);
  const [unpaidBillsCount, setUnpaidBillsCount] = useState<number>(0);
  const [loadingBills, setLoadingBill] = useState<boolean>(false);
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);

  const onPressViewAll = () => {
    navigate(ScreenNames.SADAD_BILLS, { sadadBills: billsData });
  };

  const onPressAddNewBill = () => navigate(ScreenNames.ADD_NEW_SADAD_BILLS);

  const onPressBillPaymentOption = (billPaymentOption: string) => {
    if (billPaymentOption === BillPaymentOptions.MOI_PAYEMNT) {
      navigate(ScreenNames.MOI_PAYMENT_SCREEN);
    } else {
      navigate(ScreenNames.TRAFFIC_VOILATION);
    }
  };

  const addStatusToData = async (newBills: PaymentInfoProps[]) => {
    const newData = newBills.map((element) => ({
      ...element,
      selected: false,
    }));
    setUnpaidBillsCount(newBills.filter((bill) => bill.billStatusCode === BillStatus.UNPAID).length);
    return newData;
  };

  const getBills = async () => {
    setLoadingBill(true);
    const payload: GetSadadBillByStatusProps = {
      walletNumber,
      billStatus: BillingStatus.ENABLED,
      showloader: true,
    };
    const apiResponse: any = await getSadadBillsByStatus(payload);
    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      if (apiResponse?.response?.paymentInfoList.length > 0) {
        const newBills = apiResponse?.response?.paymentInfoList || [];
        const updatedData = await addStatusToData(newBills);
        setSadadBillsData(updatedData.slice(0, 3));
        setBillsData(updatedData);
      }
    }
    setLoadingBill(false);
  };

  // Use useFocusEffect to call the function when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      getBills();
      // If needed, add a cleanup function here
      return () => {};
    }, []),
  );

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title="BILL_PAYMENTS.BILL_PAYMENTS" applyFlex />
      <IPayView style={styles.container}>
        {sadadBills.length > 0 ? (
          <IPayView style={styles.contentContainer}>
            <IPaySadadBillsHeader
              unpaidBillsCount={unpaidBillsCount}
              onPressViewAll={onPressViewAll}
              style={styles.headerStyles}
            />
            <IPayView style={styles.listView}>
              {sadadBills.length > 0 ? (
                <IPayFlatlist
                  testID="ipay-flatlist"
                  data={sadadBills}
                  keyExtractor={(_, index) => index.toString()}
                  itemSeparatorStyle={styles.itemSeparatorStyle}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => <IPaySadadBill billDetails={item} showMoreOption={false} />}
                />
              ) : (
                <IPayView />
              )}
            </IPayView>
            <IPayButton
              medium
              onPress={onPressAddNewBill}
              btnStyle={styles.addNewBillBtn}
              btnType={buttonVariants.OUTLINED}
              btnText="SADAD.ADD_NEW_BILL"
              leftIcon={<IPayIcon icon={icons.add_bold} size={18} color={colors.primary.primary500} />}
            />
          </IPayView>
        ) : (
          <>{!loadingBills && <IPayBillPaymentNoResultsComponent onPressViewAll={onPressAddNewBill} />}</>
        )}
      </IPayView>
      <IPayBillPaymentsFooter onPressBillPaymentOption={onPressBillPaymentOption} />
    </IPaySafeAreaView>
  );
};

export default BillPaymentsScreen;
