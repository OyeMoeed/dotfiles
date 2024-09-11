import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientTextMasked, IPayHeader } from '@app/components/molecules';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { isIosOS } from '@app/utilities/constants';
import React from 'react';
import IPayAppleWalletButton from '../ipay-apple-wallet-button/ipay-apple-wallet-button.component';
import IPayPrintCard from '../ipay-print-card/ipay-print-card.component';
import { IPayCardSuccessProps } from './ipay-card-success.interface';
import topUpSuccessStyles from './ipay-card-success.style';

const IPayCardSuccess: React.FC<IPayCardSuccessProps> = ({
  testID,
  title,
  subTitle,
  animation = successIconAnimation,
  isAddAppleWallet,
  showPrintCard = true,
  handleGoToCard,
}) => {
  const { colors } = useTheme();
  const styles = topUpSuccessStyles(colors);
  const handleHomePress = () => {
    navigate(screenNames.HOME);
  };
  const handleAddToAppleWallet = () => {
    navigate(screenNames.WALLET);
  };
  const localizationText = useLocalization();
  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const handlePrintCard = () => {
    navigate(screenNames.PRINT_CARD_CONFIRMATION, {
      currentCard: {
        cardHeaderText: 'Mada Debit Card', // TODO: will change api response
        name: 'Adam Ahmed', // TODO: will change api response
      },
    });
  };
  return (
    <IPaySafeAreaView
      testID={`${testID}-success-component`}
      style={styles.viewStyles}
      linearGradientColors={colors.appGradient.gradientSecondary40}
    >
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} />
      <IPayView style={styles.linearGradientView}>
        <IPayLinearGradientView
          style={[styles.innerLinearGradientView]}
          gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
        >
          <IPayView style={[styles.flexStyle, styles.upperView]}>
            <IPayLottieAnimation source={animation} style={styles.aniamtionStyles} />
            <IPayGradientTextMasked colors={gradientColors}>
              <IPayTitle2Text regular={false} text={title} style={styles.successText} />
            </IPayGradientTextMasked>

            <IPayFootnoteText regular color={colors.primary.primary800} text={subTitle} style={styles.subTittleStyle} />
            {isAddAppleWallet && isIosOS && <IPayAppleWalletButton onPress={handleAddToAppleWallet} />}
          </IPayView>
          <IPayView style={[styles.flexStyle, styles.alignEnd]}>
            {showPrintCard && <IPayPrintCard handlePrintCard={handlePrintCard} />}
            <IPayView style={styles.lowerButtons}>
              <IPayButton
                onPress={handleGoToCard}
                medium
                btnType="outline"
                rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.primary.primary500} />}
                btnText={'CARD_OPTIONS.GO_TO_CARD'}
                btnStyle={styles.flexStyle}
              />
              <IPayButton
                medium
                onPress={handleHomePress}
                btnType="outline"
                leftIcon={<IPayIcon icon={icons.HOME_2} color={colors.primary.primary500} />}
                btnText={'COMMON.HOME'}
                btnStyle={styles.flexStyle}
              />
            </IPayView>
          </IPayView>
        </IPayLinearGradientView>
      </IPayView>
    </IPaySafeAreaView>
  );
};
export default IPayCardSuccess;
