import React from 'react';

import images from '@app/assets/images';
import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import changePinSuccessStyles from './change-pin-success.style';
import IPayCardDetailsBannerComponent from '@app/components/molecules/ipay-card-details-banner/ipay-card-details-banner.component';

import { goBack } from '@app/navigation/navigation-service.navigation';
import { CardTypes } from '@app/utilities/enums.util';
import { successIconAnimation } from '@app/assets/lottie';
import { IPaySafeAreaView } from '@app/components/templates';
import { IPayButton, IPayGradientText, IPayHeader } from '@app/components/molecules';
import {
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPayView,
} from '@app/components/atoms';

const ChangePinSuccess: React.FC = () => {
  const { colors } = useTheme();
  const styles = changePinSuccessStyles(colors);
  const localizationText = useLocalization();

  const gradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const handleDonePress = () => {
    goBack();
  };
  return (
    <IPaySafeAreaView linearGradientColors={colors.appGradient.gradientSecondary40}>
      <IPayHeader centerIcon={<IPayImage image={images.logo} style={styles.logoStyles} />} />
      <IPayView style={styles.cardContainerStyle}>
        <IPayCardDetailsBannerComponent
          containerStyle={styles.cardStyle}
          cardType={CardTypes.SIGNATURE}
          cardTypeName={localizationText.platinum_cashback_prepaid}
          carHolderName={localizationText.Adam_Ahmed}
          cardLastFourDigit={'1111'}
        />
      </IPayView>
      <IPayView style={styles.container}>
        <IPayView style={styles.linearGradientView}>
          <IPayLinearGradientView
            style={[styles.innerLinearGradientView]}
            gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
          >
            <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
            <IPayView style={styles.linearGradientTextView}>
              <IPayGradientText
                text={localizationText.CARD_PIN_CHANGES_SUCCESS}
                gradientColors={gradientColors}
                fontSize={styles.linearGradientText.fontSize}
                fontFamily={styles.linearGradientText.fontFamily}
                style={styles.gradientTextSvg}
                yScale={15}
              />
            </IPayView>
            <IPayFootnoteText
              regular
              color={colors.primary.primary800}
              text={localizationText.YOU_CAN_USE_PURCHASE}
              style={styles.passcodeSuccessText}
            />
            <IPayButton
              btnType="primary"
              btnText={localizationText.done}
              large
              btnStyle={styles.btnStyle}
              btnIconsDisabled
              onPress={handleDonePress}
            />
          </IPayLinearGradientView>
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};
export default ChangePinSuccess;
