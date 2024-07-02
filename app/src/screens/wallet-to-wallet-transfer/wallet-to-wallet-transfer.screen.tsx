import { IPayButton, IPayLimitExceedBottomSheet } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useRef } from 'react';
import walletTransferStyles from './wallet-to-wallet-transfer.style';

const WalletToWalletTransfer: React.FC = () => {
  const { colors } = useTheme();
  const styles = walletTransferStyles(colors);
  const localizationText = useLocalization();
  const remainingLimitRef = useRef<any>();

  const handleOpen = () => {
    remainingLimitRef.current?.present();
  };

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayButton
        medium
        btnIconsDisabled
        btnText={localizationText.no_remaining_spendings}
        onPress={handleOpen}
        btnType={'primary'}
      />
      <IPayLimitExceedBottomSheet ref={remainingLimitRef} handleContinue={() => {}} />
    </IPaySafeAreaView>
  );
};

export default WalletToWalletTransfer;
