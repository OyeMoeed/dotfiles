import icons from '@app/assets/icons';
import { IPayIcon, IPayMonthYearPicker, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayListView } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPaySalaryPayInformation } from '@app/components/organism';
import { IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { useKeyboardStatus } from '@app/hooks';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getSarieTransferFees from '@app/network/services/cards-management/get-sarie-transfer-fees/get-sarie-transfer-fees.service';
import { LocalTransferPreparePayloadTypes } from '@app/network/services/local-transfer/local-transfer-prepare/local-transfer-prepare.interface';
import localTransferPrepare from '@app/network/services/local-transfer/local-transfer-prepare/local-transfer-prepare.service';
import { getDeviceInfo } from '@app/network/utilities';
import colors from '@app/styles/colors.const';
import { regex } from '@app/styles/typography.styles';
import { APIResponseType, buttonVariants } from '@app/utilities/enums.util';
import { removeCommas } from '@app/utilities/number-helper.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { SNAP_POINT } from '@app/constants/constants';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import musanedPaySalary from './musaned-pay-salary.style';
import { MusanedPaySalaryScreenProps, SalaryCategories } from './musaned-pay-salary.interface';
import { isArabic } from '@app/utilities/constants';

const MusanedPaySalaryScreen: React.FC<MusanedPaySalaryScreenProps> = () => {
  const styles = musanedPaySalary();
  const { t } = useTranslation();

  const { params } = useRoute();
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

  const [chipValue, setChipValue] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState({});
  const [apiError, setAPIError] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState('');
  const [deductFlag, setDeductFlag] = useState(false);
  const [payExtraFlag, setPayExtraFlag] = useState(false);

  const refBottomSheet = useRef(null);
  const salaryTypeBottomSheetRef = useRef(null);

  const salaryTypes = [
    { id: SalaryCategories.Monthly_Salary, text: 'MUSANED.MONTHLY_SALARY' },
    { id: SalaryCategories.Advanced_Salary, text: 'MUSANED.ADVANCED_SALARY' },
    { id: SalaryCategories.Bonus_Salary, text: 'MUSANED.BONUS_SALARY' },
  ];

  const { showToast } = useToastContext();

  type RouteProps = RouteProp<any>;
  const route = useRoute<RouteProps>();
  const {
    beneficiaryBankDetail,
    nickname: beneficiaryNickName,
    beneficiaryCode,
    fullName,
    beneficiaryAccountNumber,
  } = route?.params?.beneficiaryDetails || {};
  const { bankCode, bankName } = beneficiaryBankDetail || {};

  const { limitsDetails, availableBalance, currentBalance } = walletInfo;
  const { monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount, monthlyOutgoingLimit } = limitsDetails;

  const { isKeyboardOpen } = useKeyboardStatus();
  const bankDetails = {
    icon: bankCode ?? '',
    bankName,
    title: fullName ?? '',
    accountNumber: beneficiaryAccountNumber ?? '',
  };

  const transferNetwork = 'IPS'; // TODO need to replace.

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

  const setAmount = (text: string | number) => {
    const newAmount = removeCommas(text.toString());
    const reg = regex.AMOUNT;
    if (reg.test(newAmount.toString()) || newAmount === '') {
      setTransferAmount?.(newAmount.toString());
    }
  };

  const isTransferButtonDisabled = () => {
    const hasValidAmount = parseFloat(transferAmount) > 0 || parseFloat(transferAmount);
    const hasValidReason = selectedReason?.text?.trim() !== '';
    return !hasValidAmount || !hasValidReason;
  };
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

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      subTitle: apiError,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getTransferFee = async () => {
    if (walletNumber) {
      try {
        const apiResponse = await getSarieTransferFees(walletNumber, bankCode, transferAmount);
        if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
          return apiResponse?.response;
        }
        if (apiResponse?.apiResponseNotOk) {
          setAPIError(t('ERROR.API_ERROR_RESPONSE'));
          return null;
        }
        setAPIError(apiResponse?.error);
        return null;
      } catch (error) {
        setAPIError(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
        renderToast(error?.message || t('ERROR.SOMETHING_WENT_WRONG'));
        return null;
      }
    } else {
      return null;
    }
  };

  const getTotal = (feesAmount: string, vatAmount: string, amount: string) => {
    const total = Number(vatAmount) + Number(feesAmount) + Number(amount);
    return total;
  };

  const onLocalTransferPrepare = async () => {};

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

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title="TRANSFER.TRANSFER_INFRORMATION" />
      <IPayScrollView>
        <IPayView style={styles.container}>
          <IPayAccountBalance
            balance={availableBalance}
            availableBalance={currentBalance}
            hideBalance={appData?.hideBalance}
            showRemainingAmount
            onPressTopup={topUpSelectionBottomSheet}
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
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>
      <IPayView style={styles.buttonContainer}>
        <IPayButton
          onPress={onLocalTransferPrepare}
          btnType={buttonVariants.PRIMARY}
          large
          btnIconsDisabled
          btnText="COMMON.NEXT"
          btnStyle={styles.nextBtn}
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
      <IPayBottomSheet simpleBar heading="MUSANED.SELECT_MONTH" ref={refBottomSheet} isVisible={true} cancelBnt>
        <IPayMonthYearPicker onDateChange={setExpiryDate} value={expiryDate} minimumDate={new Date()} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default MusanedPaySalaryScreen;
