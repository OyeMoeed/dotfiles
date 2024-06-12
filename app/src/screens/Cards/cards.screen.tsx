import { IPayText } from '@components/atoms';
import styles from './cards.style';

import { IPaySafeAreaView } from '@app/components/templates';

const Cards = () => {
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayText>Cards</IPayText>
    </IPaySafeAreaView>
  );
};

export default Cards;
