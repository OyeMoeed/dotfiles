import { IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import IPayAccountBalance from '@app/components/molecules/ipay-account-balance/ipay-account-balance.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import transferInformationStyles from './transfer-information.style';

const TransferInformation: React.FC = () => {
  const { colors } = useTheme();
  const styles = transferInformationStyles(colors);
  const localizationText = useLocalization();
  const { appData } = useTypedSelector((state) => state.appDataReducer);

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.TRANSFER.TRANSFER_INFRORMATION} />
      <IPayView style={styles.container}>
        <IPayAccountBalance
          balance="40000"
          availableBalance="50000"
          hideBalance={appData?.hideBalance}
          showRemainingAmount
          onPressTopup={() => {}}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default TransferInformation;
