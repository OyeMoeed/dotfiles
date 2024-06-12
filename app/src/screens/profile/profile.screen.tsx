import IPayLargeTitleText from '@app/components/atoms/ipay-text/ipay-large-title-text/ipay-large-title-text.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayPressable, IPayView } from '@components/atoms';
import { useTranslation } from 'react-i18next';

import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { alertType } from '@app/utilities/enums.util';
import { IPaySafeAreaView } from '@components/templates';
import { useState } from 'react';
import { IPayHeader, IPayLinkButton } from '../../components/molecules';
import styles from './profile.style';

const Profile = () => {
  const { t } = useTranslation();
  const localizationText = useLocalization();

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <IPaySafeAreaView>
      <IPayLinkButton />
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
};

export default Profile;
