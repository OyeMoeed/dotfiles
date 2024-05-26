import IPayLargeTitleText from '@app/components/atoms/text/ipay-large-title-text/ipay-large-title-text.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import { languages } from '@app/localization/languages.localization';
import {
  IPayCheckbox,
  IPayRadioButton,
  IPaySubHeadlineText,
  IPayTitle1Text,
  IPayTitle2Text,
  IPayTitle3Text,
  IPayView
} from '@components/atoms';
import { IPayCheckboxWithText } from '@components/molecules';

import { IPaySafeAreaViewComp } from '@components/templates';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './home.style';
const Home = () => {
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
      <IPayView style={styles.outerWrapper}>
        <IPayLargeTitleText text={localizationText.welcome} regular />

        <IPayRadioButton />
        <IPayCheckbox disabled isCheck />
        <IPayCheckboxWithText heading="Title" text="Sub Title" />
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

        <IPayView style={styles.addGap}></IPayView>

        <IPayView style={styles.addGap}></IPayView>
      </IPayView>
    </IPaySafeAreaViewComp>
  );
};

export default Home;
