import images from '@app/assets/images';
import IPayLargeTitleText from '@app/components/atoms/text/ipay-large-title-text/ipay-large-title-text.component';
import IPayBanner from '@app/components/molecules/banner/ipay-banner.component';
import IPayChip from '@app/components/molecules/chip/ipay-chip.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { languages } from '@app/localization/languages.localization';
import { variants } from '@app/utilities/enums.util';
import {
  IPayBodyText,
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPaySubHeadlineText,
  IPayText,
  IPayTitle1Text,
  IPayTitle2Text,
  IPayTitle3Text,
  IPayView
} from '@components/atoms';
import { IPayToggleButton } from '@components/molecules';
import { IPaySafeAreaViewComp } from '@components/templates';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './home.style';

const Home = ({ navigation }: any): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { i18n } = useTranslation();
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
        <IPayText>BASE TEXT</IPayText>

        <IPayBodyText>BODY TEXT</IPayBodyText>
        <IPayBodyText regular={false}>BODY TEXT</IPayBodyText>

        <IPayCaption1Text>CAPTION1</IPayCaption1Text>
        <IPayCaption1Text regular={false}>CAPTION1</IPayCaption1Text>

        <IPayCaption2Text>CAPTION2</IPayCaption2Text>
        <IPayCaption2Text regular={false}>CAPTION2</IPayCaption2Text>

        <IPayFootnoteText>FOOTNOTE</IPayFootnoteText>
        <IPayFootnoteText regular={false}>FOOTNOTE</IPayFootnoteText>

        <IPayHeadlineText>HEADLINE</IPayHeadlineText>
        <IPayHeadlineText regular={false}>HEADLINE</IPayHeadlineText>

        <IPayLargeTitleText>LARGE TITLE</IPayLargeTitleText>
        <IPayLargeTitleText regular={false}>LARGE TITLE</IPayLargeTitleText>

        <IPaySubHeadlineText>SUB HEADLINE</IPaySubHeadlineText>
        <IPaySubHeadlineText regular={false}>SUB HEADLINE</IPaySubHeadlineText>

        <IPayTitle1Text>TITLE1</IPayTitle1Text>
        <IPayTitle1Text regular={false}>TITLE1</IPayTitle1Text>

        <IPayTitle2Text>TITLE2</IPayTitle2Text>
        <IPayTitle2Text regular={false}>TITLE2</IPayTitle2Text>

        <IPayTitle3Text>TITLE3</IPayTitle3Text>
        <IPayTitle3Text regular={false}>TITLE3</IPayTitle3Text>

        <IPayView style={styles.addGap}>
          <IPayChip textValue={localizationText.text} variant={variants.WARNING} />
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
