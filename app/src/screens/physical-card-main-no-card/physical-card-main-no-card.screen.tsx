import { IPaySafeAreaView } from '@app/components/templates';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import { IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import icons from '@app/assets/icons';
import { buttonVariants } from '@app/utilities/enums.util';
import physicalCardMainNoCardStyle from './physical-card-main-no-card.style';

const PhysicalCardMainNoCardScreen: React.FC = ({ onPressIssueNewCard }) => {
  const { colors } = useTheme();
  const styles = physicalCardMainNoCardStyle(colors);
  return (
    <IPaySafeAreaView>
      <IPayHeader title="CARD_OPTIONS.PHYSICAL_CARD" backBtn applyFlex />
      <IPayView style={styles.container}>
        <IPayIcon icon={icons.cardSlash} size={24} color={colors.natural.natural500} />
        <IPayFootnoteText
          style={styles.descriptionText}
          regular
          text="PHYSICAL_CARD.YOU_DONT_HAVE_CARD"
          color={colors.natural.natural500}
        />
        <IPayFootnoteText regular text="PHYSICAL_CARD.CREATE_AND_REQUEST" color={colors.natural.natural500} />
        <IPayView>
          <IPayView style={styles.childContainer}>
            <IPayView style={styles.stepBox}>
              <IPayIcon icon={icons.card_add2} size={32} color={colors.primary.primary300} />

              <IPayCaption2Text
                style={styles.stepBoxText}
                regular
                text="PHYSICAL_CARD.FIRST_ISSUE_YOUR"
                color={colors.primary.primary900}
              />
            </IPayView>
            <IPayIcon icon={icons.arrow_right2} size={24} color={colors.primary.primary300} />
            <IPayView style={styles.stepBox}>
              <IPayIcon icon={icons.printer2} size={32} color={colors.primary.primary300} />

              <IPayCaption2Text
                style={styles.stepBoxText}
                regular
                text="PHYSICAL_CARD.THEN_PRINT_YOUR"
                color={colors.primary.primary900}
              />
            </IPayView>
          </IPayView>
          <IPayButton
            btnStyle={styles.btnStyle}
            onPress={onPressIssueNewCard}
            large
            btnIconsDisabled
            btnType={buttonVariants.PRIMARY}
            btnText="PHYSICAL_CARD.ISSUE_A_NEW_CARD"
          />
        </IPayView>
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default PhysicalCardMainNoCardScreen;
