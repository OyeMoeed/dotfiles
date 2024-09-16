import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayListView } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { ListProps } from '@app/components/molecules/ipay-list-view/ipay-list-view.interface';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPayBottomSheet, IPayTransferInformation } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { useKeyboardStatus } from '@app/hooks';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getSarieTransferFees from '@app/network/services/cards-management/get-sarie-transfer-fees/get-sarie-transfer-fees.service';
import { IGetCoreLovPayload } from '@app/network/services/core/lov/get-lov.interface';
import { getCoreLov } from '@app/network/services/core/lov/get-lov.service';
import { LocalTransferPreparePayloadTypes } from '@app/network/services/local-transfer/local-transfer-prepare/local-transfer-prepare.interface';
import localTransferPrepare from '@app/network/services/local-transfer/local-transfer-prepare/local-transfer-prepare.service';
import { DeviceInfoProps } from '@app/network/services/services.interface';
import { getDeviceInfo } from '@app/network/utilities';
import { useTypedSelector } from '@app/store/store';
import colors from '@app/styles/colors.const';
import { ApiResponseStatusType, APIResponseType, buttonVariants } from '@app/utilities/enums.util';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { BeneficiaryDetails } from '../local-transfer/local-transfer.interface';
import transferInformationStyles from './transfer-information.style';
import { ReasonListItem } from './trasnfer-information.interface';

const TransferInformation: React.FC = () => {
  const styles = transferInformationStyles();
  const localizationText = useLocalization();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const [chipValue, setChipValue] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<ReasonListItem>({});
  const [notes, setNotes] = useState<string>('');
  const reasonsBottomSheetRef = useRef(null);
  const [apiError, setAPIError] = useState<string>('');
  const [transferReason, setTransferReasonData] = useState<ListProps[]>([]);

  const { showToast } = useToastContext();
  const { walletNumber } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

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

  useEffect(() => {
    const monthlyRemaining = parseFloat(monthlyRemainingOutgoingAmount);
    const monthlyTotalRemainingLimit = parseFloat(monthlyOutgoingLimit);
    const updatedTopUpAmount = parseFloat(transferAmount.replace(/,/g, ''));

    if (monthlyRemaining === 0 || updatedTopUpAmount > monthlyRemaining) {
      setChipValue(localizationText.TOP_UP.AMOUNT_EXCEEDS_CURRENT);
    } else if (updatedTopUpAmount > monthlyTotalRemainingLimit) {
      setChipValue(localizationText.TOP_UP.MONTHLY_SPENDING_LIMIT_REACHED);
    } else {
      setChipValue('');
    }
  }, [transferAmount, monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount]);

  const setAmount = (text: string | number) => {
    setTransferAmount(text.toString());
  };

  const isTransferButtonDisabled = () => {
    const hasValidAmount = parseFloat(transferAmount) > 0 || parseFloat(transferAmount);
    const hasValidReason = selectedReason?.text?.trim() !== '';
    return !hasValidAmount || !hasValidReason;
  };
  const onCloseSheet = () => {
    reasonsBottomSheetRef?.current?.close();
  };

  const onPressListItem = (item: ReasonListItem) => {
    setSelectedReason(item);
    onCloseSheet();
  };

  const onPressSelectReason = () => {
    reasonsBottomSheetRef?.current?.present();
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
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          return null;
        }
        setAPIError(apiResponse?.error);
        return null;
      } catch (error) {
        setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
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

  const onLocalTransferPrepare = async () => {
    if (transferAmount && selectedReason?.id && walletNumber) {
      const transferFees = await getTransferFee();
      if (transferFees) {
        try {
          const deviceInfo = await getDeviceInfo();
          const payload: LocalTransferPreparePayloadTypes = {
            beneficiaryCode,
            transferPurpose: selectedReason?.id,
            feesAmount: transferFees.feeAmount,
            vatAmount: transferFees.vatAmount,
            bankFeesAmount: transferFees.bankFeeAmount,
            bankVatAmount: transferFees.bankVatAmount,
            amountCurrency: 'SAR',
            amount: transferAmount,
            deductFeesFromAmount: false,
            deviceInfo,
          };
          const apiResponse = await localTransferPrepare(walletNumber, payload);
          if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
            navigate(ScreenNames.TRANSFER_CONFIRMATION, {
              amount: transferAmount,
              beneficiaryNickName,
              transferPurpose: selectedReason?.text,
              instantTransferType: localizationText.TRANSFER_SUMMARY.SARIE,
              note: notes,
              otpRef: apiResponse.response.otpRef,
              feesAmount: transferFees.feeAmount,
              vatAmount: transferFees.vatAmount,
              totalAmount: getTotal(transferFees.feeAmount, transferFees.vatAmount, transferAmount),
              authentication: apiResponse?.authentication,
              bankDetails,
            });
          } else if (apiResponse?.apiResponseNotOk) {
            setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          } else {
            setAPIError(apiResponse?.error);
          }
        } catch (error) {
          setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
          renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
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

  const onPressTopup = () => navigate(ScreenNames.WALLET);

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.TRANSFER.TRANSFER_INFRORMATION} />
      <IPayScrollView>
        <IPayView style={styles.container}>
          <IPayAccountBalance
            balance={availableBalance}
            availableBalance={currentBalance}
            hideBalance={appData?.hideBalance}
            showRemainingAmount
            onPressTopup={onPressTopup}
          />

          <IPayView style={styles.bankDetailsView}>
            <IPayTransferInformation
              style={styles.transferContainer}
              amount={transferAmount}
              currencyStyle={[styles.currency, transferAmount && styles.inputActiveStyle]}
              setAmount={setAmount}
              selectedItem={selectedReason?.text}
              setNotes={setNotes}
              notes={notes}
              chipValue={chipValue}
              transferInfo
              transferInfoData={bankDetails}
              openReason={onPressSelectReason}
              inputFieldStyle={styles.inputFieldStyle}
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
            btnText={localizationText.COMMON.NEXT}
            btnStyle={styles.nextBtn}
          />
        </IPayView>
      ) : (
        <IPayView />
      )}
      <IPayBottomSheet
        heading={localizationText.COMMON.REASON_OF_TRANSFER}
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
    </IPaySafeAreaView>
  );
};

export default TransferInformation;
