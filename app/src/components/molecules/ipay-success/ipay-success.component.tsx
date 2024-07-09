import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientTextMasked, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPaySuccessProps } from './ipay-success.interface';
import { TopUpSuccessStyles } from './ipay-success.style';

const IPaySuccess: React.FC<IPaySuccessProps> = ({
  title,
  subTitle,
  isShowDone = false,
  handleDonePress,
  animation = successIconAnimation,
}) => {
  const { colors } = useTheme();
  const styles = TopUpSuccessStyles(colors);
  const localizationText = useLocalization();
  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];
  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} />
      <IPayView style={styles.container}>
        <IPayView style={styles.linearGradientView}>
          <IPayLinearGradientView
            style={[styles.innerLinearGradientView]}
            gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
          >
            <IPayLottieAnimation source={animation} style={styles.successIcon} />
            <IPayGradientTextMasked colors={gradientColors}>
              <IPayTitle2Text regular={false} text={title} style={styles.passcodeSuccessText} />
            </IPayGradientTextMasked>

            <IPayFootnoteText regular color={colors.primary.primary800} text={subTitle} style={styles.subTittleStyle} />
            {isShowDone && (
              <IPayButton
                onPress={handleDonePress}
                btnType="primary"
                btnText={localizationText.COMMON.DONE}
                large
                btnStyle={styles.btnStyle}
                btnIconsDisabled
              />
            )}
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};
export default IPaySuccess;
