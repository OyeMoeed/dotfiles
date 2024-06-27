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
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { useNavigation } from '@react-navigation/native';
import { setAuth } from '@store/slices/auth-slice';
import { useTypedDispatch } from '@store/store';
import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { genratedStyles } from './registration-successful.style';
import { IPayLanguageSheet } from '@app/components/organism';
import images from '@app/assets/images';
import icons from '@app/assets/icons';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';

const RegistrationSuccessful = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();
  const languageSheetRef = useRef(null);

  const [isBottomViewVisible, setBottomViewVisible] = useState(false);
  const bottomViewHeight = useRef(new Animated.Value(0)).current;
  const dispatch = useTypedDispatch();

  const setAuthorized = () => {
    dispatch(setAuth(true));
  };

  const handleDonePress = () => {
    Animated.timing(bottomViewHeight, {
      toValue: moderateScale(450), // Adjust this value based on your design
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setBottomViewVisible(true);
    });
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
        <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} />
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
                  text={localizationText.registration_success_message}
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
                text={localizationText.explore_and_enjoy_feature}
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
              text={localizationText.registration_success_message}
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
            text={localizationText.explore_and_enjoy_feature}
          />
        </IPayView>
      )}

      {isBottomViewVisible && (
        <Animated.View style={[styles.bottomView, { height: bottomViewHeight }]}>
          <IPayView style={styles.faceIdView}>
       
            <IPayGradientIcon icon={icons.FACE_ID} size={60} />
            <IPayFootnoteText text={localizationText.additional_feature} style={styles.additionalFeatureText} />
            <IPayTitle3Text text={localizationText.activate_face_id} style={styles.activateFaceIDText} />

            <IPayFootnoteText
              text={localizationText.allow_you_easy_access_to_account}
              style={styles.faceIdDescription}
            />

            <IPayButton
              btnType="primary"
              btnText={localizationText.setup_now}
              large
              btnIconsDisabled
              btnStyle={styles.setupButton}
              onPress={setAuthorized}
            />
            <IPayButton
              btnType="outline"
              btnText={localizationText.skip_for_now}
              large
              btnIconsDisabled
              btnStyle={styles.skipButton}
              onPress={setAuthorized}
            />
          </IPayView>
        </Animated.View>
      )}
      <IPayLanguageSheet ref={languageSheetRef} />
    </IPaySafeAreaView>
  );
};

export default RegistrationSuccessful;