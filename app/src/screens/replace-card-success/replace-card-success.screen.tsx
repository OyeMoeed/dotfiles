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
import replaceCardSuccessStyles from './replace-card-success.style';

const ReplaceCardSuccessScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = replaceCardSuccessStyles(colors);
  const localizationText = useLocalization();
  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess headingText={localizationText.REPLACE_CARD_SUCCESS.REPLACEMENT_REQUEST} />

        <IPayView style={styles.bottomButtonContainer}>
          <IPayView style={styles.descriptionBoxContainer}>
            <IPayIcon icon={icons.truck_tick} size={24} color={colors.natural.natural950} />
            <IPayView style={styles.captionTextContainer}>
              <IPayCaption1Text color={colors.natural.natural700} regular text={'PHYSICAL_CARD.COURIER_COMPANY_WILL'} />
            </IPayView>
          </IPayView>

          <IPayButton
            onPress={() => navigate(ScreenNames.CARDS)}
            medium
            btnType={buttonVariants.PRIMARY}
            rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
            btnText={'CARD_OPTIONS.GO_TO_CARD'}
          />
          <IPayButton
            onPress={() => navigate(ScreenNames.HOME)}
            medium
            btnType={buttonVariants.OUTLINED}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.primary.primary500} />}
            btnText={'COMMON.HOME'}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default ReplaceCardSuccessScreen;
