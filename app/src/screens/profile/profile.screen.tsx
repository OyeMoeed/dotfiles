import useLocalization from '@app/localization/hooks/localization.hook';
import colors from '@app/styles/colors.styles';
import { SCALE_100 } from '@app/styles/spacing.styles';
import { IPayPressable, IPayText, IPayView } from '@components/atoms';
import { IPaySafeAreaViewComp } from '@components/templates';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './profile.style';

const Profile = ({ navigation }: any): JSX.Element => {
  const { t, i18n } = useTranslation();
  const localizationText = useLocalization();

  return (
    <IPaySafeAreaViewComp>
      <IPayView style={styles.outerWrapper}>
        <Icon name="finger-print-sharp" size={SCALE_100} color={colors.green} />
        <IPayView>
          <IPayPressable
            onPress={() => Alert.alert(t(localizationText.this_is_profile_screen))}
            style={styles.buttonStyle}
          >
            <IPayText style={styles.text}>
              {t(localizationText.this_is)}{' '}
              <IPayText style={styles.profileText}> {t(localizationText.profile)} </IPayText>{' '}
              {t(localizationText.screen)}
            </IPayText>
          </IPayPressable>
        </IPayView>
      </IPayView>
      <IPayView style={styles.footerView}>
        <IPayText style={styles.footerText}>{t(localizationText.by_handi_tv)}</IPayText>
      </IPayView>
    </IPaySafeAreaViewComp>
  );
};

export default Profile;
