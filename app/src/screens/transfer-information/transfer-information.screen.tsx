import { IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayListView } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { ListProps } from '@app/components/molecules/ipay-list-view/ipay-list-view.interface';
import { IPayBottomSheet, IPayTransferInformation } from '@app/components/organism';
import { IPaySafeAreaView, IPayTopUpSelection } from '@app/components/templates';
import { useKeyboardStatus } from '@app/hooks';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getSarieTransferFees from '@app/network/services/cards-management/get-sarie-transfer-fees/get-sarie-transfer-fees.service';
import { IGetCoreLovPayload } from '@app/network/services/core/lov/get-lov.interface';
import { getCoreLov } from '@app/network/services/core/lov/get-lov.service';
import { LocalTransferPreparePayloadTypes } from '@app/network/services/local-transfer/local-transfer-prepare/local-transfer-prepare.interface';
import localTransferPrepare from '@app/network/services/local-transfer/local-transfer-prepare/local-transfer-prepare.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { regex } from '@app/styles/typography.styles';
import { ApiResponseStatusType, APIResponseType, buttonVariants } from '@app/utilities/enums.util';
import { removeCommas } from '@app/utilities/number-helper.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import { SNAP_POINT } from '@app/constants/constants';
import getAktharPoints from '@app/network/services/cards-management/mazaya-topup/get-points/get-points.service';
import { BeneficiaryDetails } from '../local-transfer/local-transfer.interface';
import transferInformationStyles from './transfer-information.style';
import { ReasonListItem } from './trasnfer-information.interface';

const TransferInformation: React.FC = () => {
  const styles = transferInformationStyles();
  const { t } = useTranslation();
  const appData = useTypedSelector((state) => state.appDataReducer.appData);
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { walletNumber } = walletInfo;

  const [chipValue, setChipValue] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<ReasonListItem>();
  const [notes, setNotes] = useState<string>('');
  const reasonsBottomSheetRef = useRef<any>(null);
  const [transferReason, setTransferReasonData] = useState<ListProps[]>([]);

  type RouteProps = RouteProp<
    {
      params: {
        beneficiaryDetails: BeneficiaryDetails;
      };
    },
    'params'
  >;
  const route = useRoute<RouteProps>();
  const {
    beneficiaryBankDetail,
    nickname: beneficiaryNickName,
    beneficiaryCode,
    fullName,
    beneficiaryAccountNumber,
  } = route.params.beneficiaryDetails;
  const { bankCode, bankName } = beneficiaryBankDetail;

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
    const hasValidReason = selectedReason !== undefined ? selectedReason?.text?.trim() !== '' : false;
    return !hasValidAmount || !hasValidReason;
  };
  const onCloseSheet = () => {
    reasonsBottomSheetRef?.current?.close();
  };

  const onPressListItem = (item: any) => {
    setSelectedReason(item);
    onCloseSheet();
  };

  const onPressSelectReason = () => {
    reasonsBottomSheetRef?.current?.present();
  };

  const getTransferFee = async () => {
    if (walletNumber) {
      const apiResponse = await getSarieTransferFees(walletNumber, bankCode, transferAmount);
      if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
        return apiResponse?.response;
      }
    }
    return null;
  };

  const getTotal = (feesAmount: string, vatAmount: string, amount: string) => {
    const total = Number(vatAmount) + Number(feesAmount) + Number(amount);
    return total;
  };

  const onLocalTransferPrepare = async () => {
    if (transferAmount && selectedReason?.id && walletNumber) {
      const transferFees = await getTransferFee();
      if (transferFees) {
        const deviceInfo = await getDeviceInfo();
        const payload: LocalTransferPreparePayloadTypes = {
          beneficiaryCode,
          transferPurpose: selectedReason?.id,
          feesAmount: transferFees.feeAmount,
          vatAmount: transferFees.vatAmount,
          bankFeesAmount: transferFees.bankFeeAmount,
          bankVatAmount: transferFees.bankVatAmount,
          amount: transferAmount,
          note: notes,
          bankCode,
          transferNetwork,
          deviceInfo: {
            platform: deviceInfo?.platform,
            platformVersion: deviceInfo?.platformVersion,
            deviceName: deviceInfo?.deviceName,
            deviceId: deviceInfo?.deviceId,
          },
        };
        const apiResponse = await localTransferPrepare(walletNumber, payload);
        if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
          navigate(ScreenNames.TRANSFER_CONFIRMATION, {
            amount: transferAmount,
            beneficiaryNickName,
            transferPurpose: selectedReason?.text,
            instantTransferType: t('TRANSFER_SUMMARY.SARIE'),
            note: notes,
            otpRef: apiResponse.response.otpRef,
            feesAmount: transferFees.feeAmount,
            vatAmount: transferFees.vatAmount,
            totalAmount: getTotal(transferFees.feeAmount, transferFees.vatAmount, transferAmount),
            authentication: apiResponse?.authentication,
            bankDetails,
          });
        }
      }
    }
  };

  const getTransferReasons = async () => {
    const payload: IGetCoreLovPayload = {
      lovType: '184',
      lovCode2: 'W',
      deviceInfo: (await getDeviceInfo()) as DeviceInfoProps,
    };
    const apiResponse = await getCoreLov(payload);
    if (apiResponse?.status.type === ApiResponseStatusType.SUCCESS) {
      if (apiResponse?.response?.lovInfo)
        setTransferReasonData(
          apiResponse?.response?.lovInfo.map((item) => ({
            id: item.recTypeCode,
            text: item.recDescription,
          })),
        );
    }
  };

  useEffect(() => {
    getTransferReasons();
  }, []);

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
            monthlyIncomingLimit=""
          />

          <IPayView style={styles.bankDetailsView}>
            <IPayTransferInformation
              style={styles.transferContainer}
              amount={transferAmount}
              currencyStyle={[styles.currency, transferAmount ? styles.inputActiveStyle : null]}
              setAmount={setAmount}
              selectedItem={selectedReason?.text}
              setNotes={setNotes}
              notes={notes}
              chipValue={chipValue}
              transferInfo
              transferInfoData={bankDetails}
              openReason={onPressSelectReason}
              inputFieldStyle={styles.inputFieldStyle}
              setSelectedItem={() => {}}
            />
          </IPayView>
        </IPayView>
      </IPayScrollView>
      {!isKeyboardOpen ? (
        <IPayView style={styles.buttonContainer}>
          <IPayButton
            onPress={onLocalTransferPrepare}
            btnType={buttonVariants.PRIMARY}
            large
            disabled={isTransferButtonDisabled() || Boolean(chipValue)}
            btnIconsDisabled
            btnText="COMMON.NEXT"
            btnStyle={styles.nextBtn}
          />
        </IPayView>
      ) : (
        <IPayView />
      )}
      <IPayBottomSheet
        heading="COMMON.REASON_OF_TRANSFER"
        onCloseBottomSheet={onCloseSheet}
        customSnapPoint={['20%', '65%']}
        ref={reasonsBottomSheetRef}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <IPayListView list={transferReason} onPressListItem={onPressListItem} selectedListItem={selectedReason?.text} />
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
        <IPayTopUpSelection testID="topUp-selection" topupItemSelected={topupItemSelected} />
      </IPayPortalBottomSheet>
    </IPaySafeAreaView>
  );
};

export default TransferInformation;
