import IPayLargeTitleText from '@app/components/atoms/ipay-text/ipay-large-title-text/ipay-large-title-text.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayPressable, IPayView } from '@components/atoms';
import { useTranslation } from 'react-i18next';

import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import { languages } from '@app/localization/languages.localization';
import useTheme from '@app/styles/hooks/theme.hook';
import { alertType } from '@app/utilities/enums.util';
import { IPayHeader, IPayLinkButton } from '@components/molecules';
import { IPaySafeAreaView } from '@components/templates';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React, { useState } from 'react';
import profileScreenStyles from './profile.style';

const Profile: React.FC = () => {
  const { colors } = useTheme();
  const styles = profileScreenStyles(colors);
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
      .catch((error) => {});
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
      <>
        <IPayLinkButton />
        <IPayHeader title={localizationText.welcome} backHeader languageHeader />
        <IPayView style={styles.outerWrapper}>
          <IPayPressable onPress={openModal} style={styles.buttonStyle}>
            <IPayLargeTitleText text={localizationText.welcome} regular />
          </IPayPressable>
          <IPayAlert
            visible={modalVisible}
            onClose={() => closeModal()}
            title={localizationText.shortTitle}
            message={localizationText.description}
            type={alertType.SIDE_BY_SIDE}
            closeOnTouchOutside
            primaryAction={{
              text: localizationText.cancel,
              onPress: () => {
                closeModal();
              }
            }}
            secondaryAction={{
              text: localizationText.action,
              onPress: () => {
                closeModal();
              }
            }}
          />

          <IPayView style={styles.addGap} />

          <IPayView style={styles.addGap} />
        </IPayView>
      </>
    </IPaySafeAreaView>
  );
};

export default Profile;
