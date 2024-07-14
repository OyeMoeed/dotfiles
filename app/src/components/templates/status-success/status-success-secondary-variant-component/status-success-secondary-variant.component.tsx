import { successIconAnimation } from '@app/assets/lottie';
import { IPayLinearGradientView, IPayLottieAnimation, IPayView } from '@app/components/atoms';
import { IPayGradientText } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { StatusSuccessSecondaryVariantProps } from './status-success-secondary-variant-component.interface';
import statusSuccessSecondaryVariantStyles from './status-success-secondary-variant-component.style';

const StatusSuccessSecondaryVariant: React.FC<StatusSuccessSecondaryVariantProps> = ({ variantProps }) => {
  const { headingText } = variantProps;
  const { colors } = useTheme();
  const styles = statusSuccessSecondaryVariantStyles(colors);
  const localizationText = useLocalization();
  const headingTextGradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  return (
    <IPayView style={styles.container}>
      <IPayLinearGradientView
        style={styles.innerLinearGradientView}
        gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
      >
        <IPayView style={styles.headerView}>
          <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} loop />
          <IPayView style={styles.linearGradientTextView}>
            <IPayGradientText
              yScale={moderateScale(12)}
              text={headingText}
              gradientColors={headingTextGradientColors}
              style={styles.gradientTextSvg}
              fontSize={styles.linearGradientText.fontSize}
              fontFamily={styles.linearGradientText.fontFamily}
            />
          </IPayView>
        </IPayView>
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default StatusSuccessSecondaryVariant;
