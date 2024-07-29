import { IPayView } from '@app/components/atoms';
import { IPayButton, IPayHeader, IPayListView } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPayBottomSheet, IPayTransferInformation } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import constants from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
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
  const { transferReasonData } = useConstantData();

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

  const onPressNext = () => {};

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
          onPress={onPressNext}
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
