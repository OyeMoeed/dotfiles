import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPaySadadSaveBill from '@app/components/molecules/ipay-sadad-save-bill/ipay-sadad-save-bill.component';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import { SadadBillItemProps } from '@app/components/organism/ipay-sadad-bill-details-box/ipay-sadad-bill-details-box.interface';
import { AccountBalanceStatus, FormFields } from '@app/enums/bill-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import { BalanceStatusVariants, IPayBillBalanceProps } from './ipay-bill-balance.interface';
import onBillBalanceStyles from './ipay-bill-balance.style';

/**
 * Props for the IPayBillBalance component.
 * @param {SadadBillItemProps[]} selectedBills - An array of bill items that are selected for payment
 * @param {Control<FormValues>} toggleControl - A control object used for managing and validating form fields related to the bill payment process.
 * @param {boolean} saveBillToggle - Boolean indicating the bill save functionality is enabled or not
 */
const IPayBillBalance: React.FC<IPayBillBalanceProps> = ({ selectedBills, toggleControl, saveBillToggle }) => {
  const { colors } = useTheme();
  const styles = onBillBalanceStyles(colors);
  const localizationText = useLocalization();
  const singleBill = selectedBills?.length === 1;
  const [billsData, setBillsData] = useState<SadadBillItemProps[]>([]);
  const eligibleToPay = false; // TODO will be updated on basis of API
  const currentBalance = 4000; // TODO will be updated on basis of API
  const availableBalance = '5000'; // TODO will be updated on basis of API
  const accountBalanceStatus = AccountBalanceStatus.NO_REMAINING_AMOUNT; // TODO will be updated on basis of API

  useEffect(() => {
    if (selectedBills?.length) {
      setBillsData(selectedBills);
    }
  }, [selectedBills]);

  const balanceStatusVariants: BalanceStatusVariants = {
    insufficient: {
      warningText: localizationText.NEW_SADAD_BILLS.INSUFFICIENT_BALANCE,
      disabledBtn: true,
      gradientWidth: '54%',
      progressBarBg: styles.progressBarBg,
      gradient: colors.gradientSecondary,
    },
    noRemainingAmount: {
      warningText: localizationText.NEW_SADAD_BILLS.NO_REMAINING_AMOUNT,
      disabledBtn: true,
      gradientWidth: '1%',
      progressBarBg: styles.redProgressBarBg,
      gradient: colors.redGradient,
    },
  };

  const removeItem = (itemToRemove: SadadBillItemProps) => {
    const data = billsData?.filter((item) => item?.billTitle !== itemToRemove?.billTitle);
    setBillsData(data);
  };

  const renderItem = ({ item }: { item: SadadBillItemProps }) => (
    <IPaySadadBillDetailsBox
      showActionBtn
      rightIcon={<IPayIcon icon={icons.trash} color={colors.primary.primary500} />}
      style={styles.billWrapper}
      actionBtnText={localizationText.COMMON.REMOVE}
      item={item}
      onPress={() => removeItem(item)}
    />
  );

  const onPressPay = () => {
    if (eligibleToPay) navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION);
  };

  return (
    <IPayView style={[styles.container, eligibleToPay && styles.containerHeight]}>
      <IPayView style={styles.topWrapper}>
        <IPayAccountBalance
          gradientWidth={balanceStatusVariants[accountBalanceStatus].gradientWidth}
          gradientBgStyle={balanceStatusVariants[accountBalanceStatus].progressBarBg}
          showRemainingAmount
          balance={currentBalance}
          availableBalance={availableBalance}
          style={styles.accountBalance}
          currencyTextStyle={styles.darkBlueText}
          accountBalanceTextStyle={styles.darkBlueText}
          totalAvailableTextStyle={styles.greyText}
          currentBalanceTextStyle={styles.darkBlueText}
          gradientColors={balanceStatusVariants[accountBalanceStatus].gradient}
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
            {singleBill && (
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
          warning={balanceStatusVariants[accountBalanceStatus].warningText}
          btnText={localizationText.COMMON.PAY}
          disableBtnIcons
          btnDisbaled={balanceStatusVariants[accountBalanceStatus].disabledBtn}
          showButtonOnly={eligibleToPay}
          testID="ipay-bill"
          onPressBtn={onPressPay}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayBillBalance;
