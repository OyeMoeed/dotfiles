import images from '@app/assets/images';
import IPayLargeTitleText from '@app/components/atoms/text/ipay-large-title-text/ipay-large-title-text.component';
import IPayBanner from '@app/components/molecules/banner/ipay-banner.component';
import IPayChip from '@app/components/molecules/chip/ipay-chip.component';
import { IPayBottomSheet } from '@app/components/organism';
import { languages } from '@app/localization/languages.localization';
import { screenNames } from '@app/navigation/screen-names.navigation';
import colors from '@app/styles/colors.styles';
import { variants } from '@app/utilities/enums';
import { IPayPressable, IPayText, IPayView } from '@components/atoms';
import { IPayButton, IPayToggleButton } from '@components/molecules';
import { IPaySafeAreaViewComp } from '@components/templates';
import useLocalization from '@localization/localization.hook';
import { setLocalization } from '@store/slices/localization-slice';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IPayActionSheet } from '@app/components/organism';
import { RightCheck } from '@app/assets/svgs/svg';
import styles from './home.style';

const options = ['Cancel', 'Good', 'Bad', 'Poor'];

const Home = ({ navigation }: any): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { t, i18n } = useTranslation();
  const { localizationFlag } = useTypedSelector((state) => state.localizationReducer);
  const localizationText = useLocalization();
  const bottomSheetRef = useRef(null);

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

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  //action sheet
  const actionSheetRef = useRef(null);
  const [selected, setSelected] = useState(null);

  const showActionSheet = () => {
    actionSheetRef?.current?.show();
  };

  const handlePress = (buttonIndex: number) => {
    setSelected(buttonIndex);
  };

  return (
    <IPaySafeAreaViewComp>
      <IPayToggleButton toggleState={localizationFlag === languages.EN} onToggleChange={onToggleChange} />
      <IPayView style={styles.outerWrapper}>
        <IPayLargeTitleText text={localizationText.welcome} regular />

        <IPayButton btnText="Present Modal" onPress={openBottomSheet} />
        <IPayBottomSheet ref={bottomSheetRef} />

        <IPayView>
          <IPayPressable style={styles.buttonStyle} onPress={() => showActionSheet()}>
            <IPayText style={styles.text}>{localizationText.redirect_to_profile}</IPayText>
          </IPayPressable>
        </IPayView>

        <IPayText text={options[selected] || '...'} />

        <IPayActionSheet ref={actionSheetRef} options={options} onPress={handlePress} destructiveButtonIndex={3} />

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
