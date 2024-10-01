import React, { createRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import icons from '@app/assets/icons';
import { IPayMonthYearPicker, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayListView, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPayBottomSheet, IPaySalaryPayInformation } from '@app/components/organism';
import { IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { RouteProp, useRoute } from '@react-navigation/native';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { SNAP_POINT } from '@app/constants/constants';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import { isArabic } from '@app/utilities/constants';
import { BalanceStatusVariants } from '@app/components/templates/ipay-bill-balance/ipay-bill-balance.interface';
import { AccountBalanceStatus } from '@app/enums';

import { MusanedPaySalaryScreenProps, SalaryCategories } from './musaned-pay-salary.interface';
import musanedPaySalary from './musaned-pay-salary.style';

const MusanedPaySalaryScreen: React.FC<MusanedPaySalaryScreenProps> = () => {
  const styles = musanedPaySalary();
  const { t } = useTranslation();

  type RouteProps = RouteProp<any>;
  const { params } = useRoute<RouteProps>();
  const {
    borderNumber = '3085307282',
    contractNumber = '',
    countryCode = 'PK',
    haveWalletFlag = true,
    lastPaidSalaryDate = '',
    name = 'FAISAL SARWAR MUHAMMAD SARWAR',
    nationality = 'باكستان',
    nationalityAr = 'باكستان',
    nationalityEn = 'Pakistan',
    occupation = 'عامل منزلي',
    occupationAr = 'عامل منزلي',
    occupationEn = 'Domestic worker',
    payrollAmount = '1300',
    poiExperationDate = '2026-03-21',
    poiNumber = '2516472335',
    salarySource = '',
    type = 'MUSANED.ALINMA_PAY_USERS',
  } = params || {};

  const appData = useTypedSelector((state) => state.appDataReducer.appData);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { walletNumber } = walletInfo;
  const accountBalanceStatus = AccountBalanceStatus.ACCOUNT_BALANCE; // TODO will be updated on basis of, API

  const [chipValue, setChipValue] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState({});
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [deductFlag, setDeductFlag] = useState(false);
  const [payExtraFlag, setPayExtraFlag] = useState(false);

  const refBottomSheet = useRef(null);
  const salaryTypeBottomSheetRef = useRef(null);

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

  const salaryTypes = [
    { id: SalaryCategories.Monthly_Salary, text: 'MUSANED.MONTHLY_SALARY' },
    { id: SalaryCategories.Advanced_Salary, text: 'MUSANED.ADVANCED_SALARY' },
    { id: SalaryCategories.Bonus_Salary, text: 'MUSANED.BONUS_SALARY' },
  ];

  const { limitsDetails, availableBalance, currentBalance } = walletInfo;
  const { monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount, monthlyOutgoingLimit } = limitsDetails;

  useEffect(() => {
    const monthlyRemaining = parseFloat(monthlyRemainingOutgoingAmount);
    const monthlyTotalRemainingLimit = parseFloat(monthlyOutgoingLimit);
    const updatedTopUpAmount = parseFloat(transferAmount.replace(/,/g, ''));

    if (monthlyRemaining === 0 || updatedTopUpAmount > monthlyRemaining) {
      setChipValue(t('TOP_UP.AMOUNT_EXCEEDS_CURRENT'));
    } else if (updatedTopUpAmount > monthlyTotalRemainingLimit) {
      setChipValue(t('TOP_UP.MONTHLY_SPENDING_LIMIT_REACHED'));
    } else {
      setChipValue('');
    }
  }, [transferAmount, monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount]);

  const onCloseSheet = () => {
    salaryTypeBottomSheetRef?.current?.close();
  };

  const onPressListItem = (item: ReasonListItem) => {
    setSelectedReason(item);
    onCloseSheet();
  };

  const onPressSelectReason = () => {
    salaryTypeBottomSheetRef?.current?.present();
  };

  const onLocalTransferPrepare = async () => {
    navigate(ScreenNames.MUSANED_PAY_SALARY_CONFIRM);
  };

  const [topUpOptionsVisible, setTopUpOptionsVisible] = useState<boolean>(false);

  const topUpSelectionBottomSheet = () => {
    setTopUpOptionsVisible(true);
  };

  const closeBottomSheetTopUp = () => {
    setTopUpOptionsVisible(false);
  };

  const topUpSelectionRef = createRef<any>();

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

  const topupItemSelected = (routeName: string, params: {}) => {
    closeBottomSheetTopUp();
    if (routeName === ScreenNames.POINTS_REDEMPTIONS) {
      navigateTOAktharPoints();
    } else {
      navigate(routeName, params);
    }
  };

  const openDatePicker = () => {
    refBottomSheet.current?.present();
  };

  const onPressDeductFlag = () => {
    setDeductFlag(!deductFlag);
  };

  const onPressPayExtraFlag = () => {
    setPayExtraFlag(!payExtraFlag);
  };

  const onPressSelectDate = () => {
    if (selectedFromDate) {
      //
    } else {
      setSelectedFromDate('01/2024');
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title="MUSANED.HEADER" />
      <IPayScrollView>
        <IPayView style={styles.container}>
          <IPayAccountBalance
            balance={availableBalance}
            availableBalance={currentBalance}
            hideBalance={appData?.hideBalance}
            showRemainingAmount
            onPressTopup={topUpSelectionBottomSheet}
            monthlyIncomingLimit=""
          />

          <IPayView style={styles.bankDetailsView}>
            <IPaySalaryPayInformation
              fullName={name?.slice(0, 18)}
              subtitle={isArabic ? occupationAr : occupationEn}
              style={styles.transferContainer}
              selectedItem={selectedReason?.text}
              openReason={onPressSelectReason}
              inputFieldStyle={styles.inputFieldStyle}
              onPressDatePicker={openDatePicker}
              onPressDeductFlag={onPressDeductFlag}
              onPressPayExtraFlag={onPressPayExtraFlag}
              payExtraFlag={payExtraFlag}
              deductFlag={deductFlag}
              amount={payrollAmount}
              selectedDate={selectedFromDate}
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>

      <IPayView style={styles.buttonContainer}>
        <SadadFooterComponent
          btnText="COMMON.NEXT"
          disableBtnIcons
          // btnDisbaled={balanceStatusVariants[accountBalanceStatus]?.disabledBtn}
          btnDisbaled={false}
          testID="ipay-bill"
          showTopMessage
          totalAmountText={balanceStatusVariants[accountBalanceStatus]?.warningText}
          totalAmountStyle={{
            backgroundColor: colors.critical.critical25,
            justifyContent: 'flex-start',
          }}
          totalAmountLeftIcon={{
            icon: icons.sheild_cross,
            color: colors.natural.natural1000,
          }}
          onPressBtn={onLocalTransferPrepare}
          partialPay
        />
      </IPayView>

      <IPayBottomSheet
        heading="MUSANED.SALARY_TYPE"
        onCloseBottomSheet={onCloseSheet}
        customSnapPoint={['20%', '65%']}
        ref={salaryTypeBottomSheetRef}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <IPayListView list={salaryTypes} onPressListItem={onPressListItem} selectedListItem={selectedReason?.text} />
      </IPayBottomSheet>

      <IPayPortalBottomSheet
        noGradient
        heading="TOP_UP.ADD_MONEY_USING"
        onCloseBottomSheet={closeBottomSheetTopUp}
        customSnapPoint={SNAP_POINT.XS_SMALL}
        ref={topUpSelectionRef}
        enablePanDownToClose
        simpleHeader
        simpleBar
        bold
        cancelBnt
        isVisible={topUpOptionsVisible}
      >
        <IPayTopUpSelection
          testID="topUp-selection"
          closeBottomSheet={closeBottomSheetTopUp}
          topupItemSelected={topupItemSelected}
        />
      </IPayPortalBottomSheet>
      <IPayBottomSheet
        doneBtn
        doneText="COMMON.DONE"
        onDone={onPressSelectDate}
        simpleBar
        heading="MUSANED.SELECT_MONTH"
        ref={refBottomSheet}
        isVisible
        cancelBnt
      >
        <IPayMonthYearPicker onDateChange={setSelectedFromDate} value={selectedFromDate} minimumDate={new Date()} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default MusanedPaySalaryScreen;
