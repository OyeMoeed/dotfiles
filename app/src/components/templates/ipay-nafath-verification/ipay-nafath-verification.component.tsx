import icons from '@app/assets/icons';
import images from '@app/assets/images/index';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayPressable,
  IPayProgressBar,
  IPayText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText, IPayPageDescriptionText, IPayPrimaryButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { useNavigation } from '@react-navigation/native';
import { forwardRef, useEffect, useState } from 'react';
import { IPayNafathVerificationProps } from './ipay-nafath-verification.interface';
import nafathVerificationStyles from './ipay-nafath-verification.style';

const IPayNafathVerification = forwardRef<{}, IPayNafathVerificationProps>(({ testID }) => {
  const [step, setStep] = useState<number>(1);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(90); // in seconds
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = nafathVerificationStyles(colors);
  const navigation = useNavigation();

  useEffect(() => {
    let timer = null;
    timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderStep = (_step: string) => (
    <IPayView style={styles.stepIndicator}>
      <IPayGradientText
        text={_step}
        yScale={8}
        gradientColors={colors.gradient1}
        fontSize={styles.stepNoText.fontSize}
        fontFamily={styles.stepNoText.fontFamily}
        style={styles.gradientTextSvg}
      />
    </IPayView>
  );

  const format = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  return (
    <IPayView testID={testID} style={styles.container}>
      <IPayView style={styles.logoWrapper}>
        <IPayImage image={images.nafathLogo} style={styles.nafathLogo} />
      </IPayView>
      {step === 1 ? (
        <>
          <IPayPageDescriptionText
            heading={localizationText.PROFILE.NAFATH_VALIDATION}
            text={localizationText.SETTINGS.NAFATH_VALIDATION_DESCRIPTION}
          />
          <IPayPressable style={styles.downloadSection}>
            <IPayHeadlineText style={styles.downloadText} text={localizationText.SETTINGS.DOWNLOAD_NAFATH_ACCOUNT} />
            <IPayIcon icon={icons.export_3} size={24} color={colors.primary.primary500} />
          </IPayPressable>
          <IPayView style={styles.disclaimer}>
            <IPayFootnoteText
              color={colors.natural.natural900}
              text={localizationText.SETTINGS.NAFATH_TERMS_AND_CONDITION}
            />
            <IPayIcon icon={icons.infoIcon} size={20} />
          </IPayView>
          <IPayButton
            btnType="primary"
            btnText={localizationText.PROFILE.VALIDATE}
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
            onPress={() => setStep(2)}
            large
          />
        </>
      ) : (
        <>
          <IPayPageDescriptionText heading={localizationText.SETTINGS.VALIDATE_THROUGH_NAFAH} />
          <IPayPressable style={styles.stepper}>
            {renderStep('1')}
            <IPayHeadlineText style={styles.downloadText} text={localizationText.SETTINGS.OPEN_NAFATH_APP} />
            <IPayIcon icon={icons.export_3} size={24} color={colors.primary.primary500} />
          </IPayPressable>
          <IPayView style={styles.stepTwo}>
            <IPayView style={styles.flexRow}>
              {renderStep('2')}
              <IPayView>
                <IPayHeadlineText style={styles.sectionText} text={localizationText.HOME.SELECT_CODE} />
                <IPayCaption1Text text={localizationText.COMMON.INTO_NAFATH_APP} color={colors.primary.primary800} />
              </IPayView>
            </IPayView>
            <IPayLinearGradientView
              locations={[0.1, 0.9]}
              style={styles.verifiedCodeContainer}
              gradientColors={colors.bottomsheetGradient}
            >
              {isExpired ? (
                <IPayPrimaryButton
                  btnType="primary"
                  btnText={localizationText.COMMON.SEND_NEW_CODE}
                  large
                  style={styles.resendButton}
                  onPress={() => navigation.navigate(screenNames.IDENTITY_SUCCESSFUL)}
                  rightIcon={<IPayIcon icon={icons.refresh} color={colors.natural.natural0} />}
                />
              ) : (
                <IPayPressable style={styles.codeWrapper}>
                  <IPayGradientText
                    text="12"
                    yScale={28}
                    gradientColors={colors.gradient1}
                    fontSize={styles.linearGradientText.fontSize}
                    fontFamily={styles.linearGradientText.fontFamily}
                    style={styles.gradientTextSvg}
                  />
                </IPayPressable>
              )}
            </IPayLinearGradientView>
            <IPayView style={styles.expireSection}>
              <IPayProgressBar
                colors={colors.gradientSecondary}
                onComplete={() => setIsExpired(true)}
                reverse
                showExpired
                intervalTime={900}
              />
              <IPayText style={[styles.expireText, isExpired && styles.expireTextColor]}>
                {isExpired
                  ? localizationText.COMMON.CODE_HAS_EXPIRED
                  : `${localizationText.COMMON.CODE_EXPIRES_IN} ${format(counter)}`}
              </IPayText>
            </IPayView>
          </IPayView>
          <IPayPressable style={styles.stepper}>
            {renderStep('3')}
            <IPayView style={styles.backSection}>
              <IPayHeadlineText style={styles.sectionText} text={localizationText.PROFILE.BACK_TO_ALINMA_APP} />
              <IPayCaption1Text text={localizationText.PROFILE.VERIFY_ACCOUNT} color={colors.primary.primary800} />
            </IPayView>
          </IPayPressable>
        </>
      )}
    </IPayView>
  );
});

export default IPayNafathVerification;
