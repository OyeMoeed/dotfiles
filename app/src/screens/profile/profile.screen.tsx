import IPayLargeTitleText from '@app/components/atoms/text/ipay-large-title-text/ipay-large-title-text.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { languages } from '@app/localization/languages.localization';
import { alertType } from '@app/utilities/enums.util';
import { IPayPressable, IPayView } from '@components/atoms';

import IPayAlert from '@app/components/atoms/alert/ipay-alert.component';
import { IPaySafeAreaViewComp } from '@components/templates';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './profile.style';
const Profile = () => {
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
    <IPaySafeAreaViewComp>
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
            }
          }}
          secondaryAction={{
            text: t('Action'),
            onPress: () => {
              closeModal();
            }
          }}

          // tertiaryAction={{ text: t('Action'), onPress: () => { } }}
        />

        <IPayView style={styles.addGap}></IPayView>

        <IPayView style={styles.addGap}></IPayView>
      </IPayView>
    </IPaySafeAreaViewComp>
  );
};

export default Profile;
