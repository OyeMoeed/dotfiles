import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayHeader } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import { IPayLanguageSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedDispatch } from '@store/store';
import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { genratedStyles } from './registration-successful.style';

const RegistrationSuccessful = () => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();
  const languageSheetRef = useRef(null);

  const [isBottomViewVisible, setBottomViewVisible] = useState(false);
  const bottomViewHeight = useRef(new Animated.Value(0)).current;
  const dispatch = useTypedDispatch();

  const handleDonePress = () => {
    Animated.timing(bottomViewHeight, {
      toValue: moderateScale(450), // Adjust this value based on your design
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setBottomViewVisible(true);
    });
  };

  const onPressSetupBiomatric = () => {};

  const onPressSkipForNow = () => {
    resetNavigation(screenNames.LOGIN_VIA_PASSCODE);
  };

  const gradientColors = [colors.tertiary.tertiary400, colors.primary.primary500];

  const showLanguageSheet = () => {
    languageSheetRef.current?.present();
  };

  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
      {isBottomViewVisible ? (
        <IPayHeader backBtn languageBtn onPressLanguage={showLanguageSheet} />
      ) : (
        <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
      )}
      {!isBottomViewVisible && (
        <IPayView style={styles.container}>
          <IPayView style={styles.linearGradientView}>
            <IPayLinearGradientView
              style={[styles.innerLinearGradientView]}
              gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
            >
              <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
              <IPayView style={styles.linearGradientTextView}>
                <IPayGradientText
                  text={localizationText.REGISTRATION.REGISTRATION_SUCCESS_MESSAGE}
                  gradientColors={gradientColors}
                  fontSize={styles.linearGradientText.fontSize}
                  fontFamily={styles.linearGradientText.fontFamily}
                  style={styles.gradientTextSvg}
                  yScale={17.5}
                />
              </IPayView>
              <IPayFootnoteText
                regular
                color={colors.primary.primary800}
                text={localizationText.REGISTRATION.EXPLORE_AND_ENJOY_FEATURE}
              />
              <IPayButton
                btnType="primary"
                btnText={localizationText.done}
                large
                btnStyle={styles.btnStyle}
                btnIconsDisabled
                onPress={handleDonePress}
              />
            </IPayLinearGradientView>
          </IPayView>
        </IPayView>
      )}

      {isBottomViewVisible && (
        <IPayView style={styles.childContainer}>
          <IPayLottieAnimation source={successIconAnimation} style={styles.successIconGifSmaller} />

          <IPayView style={styles.linearGradientTextView}>
            <IPayGradientText
              text={localizationText.REGISTRATION.REGISTRATION_SUCCESS_MESSAGE}
              gradientColors={gradientColors}
              fontSize={styles.linearGradientText.fontSize}
              fontFamily={styles.linearGradientText.fontFamily}
              style={styles.gradientTextSvg}
              yScale={17.5}
            />
          </IPayView>
          <IPayFootnoteText
            regular
            color={colors.primary.primary800}
            text={localizationText.REGISTRATION.EXPLORE_AND_ENJOY_FEATURE}
          />
        </IPayView>
      )}

      {isBottomViewVisible && (
        <Animated.View style={[styles.bottomView, { height: bottomViewHeight }]}>
          <IPayView style={styles.faceIdView}>
            <IPayGradientIcon icon={icons.FACE_ID} size={60} />
            <IPayFootnoteText text={localizationText.REGISTRATION.ADDITIONAL_FEATURE} style={styles.additionalFeatureText} />
            <IPayTitle3Text text={localizationText.REGISTRATION.ACTIVATE_FACE_ID} style={styles.activateFaceIDText} />

            <IPayFootnoteText
              text={localizationText.REGISTRATION.ALLOW_YOU_EASY_ACCESS_TO_ACCOUNT}
              style={styles.faceIdDescription}
            />

            <IPayButton
              btnType="primary"
              btnText={localizationText.REGISTRATION.SETUP_NOW}
              large
              btnIconsDisabled
              btnStyle={styles.setupButton}
              onPress={onPressSetupBiomatric}
            />
            <IPayButton
              btnType="outline"
              btnText={localizationText.REGISTRATION.SKIP_FOR_NOW}
              large
              btnIconsDisabled
              btnStyle={styles.skipButton}
              onPress={onPressSkipForNow}
            />
          </IPayView>
        </Animated.View>
      )}
      <IPayLanguageSheet ref={languageSheetRef} />
    </IPaySafeAreaView>
  );
};

export default RegistrationSuccessful;
