import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAccountBalance, IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { NewSadadBillProps } from './new-sadad-bill.interface';
import newsadadBillStyles from './new-sadad-bill.style';

const NewSadadBillScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = newsadadBillStyles(colors);
  const localizationText = useLocalization();

  const {
    walletNumber,
    availableBalance,
    limitsDetails: { monthlyRemainingOutgoingAmount, monthlyOutgoingLimit },
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<
    {
      params: NewSadadBillProps;
    },
    'params'
  >;

  const {
    billNickname,
    billerName,
    billerIcon,
    totalAmount,
    billNumOrBillingAcct,
    dueDate,
    billerId,
    billIdType,
    serviceDescription,
  } = route.params;

  const [amount, setAmout] = useState(totalAmount);
  const [warningMessage, setWarningMessage] = useState('');

  const getAmountWarning = () => {
    if (Number(availableBalance) <= 0) {
      setWarningMessage(localizationText.NEW_SADAD_BILLS.NO_REMAINING_AMOUNT);
    } else if (Number(availableBalance) < Number(amount)) {
      setWarningMessage(localizationText.NEW_SADAD_BILLS.INSUFFICIENT_BALANCE);
    } else {
      setWarningMessage('');
    }
  };

  useEffect(() => {
    getAmountWarning();
  }, [amount]);

  const onNavigateToConfirm = () => {
    const billPaymentInfos = [
      {
        billerId,
        billNumOrBillingAcct,
        amount: Number(amount),
        dueDateTime: dueDate,
        billIdType,
        billingCycle: '', // TODO: need to confirm where can I get this value
        billIndex: '0',
        serviceDescription,
        billerName,
        walletNumber,
        billNickname,
        billerIcon,
      },
    ];
    navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION, {
      isPayOnly: true,
      showBalanceBox: false,
      billPaymentInfos,
    });
  };

  const onSetAmount = (value: string) => {
    setAmout(value);
  };

  const billDetailsList = [
    {
      currency: localizationText.COMMON.SAR,
      billTitle: billNickname,
      vendor: billerName,
      vendorIcon: billerIcon,
      billAmount: totalAmount,
    },
  ];

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.NEW_SADAD_BILLS.NEW_SADAD_BILLS} applyFlex />
      <IPayView style={styles.container}>
        <IPayAccountBalance
          accountBalanceTextStyle={styles.darkStyle}
          currentBalanceTextStyle={styles.darkStyle}
          currencyTextStyle={styles.darkStyle}
          remainingAmountTextStyle={styles.remainingText}
          currentAvailableTextStyle={styles.currencyTextStyle}
          showRemainingAmount
          onPressTopup={() => {}}
          balance={availableBalance}
          gradientWidth={`${getBalancePercentage(Number(monthlyOutgoingLimit), Number(monthlyRemainingOutgoingAmount))}%`}
          monthlyIncomingLimit={monthlyRemainingOutgoingAmount}
          availableBalance={monthlyOutgoingLimit}
        />
        <IPayFlatlist
          showsVerticalScrollIndicator={false}
          data={billDetailsList}
          renderItem={({ item }) => (
            <IPaySadadBillDetailsBox
              style={styles.sadadDetailStyle}
              item={item}
              actionBtnText={localizationText.COMMON.REMOVE}
              rightIcon={<IPayIcon icon={icons.trash} size={14} color={colors.primary.primary500} />}
              handleAmountInputFromOutSide
              onChangeAmountOutside={onSetAmount}
            />
          )}
        />
        <SadadFooterComponent
          btnDisbaled={warningMessage !== ''}
          btnStyle={styles.footerBtn}
          btnText={localizationText.TOP_UP.PAY}
          disableBtnIcons
          warning={warningMessage}
          onPressBtn={onNavigateToConfirm}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default NewSadadBillScreen;
