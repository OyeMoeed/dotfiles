import { IPayScrollView, IPayView } from '@app/components/atoms';
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
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useRef, useState } from 'react';
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
  const { localTransferReasonData } = useConstantData();

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

  const isTransferButtonDisabled = () => {
    const hasValidAmount = transferAmount > 0;
    const hasValidReason = selectedReason.trim() !== '';
    return !hasValidAmount || !hasValidReason;
  };
  const onCloseSheet = () => {
    reasonsBottomSheetRef?.current?.close();
  };

  const onPressListItem = (item: { text: string; id: number }) => {
    setSelectedReason(item.text);
    onCloseSheet();
  };

  const onPressSelectReason = () => {
    reasonsBottomSheetRef?.current?.present();
  };

  const onPressNext = () => {
    if (transferAmount && selectedReason) {
      navigate(ScreenNames.TRANSFER_CONFIRMATION);
    }
  };

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
          />

          <IPayView style={styles.bankDetailsView}>
            <IPayTransferInformation
              style={styles.transferContainer}
              amount={transferAmount}
              currencyStyle={styles.currency}
              setAmount={setAmount}
              setSelectedItem={setSelectedReason}
              selectedItem={selectedReason}
              setNotes={setNotes}
              notes={notes}
              chipValue={chipValue}
              transferInfo
              transferInfoData={bankDetails}
              openReason={onPressSelectReason}
              inputFieldStyle={styles.inputFieldStyle}
            />
          </IPayView>
          <IPayButton
            onPress={onPressNext}
            btnType={buttonVariants.PRIMARY}
            large
            disabled={isTransferButtonDisabled()}
            btnIconsDisabled
            btnText={localizationText.COMMON.NEXT}
            btnStyle={styles.nextBtn}
          />
        </IPayView>
      </IPayScrollView>
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
        <IPayListView
          list={localTransferReasonData}
          onPressListItem={onPressListItem}
          selectedListItem={selectedReason}
        />
      </IPayBottomSheet>
    </IPaySafeAreaView>
  );
};

export default TransferInformation;
