import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayList } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardOptions } from '@app/utilities/enums.util';
import React from 'react';
import { IPayCardIssueProps } from './ipay-card-issue-bottomsheet.interface';
import CardIssueStyle from './ipay-card-issue-bottomsheet.styles';

const IPayCardIssueBottomSheet: React.FC<IPayCardIssueProps> = ({
  onNextPress,
  testID,
  selectedCard,
  handleCardSelection,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = CardIssueStyle(colors);

  return (
    <IPayView testID={`${testID}-card-selection-bottomsheet`} style={styles.margin}>
      <IPayView style={styles.headerRow}>
        <IPayIcon icon={icons.add_card2} size={48} color={colors.primary.primary500} />
        <IPayFootnoteText text={localizationText.CARD_ISSUE.CHOOSE_PREFFERED} style={styles.titleColor} />
      </IPayView>
      <IPayView style={styles.listStyle}>
        <IPayList
          textStyle={styles.titleStyle}
          title={localizationText.CARD_ISSUE.VIRTUAL_CARD}
          isShowSubTitle
          subTitle={localizationText.CARD_ISSUE.VIRTUAL_DEATAILS}
          isShowIcon={selectedCard === CardOptions.VIRTUAL}
          icon={selectedCard === CardOptions.VIRTUAL && <IPayIcon icon={icons.tick_check_mark_default} />}
          onPress={() => handleCardSelection(CardOptions.VIRTUAL)}
        />
        <IPayList
          textStyle={styles.titleStyle}
          title={localizationText.CARD_ISSUE.PHYSICAL_CARD}
          isShowSubTitle
          subTitle={localizationText.CARD_ISSUE.PHYSICAL_DETAILS}
          isShowIcon={selectedCard === CardOptions.PHYSICAL}
          icon={selectedCard === CardOptions.PHYSICAL && <IPayIcon icon={icons.tick_check_mark_default} />}
          onPress={() => handleCardSelection(CardOptions.PHYSICAL)}
        />
      </IPayView>
      <IPayView style={styles.buttonContainer}>
        <IPayButton
          btnType="primary"
          large
          hasRightIcon
          rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
          onPress={onNextPress}
          btnText={localizationText.COMMON.NEXT}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayCardIssueBottomSheet;
