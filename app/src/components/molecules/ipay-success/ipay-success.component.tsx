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
import { IPayGradientTextMasked, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayAppleWalletButton from '../ipay-apple-wallet-button/ipay-apple-wallet-button.component';
import IPayPrintCard from '../ipay-print-card/ipay-print-card.component';
import { IPaySuccessProps } from './ipay-success.interface';
import { TopUpSuccessStyles } from './ipay-success.style';

const IPaySuccess: React.FC<IPaySuccessProps> = ({
  title,
  subTitle,
  animation = successIconAnimation,
  isAddAppleWallet,
  showPrintCard = true,
}) => {
  const { colors } = useTheme();
  const styles = TopUpSuccessStyles(colors);
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
            <IPayLottieAnimation source={animation} />
            <IPayGradientTextMasked colors={gradientColors}>
              <IPayTitle2Text regular={false} text={title} style={styles.successText} />
            </IPayGradientTextMasked>

            <IPayFootnoteText regular color={colors.primary.primary800} text={subTitle} style={styles.subTittleStyle} />
            {isAddAppleWallet && <IPayAppleWalletButton />}
            {showPrintCard && <IPayPrintCard />}
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};
export default IPaySuccess;
