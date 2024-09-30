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
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { CardInfo } from '@app/network/services/cards-management/issue-card-confirm/issue-card-confirm.interface';
import { RouteProp, useRoute } from '@react-navigation/native';
import { buttonVariants, customInvalidateQuery, toggleAppRating } from '@app/utilities';
import WALLET_QUERY_KEYS from '@app/network/services/core/get-wallet/get-wallet.query-keys';
import IPayPrintCard from '../ipay-print-card/ipay-print-card.component';
import { IPayCardSuccessProps } from './ipay-card-success.interface';
import topUpSuccessStyles from './ipay-card-success.style';
import IPayAddAppleWalletButton from '../ipay-add-apple-wallet-button/ipay-add-apple-wallet-button.component';

const IPayCardSuccess: React.FC<IPayCardSuccessProps> = ({
  testID,
  title,
  subTitle,
  animation = successIconAnimation,
  showPrintCard = true,
  handleGoToCard,
}) => {
  const route = useRoute<RouteProps>();
  type RouteProps = RouteProp<{ params: { cardInfo: CardInfo } }, 'params'>;
  const { colors } = useTheme();
  const styles = topUpSuccessStyles();
  const handleHomePress = () => {
    customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
    toggleAppRating();
    navigate(screenNames.HOME);
  };

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const handlePrintCard = () => {
    customInvalidateQuery([WALLET_QUERY_KEYS.GET_WALLET_INFO]);
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
          style={styles.innerLinearGradientView}
          gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
        >
          <IPayView style={[styles.flexStyle, styles.upperView]}>
            <IPayLottieAnimation source={animation} style={styles.aniamtionStyles} />
            <IPayGradientTextMasked colors={gradientColors}>
              <IPayTitle2Text regular={false} text={title} style={styles.successText} />
            </IPayGradientTextMasked>

            <IPayFootnoteText regular color={colors.primary.primary800} text={subTitle} style={styles.subTittleStyle} />
            <IPayAddAppleWalletButton selectedCard={route?.params.cardInfo} />
          </IPayView>
          <IPayView style={[styles.flexStyle, styles.alignEnd]}>
            {showPrintCard && <IPayPrintCard handlePrintCard={handlePrintCard} />}
            <IPayView style={styles.lowerButtons}>
              <IPayButton
                onPress={handleGoToCard}
                medium
                btnType={buttonVariants.OUTLINED}
                rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.primary.primary500} />}
                btnText="CARD_OPTIONS.GO_TO_CARD"
                btnStyle={styles.flexStyle}
              />
              <IPayButton
                medium
                onPress={handleHomePress}
                btnType={buttonVariants.OUTLINED}
                leftIcon={<IPayIcon icon={icons.HOME_2} color={colors.primary.primary500} />}
                btnText="COMMON.HOME"
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
