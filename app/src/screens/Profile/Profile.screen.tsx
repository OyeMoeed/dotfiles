import { RNPressable, RNText, RNView } from '@components/atoms';
import { SafeAreaViewComp } from '@components/templates';
import useLocalization from '@localization/localization.hook';
import colors from '@styles/colors';
import { SCALE_100 } from '@styles/spacing';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './profile.style';

const Profile = ({ navigation }: any): JSX.Element => {
  const { t, i18n } = useTranslation();
  const localizationText = useLocalization();

  return (
    <SafeAreaViewComp>
      <RNView style={styles.outerWrapper}>
        <Icon name="finger-print-sharp" size={SCALE_100} color={colors.green} />
        <RNView>
          <RNPressable
            onPress={() => Alert.alert(t(localizationText.this_is_profile_screen))}
            style={styles.buttonStyle}
          >
            <RNText style={styles.text}>
              {localizationText.this_is} <RNText style={styles.profileText}> {localizationText.profile} </RNText>{' '}
              {localizationText.screen}
            </RNText>
          </RNPressable>
        </RNView>
      </RNView>
      <RNView style={styles.footerView}>
        <RNText style={styles.footerText}>{localizationText.by_handi_tv}</RNText>
      </RNView>
    </SafeAreaViewComp>
  );
};

export default Profile;
