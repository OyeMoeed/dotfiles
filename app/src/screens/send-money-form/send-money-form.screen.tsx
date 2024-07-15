import { IPaySendMoneyForm } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import sendMoneyFormStyles from './send-money-form.styles';

const SendMoneyFormScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = sendMoneyFormStyles(colors);
  const localizationText = useLocalization();
  const [amount, setAmount] = useState('');
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPaySendMoneyForm amount={amount} setAmount={setAmount} />
    </IPaySafeAreaView>
  );
};

export default SendMoneyFormScreen;
