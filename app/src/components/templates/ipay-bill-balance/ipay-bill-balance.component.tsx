import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPaySadadSaveBill from '@app/components/molecules/ipay-sadad-save-bill/ipay-sadad-save-bill.component';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import { SadadBillItemProps } from '@app/components/organism/ipay-sadad-bill-details-box/ipay-sadad-bill-details-box.interface';
import { AccountBalanceStatus, FormFields } from '@app/enums/bill-payment.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BalanceStatusVariants, IPayBillBalanceProps } from './ipay-bill-balance.interface';
import onBillBalanceStyles from './ipay-bill-balance.style';

/**
 * Props for the IPayBillBalance component.
 * @param {SadadBillItemProps[]} selectedBills - An array of bill items that are selected for payment
 * @param {Control<FormValues>} toggleControl - A control object used for managing and validating form fields related to the bill payment process.
 * @param {boolean} saveBillToggle - Boolean indicating the bill save functionality is enabled or not
 */
const IPayBillBalance: React.FC<IPayBillBalanceProps> = ({
  selectedBills,
  toggleControl,
  saveBillToggle,
  isSaveOnly,
  isPayPartially,
}) => {
  const { colors } = useTheme();
  const styles = onBillBalanceStyles(colors);
  const { t } = useTranslation();
  const singleBill = selectedBills?.length === 1;
  const [billsData, setBillsData] = useState<SadadBillItemProps[]>([]);
  const eligibleToPay = !isPayPartially && !!AccountBalanceStatus.ACCOUNT_BALANCE; // TODO will be updated on basis of API
  const currentBalance = 4000; // TODO will be updated on basis of API
  const availableBalance = '5000'; // TODO will be updated on basis of API
  const accountBalanceStatus = AccountBalanceStatus.ACCOUNT_BALANCE; // TODO will be updated on basis of, API
  const walletNumber = useTypedSelector((state) => state.walletInfoReducer.walletInfo.walletNumber);

  useEffect(() => {
    if (selectedBills?.length) {
      setBillsData(
        selectedBills?.map((el) => ({
          billInfoItem: el,
          currency: t('COMMON.SAR'),
          billTitle: el?.nickName,
          vendor: el?.biller?.billerDesc,
          vendorIcon: el?.biller?.imageURL,
          billAmount: el?.dueAmount,
        })),
      );
    }
  }, []);

  const balanceStatusVariants: BalanceStatusVariants = {
    insufficient: {
      warningText: t('NEW_SADAD_BILLS.INSUFFICIENT_BALANCE'),
      disabledBtn: true,
      gradientWidth: '54%',
      progressBarBg: styles.progressBarBg,
      gradient: colors.gradientSecondary,
    },
    noRemainingAmount: {
      warningText: t('NEW_SADAD_BILLS.NO_REMAINING_AMOUNT'),
      disabledBtn: true,
      gradientWidth: '1%',
      progressBarBg: styles.redProgressBarBg,
      gradient: colors.redGradient,
    },
    accountBalance: {
      warningText: '',
      disabledBtn: false,
      gradientWidth: '90%',
      progressBarBg: styles.progressBarBg,
      gradient: colors.gradientSecondary,
    },
  };

  const removeItem = (itemToRemove: SadadBillItemProps) => {
    const data = billsData?.filter((item) => item?.billInfoItem.billIndex !== itemToRemove?.billInfoItem.billIndex);
    setBillsData(data);
  };

  const onChangeAmountOutside = (value: string, item: SadadBillItemProps) => {
    const updatedBills = billsData?.map((el) =>
      item?.billInfoItem.billIndex === el.billInfoItem.billIndex ? { ...el, billAmount: value } : el,
    );
    setBillsData(updatedBills);
  };

  const renderItem = ({ item }: { item: SadadBillItemProps }) => (
    <IPaySadadBillDetailsBox
      showActionBtn={!singleBill && !isSaveOnly}
      rightIcon={<IPayIcon icon={icons.trash} color={colors.primary.primary500} />}
      style={styles.billWrapper}
      actionBtnText="COMMON.REMOVE"
      item={item}
      onPress={() => removeItem(item)}
      handleAmountInputFromOutSide
      onChangeAmountOutside={(value) => onChangeAmountOutside(value, item)}
    />
  );

  const billPaymentInfosObject = billsData?.map((el) => ({
    billerId: el?.billInfoItem?.biller?.billerId,
    billNumOrBillingAcct: el?.billInfoItem?.billAccountNumber,
    amount: Number(el?.billAmount),
    dueDateTime: el?.billInfoItem?.dueDateTime,
    billIdType: '1', // TODO: not receiving this value from response
    billingCycle: '1', // TODO: need to confirm where can I get this value
    billIndex: el?.billInfoItem?.billIndex,
    serviceDescription: el?.billInfoItem?.biller?.billerCategoryDesc,
    billerName: el?.billInfoItem?.biller?.billerDesc,
    walletNumber,
    billNickname: el?.billInfoItem?.nickName,
    billerIcon: el?.billInfoItem?.biller?.categoryImageURL,
  }));

  const onPressPay = () => {
    navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION, {
      isPayPartially,
      billPaymentInfos: billPaymentInfosObject,
    });
  };

  const totalAmount = billsData.length
    ? billsData.reduce((sum, item) => sum + Number(item.billAmount), 0).toString()
    : '0';

  return (
    <IPayView style={[styles.container, eligibleToPay && styles.containerHeight]}>
      <IPayView style={styles.topWrapper}>
        <IPayAccountBalance
          gradientWidth={balanceStatusVariants[accountBalanceStatus]?.gradientWidth}
          gradientBgStyle={balanceStatusVariants[accountBalanceStatus]?.progressBarBg}
          showRemainingAmount
          balance={currentBalance}
          availableBalance={availableBalance}
          style={styles.accountBalance}
          currencyTextStyle={styles.darkBlueText}
          accountBalanceTextStyle={styles.darkBlueText}
          totalAvailableTextStyle={styles.greyText}
          currentBalanceTextStyle={styles.darkBlueText}
          gradientColors={balanceStatusVariants[accountBalanceStatus]?.gradient}
          remainingAmountTextStyle={styles.greyText}
          currentAvailableTextStyle={styles.darkText}
          onPressTopup={() => navigate(ScreenNames.WALLET)}
        />
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView>
            <IPayView style={!singleBill && styles.listWrapper}>
              <IPayFlatlist
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                data={billsData}
                style={styles.flatlist}
                showsVerticalScrollIndicator={false}
              />
            </IPayView>
            {singleBill && !isSaveOnly && (
              <IPaySadadSaveBill
                saveBillToggle={saveBillToggle}
                billInputName={FormFields.BILL_NAME}
                toggleInputName={FormFields.SAVE_BILL}
                toggleControl={toggleControl}
              />
            )}
          </IPayView>
        </IPayScrollView>
      </IPayView>
      <IPayView>
        <SadadFooterComponent
          warning={balanceStatusVariants[accountBalanceStatus]?.warningText}
          btnText="COMMON.PAY"
          disableBtnIcons
          btnDisabled={balanceStatusVariants[accountBalanceStatus]?.disabledBtn}
          showButtonOnly={eligibleToPay}
          totalAmount={totalAmount}
          testID="ipay-bill"
          onPressBtn={onPressPay}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayBillBalance;
