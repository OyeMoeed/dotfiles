import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayListView } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPayBottomSheet, IPayTransferInformation } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import { APIResponseType, buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
import getSarieTransferFees from '@app/network/services/cards-management/get-sarie-transfer-fees/get-sarie-transfer-fees.service';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import colors from '@app/styles/colors.const';
import icons from '@app/assets/icons';
import localTransferPrepare from '@app/network/services/local-transfer/local-transfer-prepare/local-transfer-prepare.service';
import { LocalTransferPreparePayloadTypes } from '@app/network/services/local-transfer/local-transfer-prepare/local-transfer-prepare.interface';
import transferInformationStyles from './transfer-information.style';

const TransferInformation: React.FC = () => {
  const styles = transferInformationStyles();
  const localizationText = useLocalization();
  const { appData } = useTypedSelector((state) => state.appDataReducer);
  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const [chipValue, setChipValue] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const reasonsBottomSheetRef = useRef(null);
  const { transferReasonData } = useConstantData();
  const [isLoadingGetFees, setIsLoadingGetFees] = useState<boolean>(false);
  const [isLoadingPrepare, setIsLoadingPrepare] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string>('');
  const { showToast } = useToastContext();
  const { walletNumber } = useTypedSelector((state) => state.userInfoReducer.userInfo);

  const { limitsDetails, availableBalance, currentBalance } = walletInfo;
  const { monthlyRemainingOutgoingAmount, dailyRemainingOutgoingAmount, monthlyOutgoingLimit } = limitsDetails;

  const bankDetails = constants.BANK_DETAILS;

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

  const onCloseSheet = () => {
    reasonsBottomSheetRef?.current?.close();
  };

  const onPressListItem = (reason: string) => {
    setSelectedReason(reason);
    onCloseSheet();
  };

  const onPressSelectReason = () => {
    reasonsBottomSheetRef?.current?.present();
  };

  const checkIsButtonDisabled = () => {
    if (transferAmount && selectedReason) {
      return false;
    }
    return true;
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
    setIsLoadingGetFees(true);
    if (walletNumber) {
      try {
        const bankCode = '123';

        const apiResponse = await getSarieTransferFees(walletNumber, bankCode, transferAmount);
        if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
          return apiResponse?.response;
        }
        if (apiResponse?.apiResponseNotOk) {
          setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          return null;
        }
        setAPIError(apiResponse?.error);
        setIsLoadingGetFees(false);
        return null;
      } catch (error) {
        setIsLoadingGetFees(false);
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
    if (transferAmount && selectedReason && walletNumber) {
      setIsLoadingPrepare(true);
      const transferFees = await getTransferFee();
      if (transferFees) {
        try {
          const payload: LocalTransferPreparePayloadTypes = {
            beneficiaryCode: '',
            transferPurpose: selectedReason,
            feesAmount: transferFees.feeAmount,
            vatAmount: transferFees.vatAmount,
            bankFeesAmount: transferFees.bankFeeAmount,
            bankVatAmount: transferFees.bankVatAmount,
            amountCurrency: '',
            amount: transferAmount,
            deductFeesFromAmount: false,
            deviceInfo: {
              platformVersion: '',
              deviceId: '',
              deviceName: '',
              platform: '',
            },
          };

          const apiResponse = await localTransferPrepare(walletNumber, payload);
          if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
            navigate(ScreenNames.TRANSFER_CONFIRMATION, {
              amount: transferAmount,
              beneficiaryNickName: 'Miles',
              transferPurpose: selectedReason,
              fastConversionBy: 'Sarie',
              note: notes,
              otpRef: apiResponse.response.otpRef,
              feesAmount: transferFees.feeAmount,
              vatAmount: transferFees.vatAmount,
              totalAmount: getTotal(transferFees.feeAmount, transferFees.vatAmount, transferAmount),
              authentication: apiResponse?.authentication,
            });
          } else if (apiResponse?.apiResponseNotOk) {
            setAPIError(localizationText.ERROR.API_ERROR_RESPONSE);
          } else {
            setAPIError(apiResponse?.error);
          }
          setIsLoadingPrepare(false);
        } catch (error) {
          setIsLoadingPrepare(false);
          setAPIError(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
          renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
        }
      } else {
        setIsLoadingPrepare(true);
      }
    }
  };

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.TRANSFER.TRANSFER_INFRORMATION} />
      <IPayView style={styles.container}>
        <IPayAccountBalance
          balance={availableBalance}
          availableBalance={currentBalance}
          hideBalance={appData?.hideBalance}
          showRemainingAmount
          onPressTopup={() => {}}
        />

        <IPayView style={styles.bankDetailsView}>
          <IPayTransferInformation
            style={styles.transferContainer}
            amount={transferAmount}
            setAmount={setAmount}
            setSelectedItem={setSelectedReason}
            selectedItem={selectedReason}
            setNotes={setNotes}
            notes={notes}
            chipValue={chipValue}
            transferInfo
            transferInfoData={bankDetails}
            openReason={onPressSelectReason}
          />
        </IPayView>
        <IPayButton
          disabled={checkIsButtonDisabled()}
          onPress={onLocalTransferPrepare}
          btnType={buttonVariants.PRIMARY}
          large
          btnIconsDisabled
          btnText={localizationText.COMMON.NEXT}
          btnStyle={styles.nextBtn}
        />
      </IPayView>

      <IPayBottomSheet
        heading={localizationText.TRANSACTION_HISTORY.TRANSACTION_DETAILS}
        onCloseBottomSheet={onCloseSheet}
        customSnapPoint={['20%', '65%']}
        ref={reasonsBottomSheetRef}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <IPayListView list={transferReasonData} onPressListItem={onPressListItem} selectedListItem={selectedReason} />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default TransferInformation;
