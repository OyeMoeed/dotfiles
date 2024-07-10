import React, { useState, useEffect } from 'react';
import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import IPaySafeAreaView from '../ipay-safe-area-view/ipay-safe-area-view.component';
import { IPayCardIssueProps } from './ipay-card-issue-bottomsheet.interface';
import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import CardIssueStyle from './ipay-card-issue-bottomsheet.styles';
import { IPayButton, IPayList } from '@app/components/molecules';
import { CardOptions } from '@app/utilities/enums.util';

const IPayCardIssueBottomSheet: React.FC<IPayCardIssueProps> = ({
  onNextPress,
  onCardSelectedChange,
  testID,
  showSelectedCard = true // Default to true if not provided
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = CardIssueStyle(colors);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    if (onCardSelectedChange) {
      onCardSelectedChange(selectedCard);
    }
  }, [selectedCard, onCardSelectedChange]);

  const handleCardSelection = (cardType: string) => {
    setSelectedCard(cardType);
  };

  return (
    <IPayView testID={`${testID}-card-selection-bottomsheet`} style={styles.margin}>
      <IPayView style={styles.headerRow}>
        <IPayIcon icon={icons.add_card2} size={48} color={colors.primary.primary500} />
        <IPayFootnoteText text={localizationText.CARD_ISSUE.CHOOSE_PREFFERED} style={styles.titleColor} />
      </IPayView>
      <IPayView style={styles.listStyle}>
        <IPayList
          subTextStyle={styles.detailsStyle}
          textStyle={styles.titleStyle}
          title={localizationText.CARD_ISSUE.VIRTUAL_CARD}
          isShowSubTitle
          subTitle={localizationText.CARD_ISSUE.VIRTUAL_DEATAILS}
          isShowIcon={showSelectedCard && selectedCard === CardOptions.VIRTUAL}
          icon={showSelectedCard && selectedCard === CardOptions.VIRTUAL ? <IPayIcon icon={icons.tick_check_mark_default} /> : undefined}
          onPress={() => handleCardSelection(CardOptions.VIRTUAL)}
        />
        <IPayList
          subTextStyle={styles.detailsStyle}
          textStyle={styles.titleStyle}
          title={localizationText.CARD_ISSUE.PHYSICAL_CARD}
          isShowSubTitle
          subTitle={localizationText.CARD_ISSUE.PHYSICAL_DETAILS}
          isShowIcon={showSelectedCard && selectedCard === CardOptions.PHYSICAL}
          icon={showSelectedCard && selectedCard === CardOptions.PHYSICAL ? <IPayIcon icon={icons.tick_check_mark_default} /> : undefined}
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




