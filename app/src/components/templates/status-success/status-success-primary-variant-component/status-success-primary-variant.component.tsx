import { successIconAnimation } from '@app/assets/lottie';
import { IPayFootnoteText, IPayLinearGradientView, IPayLottieAnimation, IPayView } from '@app/components/atoms';
import { IPayButton, IPayGradientText } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { StatusSuccessPrimaryVariantProps } from './status-success-primary-variant-component.interface';
import statusSuccessPrimaryVariantStyles from './status-success-primary-variant.style';

const StatusSuccessPrimaryVariant: React.FC<StatusSuccessPrimaryVariantProps> = ({ variantProps }) => {
  const { headingText, descriptionText, onPressDone } = variantProps;
  const { colors } = useTheme();
  const styles = statusSuccessPrimaryVariantStyles(colors);
  const localizationText = useLocalization();
  const backgroundGradientColors = [colors.primary.primary50, colors.secondary.secondary50];
  const textGradientColors = [colors.tertiary.tertiary400, colors.primary.primary500];

  return (
    <IPayView style={styles.container}>
      <IPayLinearGradientView style={styles.linearGradientView} gradientColors={backgroundGradientColors}>
        <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} loop />
        <IPayView style={styles.linearGradientTextView}>
          <IPayGradientText
            text={headingText}
            gradientColors={textGradientColors}
            fontSize={styles.linearGradientText.fontSize}
            fontFamily={styles.linearGradientText.fontFamily}
            style={styles.gradientTextSvg}
            yScale={17.5}
          />
        </IPayView>
        <IPayFootnoteText regular color={colors.primary.primary800} text={descriptionText} />
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          btnText={localizationText.COMMON.DONE}
          large
          btnStyle={styles.btnStyle}
          btnIconsDisabled
          onPress={onPressDone}
        />
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default StatusSuccessPrimaryVariant;
