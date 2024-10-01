import React from 'react';

import { IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';

import MusanedPaymentSuccessfulScreenProps from './musaned-payment-successful.interface';
import musanedPaymentSuccessful from './musaned-payment-successful.style';

const MusanedPaymentSuccessfulScreen: React.FC<MusanedPaymentSuccessfulScreenProps> = () => {
  const styles = musanedPaymentSuccessful();

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader backBtn applyFlex title="MUSANED.HEADER" />
    </IPaySafeAreaView>
  );
};

export default MusanedPaymentSuccessfulScreen;
