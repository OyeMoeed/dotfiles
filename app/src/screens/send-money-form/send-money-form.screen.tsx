import { IPayTopUpBox } from '@app/components/molecules';
import { IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatNumberWithCommas } from '@app/utilities/number-helper.util';
import React, { useState } from 'react';
import sendMoneyFormStyles from './send-money-form.styles';

const SendMoneyFormScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);
  const localizationText = useLocalization();
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const { currentBalance } = walletInfo; //TODO replace with orignal data

  const [amount, setAmount] = useState('');

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayTopUpBox
        availableBalance={formatNumberWithCommas(currentBalance)}
        isShowTopup
        isShowRemaining
        isShowProgressBar
        currentBalance={formatNumberWithCommas(currentBalance)}
        monthlyRemainingOutgoingBalance={formatNumberWithCommas(currentBalance)}
      />
      <IPaySendMoneyForm amount={amount} setAmount={setAmount} />
    </IPaySafeAreaView>
  );
};

export default SendMoneyFormScreen;
