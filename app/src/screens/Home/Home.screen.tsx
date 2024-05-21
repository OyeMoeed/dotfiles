import images from '@app/assets/images';
import IPayLargeTitleText from '@app/components/atoms/text/ipay-large-title-text/ipay-large-title-text.component';
import IPayBanner from '@app/components/molecules/banner/ipay-banner.component';
import IPayChip from '@app/components/molecules/chip/ipay-chip.component';
import { languages } from '@app/localization/languages.localization';
import { screenNames } from '@app/navigation/screen-names.navigation';
import colors from '@app/styles/colors.styles';
import { variants } from '@app/utilities/enums';
import { IPayPressable, IPayText, IPayView } from '@components/atoms';
import { IPayToggleButton } from '@components/molecules';
import { IPaySafeAreaViewComp } from '@components/templates';
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
    <IPaySafeAreaViewComp>
      <IPayToggleButton toggleState={localizationFlag === languages.EN} onToggleChange={onToggleChange} />
      <IPayView style={styles.outerWrapper}>
        <IconMaterialCommunityIcons name="lock-alert-outline" size={80} color={colors.green} />
        <IconMaterialCommunityIcons name="wifi-lock-open" size={50} color={colors.grey} />
        <IPayLargeTitleText text={localizationText.welcome} regular />

        <IPayView>
          <IPayPressable style={styles.buttonStyle} onPress={() => navigation?.navigate(screenNames.PROFILE)}>
            <IPayText style={styles.text}>{localizationText.redirect_to_profile}</IPayText>
          </IPayPressable>
        </IPayView>

        <IPayView style={styles.addGap}>
          <IPayChip textValue={localizationText.text} imageSource={images.dummyUrl} variant={variants.WARNING} />
          <IPayChip textValue={localizationText.welcome} imageSource={images.dummyUrl} variant={variants.SEVERE} />
          <IPayChip textValue={localizationText.text} imageSource={images.dummyUrl} variant={variants.SUCCESS} />
          <IPayChip textValue={localizationText.text} imageSource={images.dummyUrl} variant={variants.NEUTRAL} />
        </IPayView>

        <IPayView style={styles.addGap}>
          <IPayBanner text={localizationText.welcome} variant={variants.NATURAL} />
          <IPayBanner text={localizationText.text} variant={variants.COLORED} />
        </IPayView>
      </IPayView>
    </IPaySafeAreaViewComp>
  );
};

export default Home;
