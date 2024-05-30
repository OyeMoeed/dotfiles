import IPayLargeTitleText from '@app/components/atoms/ipay-text/ipay-large-title-text/ipay-large-title-text.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayPressable, IPayView } from '@components/atoms';
import { useTranslation } from 'react-i18next';

import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { alertType } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import { useState } from 'react';
import { IPayHeader } from '../../components/molecules';
import styles from './profile.style';

function Profile() {
  const dispatch = useTypedDispatch();
  const { t, i18n } = useTranslation();
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);
  const localizationText = useLocalization();

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

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <IPaySafeAreaView>
      <IPayHeader title={localizationText.welcome} backHeader languageHeader />
      <IPayView style={styles.outerWrapper}>
        <IPayPressable onPress={openModal} style={styles.buttonStyle}>
          <IPayLargeTitleText text={localizationText.welcome} regular />
        </IPayPressable>
        <IPayAlert
          visible={modalVisible}
          onClose={() => closeModal()}
          title={t('shortTittle')}
          message={t('description')}
          type={alertType.SIDE_BY_SIDE}
          closeOnTouchOutside
          primaryAction={{
            text: t('Cancel'),
            onPress: () => {
              closeModal();
            },
          }}
          secondaryAction={{
            text: t('Action'),
            onPress: () => {
              closeModal();
            },
          }}

          // tertiaryAction={{ text: t('Action'), onPress: () => { } }}
        />

        <IPayView style={styles.addGap} />

        <IPayView style={styles.addGap} />
      </IPayView>
    </IPaySafeAreaView>
  );
}

export default Profile;
