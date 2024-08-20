import { IPayCaption1Text, IPayCaption2Text, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import icons from '@app/assets/icons';
import { buttonVariants } from '@app/utilities/enums.util';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import IPayAppleWallet from '@app/components/molecules/ipay-apple-wallet-button/ipay-apple-wallet-button.component';
import { isIosOS } from '@app/utilities/constants';
import issuePhysicalCardSuccessStyles from './issue-physical-card-success.style';

const IssuePhysicalCardScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = issuePhysicalCardSuccessStyles(colors);
  const localizationText = useLocalization();

  const [isAdded, setIsAdded] = useState(false); // TODO: will be handle on the basis of api

  const onGoToCards = () => navigate(ScreenNames.CARDS);

  const onGoToHome = () => navigate(ScreenNames.HOME);

  const onToggleIsAdded = () => setIsAdded((prev) => !prev);

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.successTextContainer}
          headingText={localizationText.PHYSICAL_CARD.THE_CARD_HAS_BEEN}
          descriptionText={localizationText.PHYSICAL_CARD.YOU_CAN_ADD_IT}
          descriptionStyle={styles.descriptionStyle}
        />
        {isIosOS && (
          <IPayView style={styles.appleButtonContainer}>
            {isAdded ? (
              <IPayPressable onPress={onToggleIsAdded} style={styles.addedAppleWalletWrapper}>
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
              <IPayAppleWallet onPress={onToggleIsAdded} />
            )}
          </IPayView>
        )}
        <IPayView style={styles.bottomButtonContainer}>
          <IPayView style={styles.descriptionBoxContainer}>
            <IPayIcon icon={icons.truck_tick} size={24} color={colors.natural.natural950} />
            <IPayView style={styles.captionTextContainer}>
              <IPayCaption1Text
                color={colors.natural.natural700}
                regular
                text={localizationText.PHYSICAL_CARD.COURIER_COMPANY_WILL}
              />
            </IPayView>
          </IPayView>
          <IPayButton
            btnStyle={styles.btnStyle}
            onPress={onGoToCards}
            medium
            btnType={buttonVariants.PRIMARY}
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
            btnText={localizationText.CARD_OPTIONS.GO_TO_CARD}
          />
          <IPayButton
            onPress={onGoToHome}
            medium
            btnType={buttonVariants.OUTLINED}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.primary.primary500} />}
            btnText={localizationText.COMMON.HOME}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default IssuePhysicalCardScreen;