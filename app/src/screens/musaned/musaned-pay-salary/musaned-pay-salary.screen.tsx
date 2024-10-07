import React, { createRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import icons from '@app/assets/icons';
import { IPayMonthYearPicker, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayHeader, IPayListView, SadadFooterComponent } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPaySalaryPayDateSelector, IPaySalaryPayInformation } from '@app/components/organism';
import { IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import { RouteProp, useRoute } from '@react-navigation/native';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { SNAP_POINT } from '@app/constants/constants';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import { isArabic } from '@app/utilities/constants';
import { BalanceStatusVariants } from '@app/components/templates/ipay-bill-balance/ipay-bill-balance.interface';
import { AccountBalanceStatus } from '@app/enums';
import { MusnaedInqueryRecords } from '@app/network/services/musaned';
import { SelectedValue } from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.interface';
import useTheme from '@app/styles/hooks/theme.hook';

import { DeductionReasons, MusanedPaySalaryScreenProps, SalaryCategories } from './musaned-pay-salary.interface';
import musanedPaySalary from './musaned-pay-salary.style';
import { MusanedPaySalaryConfirmPaymentInfo } from '../musaned-pay-salary-confirm/musaned-pay-salary-confirm.interface';
import { convertToLocalDate } from '../musaned.utils';
import IPayMusnaedSalaryTypeBottomSheet from '../components/ipay-musaned-salary-type-bottom-sheet';

const MusanedPaySalaryScreen: React.FC<MusanedPaySalaryScreenProps> = () => {
  const { colors } = useTheme();
  const styles = musanedPaySalary(colors);
  const { t } = useTranslation();

  type RouteProps = RouteProp<any>;
  const { params } = useRoute<RouteProps>();
  const { name, occupationAr, occupationEn, payrollAmount, lastPaidSalaryDate } =
    (params as MusnaedInqueryRecords) || {};

  const appData = useTypedSelector((state) => state.appDataReducer.appData);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { walletNumber } = walletInfo;
  const accountBalanceStatus = AccountBalanceStatus.ACCOUNT_BALANCE; // TODO will be updated on basis of, API

  const minDatePaid = convertToLocalDate(lastPaidSalaryDate);
  const salaryTypes: SelectedValue[] = [
    { id: SalaryCategories.Monthly_Salary, text: 'MUSANED.MONTHLY_SALARY' },
    { id: SalaryCategories.Advanced_Salary, text: 'MUSANED.ADVANCED_SALARY' },
    { id: SalaryCategories.Bonus_Salary, text: 'MUSANED.BONUS_SALARY' },
  ];
  const deductReasonsTypes = [
    { id: DeductionReasons.Rent, text: 'MUSANED.DEDUCT_RENT' },
    { id: DeductionReasons.Loan, text: 'MUSANED.DEDUCT_LOAN' },
    { id: DeductionReasons.Other, text: 'MUSANED.DEDUCT_OTHER' },
  ];

  const [salaryType, setSalaryType] = useState<SelectedValue>(salaryTypes[0]);
  const [selectedDeductionReason, setDeductionReasonsTypes] = useState<{ text?: string }>({});
  const [deductionAmount, setDeductionAmount] = useState<string | number>('');
  const [payExtraAmount, setPayExtraAmount] = useState<string | number>('');
  const [payExtraNote, setPayExtraNote] = useState('');
  const [selectedPrevDate, setSelectedPrevDate] = useState<Date | string | null>('');
  const [selectedPrevToDate, setSelectedPrevToDate] = useState<Date | string | null>('');
  const [selectedFromDate, setSelectedFromDate] = useState<Date | string | null>('');
  const [selectedToDate, setSelectedToDate] = useState<Date | string | null>('');

  const [bonusAmount, setBonusAmount] = useState<string | number>('');
  const [bonusAmountNote, setBonusAmountNote] = useState('');
  const [deductFlag, setDeductFlag] = useState(false);
  const [payExtraFlag, setPayExtraFlag] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState<'FROM_DATE' | 'TO_DATE'>('FROM_DATE');

  const [deductionReasonVisible, setDeductionReasonVisible] = useState(false);
  const [monthBottomSheetVisible, setMonthBottomSheetVisible] = useState(false);
  const refMonthsBottomSheet = useRef<any>(null);
  const salaryTypeBottomSheetRef = useRef<any>(null);
  const deductionReasonBottomSheetRef = useRef<any>(null);

  const comingMonthsCount = moment(`02/${selectedToDate}`, 'DD/MM/YYYY').diff(
    moment(`02/${selectedFromDate}`, 'DD/MM/YYYY'),
    'month',
  );
  const isToDateLessThanFromDate = comingMonthsCount < 0;
  const isToDateMoreThan6 = comingMonthsCount > 6;

  const isAdvanceSalary = salaryType.id === SalaryCategories.Advanced_Salary;
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

  const { availableBalance, currentBalance } = walletInfo;

  const clearData = () => {
    setSelectedFromDate('');
    setSelectedPrevDate('');
    setSelectedPrevToDate('');
    setSelectedToDate('');
    setSelectedDateType('FROM_DATE');

    setDeductFlag(false);
    setDeductionAmount('');
    setBonusAmount(0);

    setPayExtraFlag(false);
    setPayExtraAmount(0);
    setPayExtraNote('');
  };

  const onCloseSalaryTypesSheet = () => {
    salaryTypeBottomSheetRef?.current?.onHideSalaryType();
  };

  const onDeductionReasonCloseSheet = () => {
    setDeductionReasonVisible(false);
    deductionReasonBottomSheetRef?.current?.close();
  };

  const onPressSelectReason = () => {
    salaryTypeBottomSheetRef?.current?.onShowSalaryType();
  };
  const onPressSelectSalaryTypeItem = (item: SelectedValue) => {
    setSalaryType(item);
    onCloseSalaryTypesSheet();
    clearData();
  };

  const onPressDeductionReasonItem = (item: SelectedValue) => {
    setDeductionReasonsTypes(item);
    onDeductionReasonCloseSheet();
  };

  const onPressDeductionShow = () => {
    setDeductionReasonVisible(true);
    deductionReasonBottomSheetRef?.current?.present();
  };

  const onLocalTransferPrepare = async () => {
    const dateFromDays = comingMonthsCount === 0 ? 1 : comingMonthsCount;
    const totalSalary =
      Number(payrollAmount) * (isAdvanceSalary ? dateFromDays : 1) -
      Number(deductionAmount || 0) +
      Number(payExtraAmount || 0);

    const paymentInfoData: MusanedPaySalaryConfirmPaymentInfo = {
      fromDate: selectedPrevDate,
      toDate: selectedPrevToDate,
      totalSalary,
      basicSalary: payrollAmount,
      extraAmount: payExtraAmount,
      bonusAmount,
      note: payExtraNote || bonusAmountNote,
      fees: 0,
      vat: 0,
      deductionAmount,
      deductionReason: selectedDeductionReason.text,
      salaryType,
    };

    navigate(ScreenNames.MUSANED_PAY_SALARY_CONFIRM, {
      userInfo: params,
      paymentInfo: paymentInfoData,
    });
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

  const topupItemSelected = (routeName: string, paramsTopup: {}) => {
    closeBottomSheetTopUp();
    if (routeName === ScreenNames.POINTS_REDEMPTIONS) {
      navigateTOAktharPoints();
    } else {
      navigate(routeName, paramsTopup);
    }
  };

  const onCloseDatePicker = () => {
    setMonthBottomSheetVisible(false);
  };

  const openDatePicker = () => {
    setMonthBottomSheetVisible(true);
    refMonthsBottomSheet.current?.present();
  };

  const onPressDeductFlag = () => {
    setDeductFlag(!deductFlag);
  };

  const onPressPayExtraFlag = () => {
    setPayExtraFlag(!payExtraFlag);
  };

  const onPressSelectDate = () => {
    const currentYear = moment().format('YYYY');
    const currentMonthData = moment().format('M');
    const currentFullDate = `${currentMonthData}/${currentYear}`;

    if (selectedDateType === 'TO_DATE') {
      setSelectedPrevToDate(selectedToDate || currentFullDate);
    }
    if (selectedDateType === 'FROM_DATE') {
      setSelectedPrevDate(selectedFromDate || currentFullDate);
    }
  };

  const disabledBtn = () => {
    const checkPayExtra = payExtraFlag ? payExtraAmount : true;
    const checkDeduction = deductFlag ? deductionAmount && selectedDeductionReason.text : true;

    switch (salaryType.id) {
      case SalaryCategories.Monthly_Salary: {
        return !(selectedPrevDate && checkDeduction && checkPayExtra);
      }
      case SalaryCategories.Advanced_Salary: {
        return !(selectedPrevDate && checkDeduction && checkPayExtra);
      }
      case SalaryCategories.Bonus_Salary: {
        return !bonusAmount;
      }
      default:
        return false;
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
              salaryType={salaryType?.text}
              salaryId={salaryType?.id}
              openReason={onPressSelectReason}
              inputFieldStyle={styles.inputFieldStyle}
              onPressDatePicker={openDatePicker}
              onPressDeductFlag={onPressDeductFlag}
              onPressPayExtraFlag={onPressPayExtraFlag}
              payExtraFlag={payExtraFlag}
              deductFlag={deductFlag}
              amount={payrollAmount}
              selectedFromDate={selectedPrevDate}
              selectedToDate={selectedPrevToDate}
              onPressDeductionShow={onPressDeductionShow}
              deductionAmount={deductionAmount}
              setDeductionAmount={setDeductionAmount}
              payExtraAmount={payExtraAmount}
              setPayExtraAmount={setPayExtraAmount}
              selectedDeductionReason={selectedDeductionReason}
              payExtraNote={payExtraNote}
              setPayExtraNote={setPayExtraNote}
              bonusAmount={bonusAmount}
              setBonusAmount={setBonusAmount}
              setDeductionReasonsTypes={setDeductionReasonsTypes}
              setBonusAmountNote={setBonusAmountNote}
              bonusAmountNote={bonusAmountNote}
              isToDateLessThanFromDate={isToDateLessThanFromDate}
              isToDateMoreThan6={isToDateMoreThan6}
              comingMonthsCount={comingMonthsCount}
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>

      <IPayView style={styles.buttonContainer}>
        <SadadFooterComponent
          btnText="COMMON.NEXT"
          disableBtnIcons
          btnDisabled={balanceStatusVariants[accountBalanceStatus]?.disabledBtn || disabledBtn()}
          testID="ipay-bill"
          showTopMessage
          totalAmountText={balanceStatusVariants[accountBalanceStatus]?.warningText}
          totalAmountStyle={styles.nextBtn}
          showButtonOnly={!balanceStatusVariants[accountBalanceStatus]?.disabledBtn}
          totalAmountLeftIcon={{
            icon: icons.sheild_cross,
            color: colors.natural.natural1000,
          }}
          onPressBtn={onLocalTransferPrepare}
          partialPay
        />
      </IPayView>

      <IPayMusnaedSalaryTypeBottomSheet
        ref={salaryTypeBottomSheetRef}
        salaryType={salaryType}
        onPressSelectSalaryTypeItem={onPressSelectSalaryTypeItem}
      />

      <IPayPortalBottomSheet
        heading="MUSANED.DEDUCTION_REASON"
        onCloseBottomSheet={onDeductionReasonCloseSheet}
        customSnapPoint={['40%']}
        isVisible={deductionReasonVisible}
        ref={deductionReasonBottomSheetRef}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <IPayListView
          list={deductReasonsTypes}
          onPressListItem={onPressDeductionReasonItem}
          selectedListItem={selectedDeductionReason?.text}
        />
      </IPayPortalBottomSheet>

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
        <IPayTopUpSelection testID="topUp-selection" topupItemSelected={topupItemSelected} />
      </IPayPortalBottomSheet>
      <IPayPortalBottomSheet
        doneBtn={isAdvanceSalary ? !isToDateMoreThan6 && !isToDateLessThanFromDate : true}
        doneText="COMMON.DONE"
        onDone={onPressSelectDate}
        simpleBar
        heading="MUSANED.SELECT_MONTH"
        ref={refMonthsBottomSheet}
        isVisible={monthBottomSheetVisible}
        customSnapPoint={['50%']}
        cancelBnt
        onCancel={onCloseDatePicker}
        onCloseBottomSheet={onCloseDatePicker}
      >
        {isAdvanceSalary ? (
          <IPaySalaryPayDateSelector
            isAdvanceSalary
            onPressDatePicker={(value) => setSelectedDateType(value || 'FROM_DATE')}
            selectedDate={selectedFromDate}
            selectedToDate={selectedToDate}
            inputFieldStyleFromDate={selectedDateType === 'FROM_DATE' ? styles.inputDateFieldStyle : {}}
            inputFieldStyleToDate={selectedDateType === 'TO_DATE' ? styles.inputDateFieldStyle : {}}
            isToDateLessThanFromDate={isToDateLessThanFromDate}
            isToDateMoreThan6={isToDateMoreThan6}
            comingMonthsCount={comingMonthsCount}
          />
        ) : (
          <IPayView />
        )}
        <IPayMonthYearPicker
          onDateChange={(date) => {
            if (selectedDateType === 'FROM_DATE') {
              setSelectedFromDate(date);
              return;
            }
            if (selectedDateType === 'TO_DATE') {
              setSelectedToDate(date);
            }
          }}
          value={minDatePaid || selectedFromDate}
          withYear20
          withLongMonth
        />
      </IPayPortalBottomSheet>
    </IPaySafeAreaView>
  );
};

export default MusanedPaySalaryScreen;