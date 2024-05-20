import { RNLargeTitleText, RNPressable, RNText, RNView } from '@components/atoms';
import { ToggleButton } from '@components/molecules';
import { SafeAreaViewComp } from '@components/templates';
import useLocalization from '@localization/localization.hook';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import colors from '@styles/colors';
import { languages, screenNames, variants } from '@utilities/enums';
import { constants } from '@utilities/index';
import React from 'react';
import { useTranslation } from 'react-i18next';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Home.style';
import images from '@app/assets/images';
import RNChip from '@app/components/molecules/chip/rn-chip.component';
import RNBanner from '@app/components/molecules/banner/rn-banner.component';
import IPayHeader from '@app/components/molecules/ipayheader/ipay-header.component';
import { BackArrow } from '@app/assets/svgs/svg';

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

  const ListUser = (): JSX.Element => {
    return (
      <>
        {constants.USERS.map((data: any) => (
          <RNView key={data?.id} style={styles.ListView}>
            <RNText style={{ fontSize: 15 }}>
              {data?.id}.{data?.name}
            </RNText>
          </RNView>
        ))}
      </>
    );
  };

  return (
    <SafeAreaViewComp >

      <IPayHeader
        title={localizationText.welcome}

      />
      <RNView style={styles.outerWrapper}>

        <IconMaterialCommunityIcons name="lock-alert-outline" size={80} color={colors.green} />
        <IconMaterialCommunityIcons name="wifi-lock-open" size={50} color={colors.grey} />
        <RNLargeTitleText text={localizationText.welcome} regular />
        {/* <RNTitle1Text text={localizationText.welcome} regular />
        <RNTitle2Text text={localizationText.welcome} regular />
        <RNTitle3Text text={localizationText.welcome} regular />
        <RNHeadlineText text={localizationText.welcome} regular />
        <RNBodyText text={localizationText.welcome} regular />
        <RNSubHeadlineText text={localizationText.welcome} regular />
        <RNFootnoteText text={localizationText.welcome} regular />
        <RNCaption1Text text={localizationText.welcome} regular />
        <RNCaption2Text text={localizationText.welcome} regular /> */}

        <RNView>
          <RNPressable style={styles.buttonStyle} onPress={() => navigation?.navigate(screenNames.PROFILE)}>
            <RNText style={styles.text}>{localizationText.redirect_to_profile}</RNText>
          </RNPressable>
          <ListUser />
        </RNView>
        <ToggleButton toggleState={localizationFlag === languages.EN} onToggleChange={onToggleChange} />
        <RNView style={styles.addGap}>
          <RNChip textValue={localizationText.text} imageSource={images.dummyUrl} variant={variants.WARNING} />
          <RNChip textValue={localizationText.welcome} imageSource={images.dummyUrl} variant={variants.SEVERE} />
          <RNChip textValue={localizationText.text} imageSource={images.dummyUrl} variant={variants.SUCCESS} />
          <RNChip textValue={localizationText.text} imageSource={images.dummyUrl} variant={variants.NEUTRAL} />
        </RNView>

        <RNView style={styles.addGap}>
          <RNBanner text={localizationText.welcome} variant={variants.NATURAL} />
          <RNBanner text={localizationText.text} variant={variants.COLORED} />
        </RNView>
      </RNView>
    </SafeAreaViewComp>
  );
};

export default Home;
