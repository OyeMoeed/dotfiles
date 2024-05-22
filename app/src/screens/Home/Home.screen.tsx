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
import RNList from '@app/components/molecules/list/rn-list.component';
import RightIcon from '@app/assets/svgs/right.icon';
import Trailing from '@app/assets/svgs/right-trailing.icon';
import LeftIcon from '@app/assets/svgs/left-greater.icon';
import ArrowDownSVG from '@app/assets/svgs/arrow-down.icon';
import { ScrollView } from 'react-native';

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
    <SafeAreaViewComp>
      <ToggleButton toggleState={localizationFlag === languages.EN} onToggleChange={onToggleChange} />
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
        <ScrollView>
          <RNList variant={variants.NATURAL} imageSource={images.dummyUrl} isShowIcon title={localizationText.title} />
          <RNList
            variant={variants.NATURAL}
            imageSource={images.dummyUrl}
            isShowIcon
            title={localizationText.title}
            icon={<Trailing />}
          />
          <RNList
            variant={variants.NATURAL}
            imageSource={images.dummyUrl}
            isShowIcon
            title={localizationText.title}
            icon={<RightIcon />}
          />
          <RNList
            leftIcon={<LeftIcon />}
            isShowLeftIcon
            variant={variants.NATURAL}
            imageSource={images.dummyUrl}
            isShowIcon
            title={localizationText.title}
            isShowSubTitle
            subTitle={localizationText.subTitle}
          />
          <RNList
            isShowToggleButton
            toggleState={localizationFlag === languages.EN}
            onToggleChange={onToggleChange}
            variant={variants.NATURAL}
            title={localizationText.title}
          />

          <RNList isShowCounterButton variant={variants.NATURAL} title={localizationText.title} />
          <RNList
            isShowSubTitle
            subTitle={localizationText.subTitle}
            variant={variants.NATURAL}
            title={localizationText.title}
            isShowIcon
          />

          <RNList
            isShowDetail
            detailTextStyle={styles.popTextStyle}
            detailText={localizationText.popup}
            isShowIcon
            icon={<ArrowDownSVG />}
            variant={variants.NATURAL}
            title={localizationText.title}
          />
          <RNList isShowButton variant={variants.NATURAL} btnText={localizationText.button} title={localizationText.title} />
          <RNList
            isShowDetail
            detailText={localizationText.detail}
            isShowIcon
            variant={variants.NATURAL}
            title={localizationText.title}
          />

          <RNList
            isShowTime
            timeText={'8:00 AM'}
            isShowDate
            dateText={'Jun 2023'}
            variant={variants.NATURAL}
            title={localizationText.title}
          />
        </ScrollView>

        <RNView>
          <RNPressable style={styles.buttonStyle} onPress={() => navigation?.navigate(screenNames.PROFILE)}>
            <RNText style={styles.text}>{localizationText.redirect_to_profile}</RNText>
          </RNPressable>
          <ListUser />
        </RNView>

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
