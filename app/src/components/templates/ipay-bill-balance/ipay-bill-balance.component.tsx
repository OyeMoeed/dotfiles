import { IPayFlatlist, IPayView } from '@app/components/atoms';
import { SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import IPaySadadSaveBill from '@app/components/molecules/ipay-sadad-save-bill/ipay-sadad-save-bill.component';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import { AccountBalanceStatus, FormFields } from '@app/enums/bill-payment.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { BalanceStatusVariants, IPayBillBalanceProps } from './ipay-bill-balance.interface';
import onBillBalanceStyles from './ipay-bill-balance.style';

/**
 * Props for the IPayBillBalance component.
 * @param {SadadBillItemProps[]} selectedBills - An array of bill items that are selected for payment
 * @param {Control<FormValues>} toggleControl - A control object used for managing and validating form fields related to the bill payment process.
 */
const IPayBillBalance: React.FC<IPayBillBalanceProps> = ({ selectedBills, toggleControl }) => {
  const { colors } = useTheme();
  const styles = onBillBalanceStyles(colors);
  const localizationText = useLocalization();
  const singleBill = selectedBills?.length === 1;
  const eligibleToPay = false; // TODO will be updated on basis of API
  const currentBalance = 4000; // TODO will be updated on basis of API
  const availableBalance = '5000'; // TODO will be updated on basis of API
  const accountBalanceStatus = AccountBalanceStatus.NO_REMAINING_AMOUNT; // TODO will be updated on basis of API

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
        <IPayView style={!singleBill && styles.listWrapper}>
          <IPayFlatlist
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <IPaySadadBillDetailsBox style={styles.billWrapper} item={item} />}
            data={selectedBills}
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
          />
        </IPayView>
        {singleBill && (
          <IPaySadadSaveBill
            saveBillToggle={false}
            billInputName={FormFields.BILL_NAME}
            toggleInputName={FormFields.SAVE_BILL}
            toggleControl={toggleControl}
          />
        )}
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
