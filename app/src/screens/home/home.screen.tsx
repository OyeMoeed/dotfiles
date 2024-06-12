import { IPayText, IPayView } from '@components/atoms';
import { useTypedDispatch } from '@store/store';

import { IPaySafeAreaView } from '@app/components/templates';
import { IPayButton } from '../../components/molecules';
import styles from './home.style';

const Home = () => {
  const dispatch = useTypedDispatch();

  return (
    <IPaySafeAreaView>
      <IPayView style={styles.outerWrapper}>
        <IPayText>BASE TEXT</IPayText>

        <IPayButton btnType="primary" medium width={200} onPress={() => {}} btnText="Press Me!" />

        <IPayButton btnType="link-button" medium btnIconsDisabled onPress={() => {}} btnText="Press Me!" />

        <IPayView style={styles.addGap} />

        <IPayView style={styles.addGap} />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default Home;
