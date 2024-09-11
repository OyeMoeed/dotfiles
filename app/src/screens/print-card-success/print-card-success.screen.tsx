import { IPayCaption1Text, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import { IPayPageWrapper } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import icons from '@app/assets/icons';
import { buttonVariants } from '@app/utilities/enums.util';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import printCardSuccessStyles from './print-card-success.style';

const PrintCardSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = printCardSuccessStyles(colors);
  const localizationText = useLocalization();

  const onGoToCards = () => navigate(ScreenNames.CARDS);

  const onGoToHome = () => navigate(ScreenNames.HOME);

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.successTextContainer}
          headingText={localizationText.PHYSICAL_CARD.CARD_RPINTING_REQUEST}
          headingStyle={styles.headingStyle}
        />
        <IPayView style={styles.bottomButtonContainer}>
          <IPayView style={styles.descriptionBoxContainer}>
            <IPayIcon icon={icons.truck_tick} size={24} color={colors.natural.natural950} />
            <IPayView style={styles.captionTextContainer}>
              <IPayCaption1Text color={colors.natural.natural700} regular text={'PHYSICAL_CARD.COURIER_COMPANY_WILL'} />
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

export default PrintCardSuccessScreen;
