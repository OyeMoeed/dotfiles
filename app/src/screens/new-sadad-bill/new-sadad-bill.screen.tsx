import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAccountBalance, IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { navigate } from '@app/navigation/navigation-service.navigation';
import newsadadBillStyles from './new-sadad-bill.style';
import { NewSadadBillProps } from './new-sadad-bill.interface';

const NewSadadBillScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = newsadadBillStyles(colors);
  const localizationText = useLocalization();
  // TODO will update on basis of API
  const dummyData = {
    balance: '5200',
    availableBalance: '300',
    totalAmount: '550',
  };

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
    serviceType,
    billNumOrBillingAcct,
    dueDate,
    billerId,
    billIdType,
    serviceDescription,
  } = route.params;

  const [amount, setAmout] = useState(totalAmount);
  const [warningMessage, setWarningMessage] = useState('');

  const getAmountWarning = () => {
    if (Number(dummyData.availableBalance) <= 0) {
      setWarningMessage(localizationText.NEW_SADAD_BILLS.NO_REMAINING_AMOUNT);
    } else if (Number(dummyData.availableBalance) < Number(amount)) {
      setWarningMessage(localizationText.NEW_SADAD_BILLS.INSUFFICIENT_BALANCE);
    } else {
      setWarningMessage('');
    }
  };

  useEffect(() => {
    getAmountWarning();
  }, [amount]);

  const shortString = (text: string) => {
    if (text.length < 20) {
      return text;
    }
    return `${text.slice(0, 20)}...`;
  };

  const detailsArray = [
    {
      id: '1',
      label: localizationText.PAY_BILL.SERVICE_TYPE,
      value: shortString(serviceType),
    },
    {
      id: '2',
      label: localizationText.PAY_BILL.ACCOUNT_NUMBER,
      value: billNumOrBillingAcct,
    },
    {
      id: '3',
      label: localizationText.COMMON.DUE_DATE,
      value: dueDate,
    },
  ];

  const onNavigateToConfirm = () => {
    navigate(ScreenNames.BILL_PAYMENT_CONFIRMATION, {
      isPayOnly: true,
      billNickname,
      billerName,
      billerIcon,
      serviceType,
      billNumOrBillingAcct,
      dueDate,
      totalAmount: amount,
      detailsArray,
      billerId,
      billIdType,
      serviceDescription,
      showBalanceBox: false,
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
          gradientWidth="50%"
          currentAvailableTextStyle={styles.currencyTextStyle}
          balance={dummyData.balance}
          availableBalance={dummyData.availableBalance}
          showRemainingAmount
          onPressTopup={() => {}}
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
          btnDisbaled={warningMessage}
          btnStyle={styles.footerBtn}
          btnText={'TOP_UP.PAY'}
          disableBtnIcons
          warning={warningMessage}
          onPressBtn={onNavigateToConfirm}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default NewSadadBillScreen;
