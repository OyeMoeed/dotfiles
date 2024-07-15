import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayIcon,
  IPayLinearGradientView,
  IPayView,
} from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { IPayNearestAtmComponentProps } from './ipay-nearest-atm.interface';
import nearestAtmComponentSytles from './ipay-nearest-atm.style';

const IPayNearestAtmComponent: React.FC<IPayNearestAtmComponentProps> = ({ testID, style }) => {
  const { colors } = useTheme();
  const styles = nearestAtmComponentSytles(colors);
  const localizationText = useLocalization();
  return (
    <IPayLinearGradientView
      gradientColors={colors.appGradient.gradientSecondary40}
      style={[styles.container, style]}
      testID={`${testID}-nearest-atm`}
    >
      <IPayView style={styles.locationIconView}>
        <IPayIcon icon={icons.location} size={32} />
        <IPayView style={styles.nearestAtmTextView}>
          <IPayHeadlineText regular={false} text={localizationText.ATM.NEAREST_ATM} color={colors.primary.primary900} />
          <IPayCaption1Text
            text={localizationText.ATM.ALINMA_BRANCHES_AND_ATM_LOCATIONS}
            color={colors.natural.natural900}
          />
        </IPayView>
      </IPayView>

      <IPayButton
        btnType={buttonVariants.OUTLINED}
        large
        btnIconsDisabled
        btnText={localizationText.ATM.CHECK_NEAREST_ATM}
        btnStyle={styles.btnStyles}
      />

      <IPayView style={styles.atmGuideView}>
        <IPayView style={styles.atmGuideTextView}>
          <IPayFootnoteText text={localizationText.ATM.LEARN_ATM_WITHDRAWAL_STEPS} color={colors.natural.natural900} />
          <IPayCaption1Text text={localizationText.ATM.STEP_BY_STEP_VIDEO_GUIDE} color={colors.natural.natural500} />
        </IPayView>
        <IPayIcon icon={icons.play_cricle} size={18} color={colors.primary.primary500} />
      </IPayView>
    </IPayLinearGradientView>
  );
};

export default IPayNearestAtmComponent;
