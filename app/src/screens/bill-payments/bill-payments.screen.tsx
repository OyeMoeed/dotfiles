import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySadadBill } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { BillProps, GetSadadBillProps } from '@app/network/services/bills/get-sadad-bills/get-sadad-bills.interface';
import getSadadBills from '@app/network/services/bills/get-sadad-bills/get-sadad-bills.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { ApiResponseStatusType, BillPaymentOptions, BillStatus, buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import billPaymentsStyles from './bill-payments.style';
import IPayBillPaymentNoResultsComponent from './component/ipay-bill-payment-no-results.component';
import IPayBillPaymentsFooter from './component/ipay-bill-payments-footer.component';
import IPaySadadBillsHeader from './component/ipay-sadad-bills-header.component';

const BillPaymentsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = billPaymentsStyles();
  const localizationText = useLocalization();
  const { showToast } = useToastContext();
  const [billsData, setBillsData] = useState<BillProps[]>([]);
  const [sadadBills, setSadadBillsData] = useState<BillProps[]>([]);
  const [unpaidBillsCount, setUnpaidBillsCount] = useState<number>(0);

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

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

  const addStatusToData = async (newBills: BillProps[]) => {
    const newData = newBills.map((element) => ({
      ...element,
      selected: false,
    }));
    setUnpaidBillsCount(newBills.filter((bill) => bill.billStatusDesc === BillStatus.UNPAID).length);
    return newData;
  };

  const getBills = async () => {
    try {
      const payload: GetSadadBillProps = {
        filterType: 'payment',
        offset: 1,
        maxRecords: 20,
        showloader: true,
      };
      const apiResponse: any = await getSadadBills(payload);
      switch (apiResponse?.status?.type) {
        case ApiResponseStatusType.SUCCESS: {
          const newBills = apiResponse?.response?.bills || [];
          const updatedData = await addStatusToData(newBills);
          setSadadBillsData(updatedData.slice(0, 3));
          setBillsData(updatedData);
          break;
        }
        case apiResponse?.apiResponseNotOk:
          renderToast(localizationText.ERROR.API_ERROR_RESPONSE);
          break;
        case ApiResponseStatusType.FAILURE:
          renderToast(apiResponse?.error);
          break;
        default:
          break;
      }
    } catch (error: any) {
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.BILL_PAYMENTS.BILL_PAYMENTS} applyFlex />
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
              large
              onPress={onPressAddNewBill}
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
