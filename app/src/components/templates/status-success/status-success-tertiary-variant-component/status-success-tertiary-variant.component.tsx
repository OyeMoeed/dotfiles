import icons from '@app/assets/icons';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import insertLineBreaks from '@utilities/line-breaker.helper';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { StatusSuccessTertiaryVariantProps } from './status-success-tertiary-variant-component.interface';
import statusSuccessTertiaryVariantStyles from './status-success-tertiary-variant-component.style';

const StatusSuccessTertiaryVariant: React.FC<StatusSuccessTertiaryVariantProps> = ({ variantProps }) => {
  const { headingText, descriptionText, onPressGoToCard, onPressHome } = variantProps;
  const { colors } = useTheme();
  const styles = statusSuccessTertiaryVariantStyles(colors);
  const localizationText = useLocalization();
  const backgroundGradientColors = [colors.primary.primary50, colors.secondary.secondary50];
  const textGradientColors = [colors.tertiary.tertiary400, colors.primary.primary500];

  return (
    <IPayView style={styles.container}>
      <IPayLinearGradientView gradientColors={backgroundGradientColors}>
        <IPayView style={styles.headingView}>
          <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} loop />
          <IPayView style={styles.linearGradientTextView}>
            <IPayGradientText
              text={insertLineBreaks(headingText)}
              gradientColors={textGradientColors}
              fontSize={styles.linearGradientText.fontSize}
              fontFamily={styles.linearGradientText.fontFamily}
              style={styles.gradientTextSvg}
              yScale={moderateScale(13)}
            />
            <IPayFootnoteText
              regular
              color={colors.primary.primary800}
              text={descriptionText}
              style={styles.discriptionTex}
            />
          </IPayView>
        </IPayView>
        <IPayView style={styles.footerView}>
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnText={localizationText.CARD_OPTIONS.GO_TO_CARD}
            large
            btnStyle={styles.btnStyle}
            onPress={onPressGoToCard}
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} size={18} />}
          />
          <IPayButton
            btnType={buttonVariants.OUTLINED}
            btnText={localizationText.COMMON.HOME}
            large
            btnIconsDisabled
            onPress={onPressHome}
          />
        </IPayView>
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default StatusSuccessTertiaryVariant;
