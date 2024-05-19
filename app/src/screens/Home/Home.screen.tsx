import { languages } from '@app/localization/languages.localization';
import { screenNames } from '@app/navigation/screen-names.navigation';
import colors from '@app/styles/colors.styles';
import { RNPressable, RNText, RNView } from '@components/atoms';
import { ToggleButton } from '@components/molecules';
import { SafeAreaViewComp } from '@components/templates';
import useLocalization from '@localization/localization.hook';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React from 'react';
import { useTranslation } from 'react-i18next';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './home.style';

const Home = ({ navigation }: any): JSX.Element => {
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

  return (
    <SafeAreaViewComp>
      <ToggleButton toggleState={localizationFlag === languages.EN} onToggleChange={onToggleChange} />
      <RNView style={styles.outerWrapper}>
        <IconMaterialCommunityIcons name="lock-alert-outline" size={80} color={colors.green} />
        <IconMaterialCommunityIcons name="wifi-lock-open" size={50} color={colors.grey} />
        <RNText>{t(localizationText.welcome)}</RNText>

        <RNView>
          <RNPressable style={styles.buttonStyle} onPress={() => navigation?.navigate(screenNames.PROFILE)}>
            <RNText style={styles.text}>{t(localizationText.redirect_to_profile)}</RNText>
          </RNPressable>
        </RNView>
      </RNView>
    </SafeAreaViewComp>
  );
};

export default Home;
