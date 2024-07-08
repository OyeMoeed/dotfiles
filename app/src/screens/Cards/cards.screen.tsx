import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayText } from '@components/atoms';
import React from 'react';
import styles from './cards.style';

const Cards: React.FC = () => {
  const localizationText = useLocalization();
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayText>{localizationText.HOME.CARDS}</IPayText>
    </IPaySafeAreaView>
  );
};
export default Cards;
