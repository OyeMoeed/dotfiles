import useLocalization from '@app/localization/hooks/localization.hook';
import { languages } from '@app/localization/languages.localization';
import { IPayText, IPayView } from '@components/atoms';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';

import { IPaySafeAreaView } from '@app/components/templates';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IPayButton } from '../../components/molecules';
import styles from './home.style';

function Home() {
  const dispatch = useTypedDispatch();
  const { i18n } = useTranslation();
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);
  const localizationText = useLocalization();
  const bottomSheetRef = useRef(null);
  const onToggleChange = () => {
    const newLanguage = localizationFlag === languages.EN ? languages.AR : languages.EN;
    i18n
      .changeLanguage(newLanguage)
      .then(() => {
        dispatch(setLocalization(newLanguage));
      })
      .catch((error) => {
        console.error('Error changing language:', error);
      });
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <IPaySafeAreaView>
      <IPayView style={styles.outerWrapper}>
        <IPayText>BASE TEXT</IPayText>

        <IPayButton btnType="primary" medium width={200} onPress={() => { }} btnText="Press Me!" />

        <IPayButton btnType="link-button" medium btnIconsDisabled onPress={() => { }} btnText="Press Me!" />

        <IPayView style={styles.addGap} />

        <IPayView style={styles.addGap} />
      </IPayView>
    </IPaySafeAreaView>
  );
}

export default Home;
