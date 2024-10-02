import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayAccountBalance, IPayButton, IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayFormProvider from '@app/components/molecules/ipay-form-provider/ipay-form-provider.component';
import IPaySadadSaveBill from '@app/components/molecules/ipay-sadad-save-bill/ipay-sadad-save-bill.component';
import { IPaySadadBillDetailsBox } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { FormFields } from '@app/enums/bill-payment.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities';
import getBalancePercentage from '@app/utilities/calculate-balance-percentage.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { FormValues } from '../add-new-sadad-bill/add-new-sadad-bill.interface';
import { NewSadadBillProps } from './new-sadad-bill.interface';
import newsadadBillStyles from './new-sadad-bill.style';

const NewSadadBillScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = newsadadBillStyles(colors);

  const validationSchema = Yup.object().shape({});

  const { control, watch } = useForm();

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
    newBill,
  } = route.params;

  const [amount, setAmout] = useState(totalAmount);
  const [warningMessage, setWarningMessage] = useState('');

  const getAmountWarning = () => {
    if (Number(availableBalance) <= 0) {
      setWarningMessage(t('NEW_SADAD_BILLS.NO_REMAINING_AMOUNT'));
    } else if (Number(availableBalance) < Number(amount)) {
      setWarningMessage(t('NEW_SADAD_BILLS.INSUFFICIENT_BALANCE'));
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
      saveBill: watch(FormFields.SAVE_BILL),
      billPaymentInfos,
    });
  };

  const onSetAmount = (value: string) => {
    setAmout(value);
  };

  const billDetailsList = [
    {
      currency: t('COMMON.SAR'),
      billTitle: billNickname,
      vendor: billerName,
      vendorIcon: billerIcon,
      billAmount: totalAmount,
    },
  ];

  return (
    <IPayFormProvider<FormValues>
      validationSchema={validationSchema}
      defaultValues={{
        saveBill: false,
      }}
    >
      {() => (
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
              onPressTopup={() => {}}
              balance={availableBalance}
              gradientWidth={`${getBalancePercentage(Number(monthlyOutgoingLimit), Number(monthlyRemainingOutgoingAmount))}%`}
              monthlyIncomingLimit={monthlyRemainingOutgoingAmount}
              availableBalance={monthlyOutgoingLimit}
            />
            <IPayFlatlist
              showsVerticalScrollIndicator={false}
              data={billDetailsList}
              renderItem={({ item, index }) => (
                <IPayView>
                  <IPaySadadBillDetailsBox
                    style={styles.sadadDetailStyle}
                    item={item}
                    actionBtnText="COMMON.REMOVE"
                    rightIcon={<IPayIcon icon={icons.trash} size={14} color={colors.primary.primary500} />}
                    handleAmountInputFromOutSide
                    onChangeAmountOutside={onSetAmount}
                  />
                  {index === billDetailsList.length - 1 && newBill && (
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

            {warningMessage ? (
              <SadadFooterComponent
                btnDisbaled={warningMessage !== ''}
                btnStyle={styles.footerBtn}
                btnText="TOP_UP.PAY"
                disableBtnIcons
                warning={warningMessage}
                onPressBtn={onNavigateToConfirm}
                amount={amount || totalAmount}
              />
            ) : (
              <IPayButton
                large
                btnType={buttonVariants.PRIMARY}
                btnIconsDisabled
                btnText="TOP_UP.PAY"
                disabled={Number(amount) === 0}
                onPress={onNavigateToConfirm}
                btnStyle={styles.payBtn}
              />
            )}
          </IPayView>
        </IPaySafeAreaView>
      )}
    </IPayFormProvider>
  );
};

export default NewSadadBillScreen;
