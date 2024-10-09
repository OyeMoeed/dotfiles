import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { IPayAccountBalance, IPayButton, IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPaySadadSaveBill from '@app/components/molecules/ipay-sadad-save-bill/ipay-sadad-save-bill.component';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { BillsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { SNAP_POINT } from '@app/constants/constants';
import { FormFields } from '@app/enums/bill-payment.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import { getValidationSchemas } from '@app/services';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertType, alertVariant, buttonVariants } from '@app/utilities';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { NewSadadBillFormValues, NewSadadBillProps } from './new-sadad-bill.interface';
import newSadadBillStyles from './new-sadad-bill.style';

const NewSadadBillScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = newSadadBillStyles(colors);
  const { serviceType, billName } = getValidationSchemas(t);

  const validationSchema = Yup.object().shape({
    serviceType,
    billName,
  });

  const {
    availableBalance,
    limitsDetails: { monthlyRemainingOutgoingAmount, monthlyOutgoingLimit },
    walletNumber,
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const { params } = useRoute<RouteProps>();
  type RouteProps = RouteProp<
    {
      params: NewSadadBillProps;
    },
    'params'
  >;

  const { totalAmount, billDetailsList, saveBill } = params;

  const [amountValue, setAmoutValue] = useState(totalAmount);
  const [billDetailsData, setBillDetailsData] = useState<BillsProps[]>(billDetailsList || []);
  const [totalAmountValue, setTotalAmountValue] = useState(0);
  const [deleteBeneficiary, setDeleteBeneficiary] = useState<boolean>(false);
  const [billIdToDelete, setBillIdToDelete] = useState<number>();

  const [topUpOptionsVisible, setTopUpOptionsVisible] = useState<boolean>(false);

  const topUpSelectionBottomSheet = () => {
    setTopUpOptionsVisible(true);
  };

  const closeBottomSheetTopUp = () => {
    setTopUpOptionsVisible(false);
  };

  const navigateTOAktharPoints = async () => {
    const aktharPointsResponse = await getAktharPoints(walletNumber);
    if (
      aktharPointsResponse?.status?.type === 'SUCCESS' &&
      aktharPointsResponse?.response?.mazayaStatus !== 'USER_DOES_NOT_HAVE_MAZAYA_ACCOUNT'
    ) {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { aktharPointsInfo: aktharPointsResponse?.response, isEligible: true });
    } else {
      navigate(ScreenNames.POINTS_REDEMPTIONS, { isEligible: false });
    }
  };

  const topupItemSelected = (routeName: string, paramsTopup: {}) => {
    closeBottomSheetTopUp();
    if (routeName === ScreenNames.POINTS_REDEMPTIONS) {
      navigateTOAktharPoints();
    } else {
      navigate(routeName, paramsTopup);
    }
  };

  const checkLimit = useMemo(() => {
    const totalBillingAmount = Number(totalAmount);
    let warningMsg = '';
    let disabled = false;
    if (totalBillingAmount > Number(availableBalance)) {
      warningMsg = 'NEW_SADAD_BILLS.INSUFFICIENT_BALANCE';
      disabled = true;
    }
    if (totalBillingAmount > Number(monthlyRemainingOutgoingAmount)) {
      warningMsg = 'COMMON.MONTHLY_REMAINING_OUTGOING_AMOUNT';
      disabled = true;
    }

    return { warningMsg, disabled };
  }, [billDetailsData]);

  const onNavigateToConfirm = (value: NewSadadBillFormValues) => {
    const updatedBillData = billDetailsData?.map((item) =>
      item?.billNickname ? item : { ...item, billNickname: value.billName },
    );
    navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION, {
      isPayOnly: true,
      showBalanceBox: false,
      saveBill: value.saveBill,
      billPaymentInfos: {
        billPaymentDetails: updatedBillData,
        totalAmount: totalAmountValue,
      },
    });
  };

  const onSetAmount = (value: string, index: number) => {
    const newAmount = Number(value);

    const updatedBillDetails = billDetailsData.map((item, idx) => {
      const isCurrentItem = idx === index;
      const billAmount = Number(item.billAmount);
      let remaining = {};
      if (newAmount > billAmount) {
        remaining = { overpaidAmount: newAmount - billAmount, isRemaining: false, isOverPaid: true };
      } else if (newAmount < billAmount) {
        remaining = { partiallyPaidAmount: billAmount - newAmount, isRemaining: true, isOverPaid: false };
      } else {
        remaining = { amount: item.billAmount, isRemaining: false, isOverPaid: false };
      }
      return isCurrentItem ? { ...item, amount: newAmount, ...remaining } : item;
    });

    setAmoutValue(value);
    setBillDetailsData(updatedBillDetails);

    const newTotal = updatedBillDetails.reduce((acc, item) => acc + Number(item.amount || 0), 0);
    setTotalAmountValue(newTotal);
  };

  useEffect(() => {
    const initialTotal = billDetailsData?.reduce((acc, item) => acc + Number(item?.amount || 0), 0) || 0;
    setTotalAmountValue(initialTotal);
  }, [billDetailsData]);

  const renderBillDetails = (data: BillsProps[]) =>
    data?.map(({ billNickname, billerName, billerIcon, billAmount }) => ({
      currency: t('COMMON.SAR'),
      billTitle: billNickname,
      vendor: billerName,
      vendorIcon: billerIcon,
      billAmount,
    }));

  const onDeleteCancel = () => {
    setDeleteBeneficiary(false);
  };

  const onPressRemove = (billId: number) => {
    setBillIdToDelete(billId);
    setDeleteBeneficiary(true);
  };

  const onDeleteBeneficiary = () => {
    setBillDetailsData(billDetailsList?.filter((_, idx: number) => idx !== billIdToDelete));
    setDeleteBeneficiary(false);
  };

  return (
    <>
      <IPayFormProvider<NewSadadBillFormValues>
        validationSchema={validationSchema}
        defaultValues={{
          saveBill: false,
          billName: '',
        }}
      >
        {({ handleSubmit, control, watch }) => (
          <IPaySafeAreaView>
            <IPayHeader backBtn title="NEW_SADAD_BILLS.NEW_SADAD_BILLS" applyFlex />
            <IPayView style={styles.container}>
              <IPayAccountBalance
                accountBalanceTextStyle={styles.darkStyle}
                currentBalanceTextStyle={styles.darkStyle}
                currencyTextStyle={styles.darkStyle}
                remainingAmountTextStyle={styles.remainingText}
                currentAvailableTextStyle={styles.currencyTextStyle}
                showRemainingAmount
                onPressTopup={topUpSelectionBottomSheet}
                balance={availableBalance}
                gradientWidth={`${getBalancePercentage(Number(monthlyOutgoingLimit), Number(monthlyRemainingOutgoingAmount))}%`}
                monthlyIncomingLimit={monthlyRemainingOutgoingAmount}
                availableBalance={monthlyOutgoingLimit}
              />
              <IPayFlatlist
                showsVerticalScrollIndicator={false}
                data={renderBillDetails(billDetailsData)}
                renderItem={({ item, index }) => (
                  <IPayView>
                    <IPaySadadBillDetailsBox
                      style={styles.sadadDetailStyle}
                      item={item}
                      actionBtnText="COMMON.REMOVE"
                      rightIcon={<IPayIcon icon={icons.trash} size={14} color={colors.primary.primary500} />}
                      handleAmountInputFromOutSide
                      onChangeAmountOutside={(val) => onSetAmount(val, index)}
                      showActionBtn={billDetailsData?.length > 1}
                      onPress={() => onPressRemove(index)}
                    />
                    {!saveBill && billDetailsData?.length === 1 && (
                      <IPaySadadSaveBill
                        saveBillToggle={watch(FormFields.SAVE_BILL) || false}
                        billInputName={FormFields.BILL_NAME}
                        toggleInputName={FormFields.SAVE_BILL}
                        toggleControl={control}
                      />
                    )}
                  </IPayView>
                )}
              />
              {totalAmountValue ? (
                <SadadFooterComponent
                  btnDisabled={watch(FormFields.SAVE_BILL) && !watch(FormFields.BILL_NAME)}
                  btnStyle={styles.footerBtn}
                  btnText="TOP_UP.PAY"
                  disableBtnIcons
                  warning={checkLimit.warningMsg}
                  onPressBtn={handleSubmit(onNavigateToConfirm)}
                  amount={amountValue || totalAmount}
                  totalAmount={totalAmountValue ?? 0}
                />
              ) : (
                <IPayButton
                  large
                  btnType={buttonVariants.PRIMARY}
                  btnIconsDisabled
                  btnText="TOP_UP.PAY"
                  disabled={Number(amountValue) === 0}
                  onPress={handleSubmit(onNavigateToConfirm)}
                  btnStyle={styles.payBtn}
                />
              )}
            </IPayView>
          </IPaySafeAreaView>
        )}
      </IPayFormProvider>
      <IPayPortalBottomSheet
        noGradient
        heading="TOP_UP.ADD_MONEY_USING"
        onCloseBottomSheet={closeBottomSheetTopUp}
        customSnapPoint={SNAP_POINT.XS_SMALL}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
        isVisible={topUpOptionsVisible}
      >
        <IPayTopUpSelection testID="topUp-selection" topupItemSelected={topupItemSelected} />
      </IPayPortalBottomSheet>
      <IPayAlert
        visible={deleteBeneficiary}
        onClose={onDeleteCancel}
        title="SADAD.DELETE_NEW_BILL"
        message=""
        type={alertType.SIDE_BY_SIDE}
        closeOnTouchOutside
        variant={alertVariant.DESTRUCTIVE}
        icon={<IPayIcon icon={icons.TRASH} size={64} />}
        showIcon={false}
        primaryAction={{
          text: 'COMMON.CANCEL',
          onPress: onDeleteCancel,
        }}
        secondaryAction={{
          text: 'COMMON.DONE',
          onPress: onDeleteBeneficiary,
        }}
      />
    </>
  );
};

export default NewSadadBillScreen;
