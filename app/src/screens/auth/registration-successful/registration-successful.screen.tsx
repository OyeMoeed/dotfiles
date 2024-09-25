import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayTitle2Text,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientTextMasked, IPayHeader } from '@app/components/molecules';
import IPayGradientIcon from '@app/components/molecules/ipay-gradient-icon/ipay-gradient-icon.component';
import { IPayLanguageSheet } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useBiometricService from '@app/network/services/core/biometric/biometric-service';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import throttle from '@app/utilities/throttle-onPress.util';
import React, { useCallback, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { buttonVariants } from '@app/utilities';
import genratedStyles from './registration-successful.style';

const RegistrationSuccessful: React.FC = () => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const languageSheetRef = useRef(null);
  const [isBottomViewVisible, setBottomViewVisible] = useState(false);
  const bottomViewHeight = useRef(new Animated.Value(0)).current;
  const { handleSetupBiomatric } = useBiometricService();

  const handleDonePress = () => {
    Animated.timing(bottomViewHeight, {
      toValue: moderateScale(450, 0.4), // Adjust this value based on your design
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setBottomViewVisible(true);
    });
  };

  const onPressSkipForNow = () => {
    resetNavigation(screenNames.LOGIN_VIA_PASSCODE);
  };

  const gradientColors = [colors.tertiary.tertiary400, colors.primary.primary500];
  const throttledShowLanguageSheet = useCallback(
    throttle(() => {
      languageSheetRef.current?.present();
    }, 3000),
    [],
  );
  const showLanguageSheet = () => {
    throttledShowLanguageSheet();
  };
  return (
    <IPaySafeAreaView
      linearGradientColors={
        isBottomViewVisible ? colors.appGradient.gradientSecondary45 : colors.appGradient.gradientSecondary40
      }
    >
      {isBottomViewVisible ? (
        <IPayHeader
          backBtn
          languageBtn
          onPressLanguage={showLanguageSheet}
          onBackPress={() => setBottomViewVisible(false)}
        />
      ) : (
        <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} applyFlex />
      )}
      <>
        {!isBottomViewVisible && (
          <IPayView style={styles.container}>
            <IPayView style={styles.linearGradientView}>
              <IPayLinearGradientView
                style={styles.innerLinearGradientView}
                gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
              >
                <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
                <IPayView style={styles.linearGradientTextView}>
                  <IPayGradientTextMasked colors={gradientColors}>
                    <IPayTitle2Text text="REGISTRATION.REGISTRATION_SUCCESS_MESSAGE" />
                  </IPayGradientTextMasked>
                </IPayView>
                <IPayFootnoteText
                  regular
                  color={colors.primary.primary800}
                  text="REGISTRATION.EXPLORE_AND_ENJOY_FEATURE"
                />
                <IPayButton
                  btnType={buttonVariants.PRIMARY}
                  btnText="COMMON.DONE"
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
          <IPayView style={styles.centerStyles}>
            <IPayLottieAnimation source={successIconAnimation} style={styles.successIconGifSmaller} />

            <IPayView style={[styles.linearGradientTextView, styles.paddingStyles]}>
              <IPayGradientTextMasked colors={gradientColors}>
                <IPayTitle2Text text="REGISTRATION.REGISTRATION_SUCCESS_MESSAGE" />
              </IPayGradientTextMasked>
            </IPayView>
            <IPayFootnoteText regular color={colors.primary.primary800} text="REGISTRATION.EXPLORE_AND_ENJOY_FEATURE" />
          </IPayView>
        )}

        {isBottomViewVisible && (
          <Animated.View style={[styles.bottomView, { height: bottomViewHeight }]}>
            <IPayView style={styles.faceIdView}>
              <IPayGradientIcon icon={isAndroidOS ? icons.finger_scan : icons.FACE_ID} size={60} />
              <IPayFootnoteText text="REGISTRATION.ADDITIONAL_FEATURE" style={styles.additionalFeatureText} />
              <IPayTitle3Text
                text={isAndroidOS ? 'REGISTRATION.ACTIVATE_TOUCH_ID' : 'REGISTRATION.ACTIVATE_FACE_ID'}
                style={styles.activateFaceIDText}
              />

              <IPayFootnoteText
                color={colors.primary.primary900}
                text="REGISTRATION.ALLOW_YOU_EASY_ACCESS_TO_ACCOUNT"
                style={styles.faceIdDescription}
              />

              <IPayButton
                btnType={buttonVariants.PRIMARY}
                btnText="REGISTRATION.SETUP_NOW"
                large
                btnIconsDisabled
                btnStyle={styles.setupButton}
                onPress={handleSetupBiomatric}
              />
              <IPayButton
                btnType={buttonVariants.OUTLINED}
                btnText="REGISTRATION.SKIP_FOR_NOW"
                large
                btnIconsDisabled
                btnStyle={styles.skipButton}
                onPress={onPressSkipForNow}
              />
            </IPayView>
          </Animated.View>
        )}
      </>
      <IPayLanguageSheet ref={languageSheetRef} />
    </IPaySafeAreaView>
  );
};

export default RegistrationSuccessful;
