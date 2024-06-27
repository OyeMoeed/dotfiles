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
import { forwardRef, useState } from 'react';
import { IPayNafathVerificationProps } from './ipay-nafath-verification.interface';
import nafathVerificationStyles from './ipay-nafath-verification.style';

const IPayNafathVerification = forwardRef<{}, IPayNafathVerificationProps>(({ testID }) => {
  const [step, setStep] = useState<number>(1);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = nafathVerificationStyles(colors);
  const navigation = useNavigation();

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
            heading={localizationText.nafath_validation}
            text={localizationText.nafath_validation_description}
          />
          <IPayPressable style={styles.downloadSection}>
            <IPayHeadlineText style={styles.downloadText} text={localizationText.download_nafath_application} />
            <IPayIcon icon={icons.export_3} size={24} color={colors.primary.primary500} />
          </IPayPressable>
          <IPayView style={styles.disclaimer}>
            <IPayFootnoteText text={localizationText.nafath_terms_and_conditions} />
            <IPayIcon icon={icons.infoIcon} size={20} />
          </IPayView>
          <IPayButton
            btnType="primary"
            btnText={localizationText.validate}
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={20} />}
            onPress={() => setStep(2)}
            large
          />
        </>
      ) : (
        <>
          <IPayPageDescriptionText heading={localizationText.validate_through_nafath} />
          <IPayPressable style={styles.stepper}>
            {renderStep('1')}
            <IPayHeadlineText style={styles.downloadText} text={localizationText.open_nafath_application} />
            <IPayIcon icon={icons.export_3} size={24} color={colors.primary.primary500} />
          </IPayPressable>
          <IPayView style={styles.stepTwo}>
            <IPayView style={styles.flexRow}>
              {renderStep('2')}
              <IPayView>
                <IPayHeadlineText style={styles.sectionText} text={localizationText.select_code} />
                <IPayCaption1Text text={localizationText.into_nafath_application} color={colors.primary.primary800} />
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
                  btnText={localizationText.send_new_code}
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
              />
              <IPayText style={[styles.expireText, isExpired && styles.expireTextColor]}>
                {isExpired ? localizationText.code_has_expired : `${localizationText.code_expires_in} ${format(90)}`}
              </IPayText>
            </IPayView>
          </IPayView>
          <IPayPressable style={styles.stepper}>
            {renderStep('3')}
            <IPayView style={styles.backSection}>
              <IPayHeadlineText style={styles.sectionText} text={localizationText.back_to_alinma_app} />
              <IPayCaption1Text text={localizationText.verify_account} color={colors.primary.primary800} />
            </IPayView>
          </IPayPressable>
        </>
      )}
    </IPayView>
  );
});

export default IPayNafathVerification;