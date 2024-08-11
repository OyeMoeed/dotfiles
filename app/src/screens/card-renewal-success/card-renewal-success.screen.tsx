import { IPayCaption2Text, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import icons from '@app/assets/icons';
import { buttonVariants } from '@app/utilities/enums.util';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import IPayPrintCard from '@app/components/molecules/ipay-print-card/ipay-print-card.component';
import IPayAppleButton from '@app/components/molecules/ipay-apple-wallet-button/ipay-apple-wallet-button.component';
import cardRenewalSuccessStyles from './card-renewal-success.style';

const CardRenewalSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = cardRenewalSuccessStyles(colors);
  const localizationText = useLocalization();
  const [isAdded, setIsAdded] = React.useState(false); // TODO will be handle on the basis of api

  const togleIsAdded = () => {
    setIsAdded((prev) => !prev);
  };
  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.ipaySuccessContainer}
          headingText={localizationText.CARD_RENEWAL_SUCCESS.THE_CARD_HAS_BEEN_RENEWED}
          descriptionText={localizationText.CARD_OPTIONS.ADD_TO_APPLE_PAY}
        />
        <IPayView style={styles.appleButtonContainer}>
          {isAdded ? (
            <IPayPressable onPress={togleIsAdded} style={styles.addedAppleWalletWrapper}>
              <IPayView style={styles.appleWalletTextWrapper}>
                <IPayCaption2Text style={styles.addedText} regular>
                  {localizationText.CARDS.ADDED_TO}
                </IPayCaption2Text>
                <IPayCaption2Text regular={false}>{localizationText.CARDS.APPLE_WALLET}</IPayCaption2Text>
              </IPayView>
              <IPayView style={styles.applePay}>
                <IPayIcon icon={icons.apple_pay} size={28} color={colors.natural.natural900} />
              </IPayView>
            </IPayPressable>
          ) : (
            <IPayAppleButton onPress={togleIsAdded} />
          )}
        </IPayView>
        <IPayView style={styles.printCardContainer}>
          <IPayPrintCard containerStyle={styles.printCardComponent} handlePrintCard={() => {}} />
        </IPayView>
        <IPayView style={styles.bottomButtonContainer}>
          <IPayButton
            onPress={() => navigate(ScreenNames.CARDS)}
            medium
            btnType={buttonVariants.OUTLINED}
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.primary.primary500} />}
            btnText={localizationText.CARD_OPTIONS.GO_TO_CARD}
            btnStyle={styles.flexStyle}
          />
          <IPayButton
            onPress={() => navigate(ScreenNames.HOME)}
            medium
            btnType={buttonVariants.OUTLINED}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.primary.primary500} />}
            btnText={localizationText.COMMON.HOME}
            btnStyle={styles.flexStyle}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default CardRenewalSuccessScreen;