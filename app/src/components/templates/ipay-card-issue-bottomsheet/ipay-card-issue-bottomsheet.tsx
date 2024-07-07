
import React, { useState } from 'react';
import { IPayFootnoteText, IPayIcon, IPayView } from '@app/components/atoms';
import IPaySafeAreaView from '../ipay-safe-area-view/ipay-safe-area-view.component';
import { IPayCardIssueProps } from './ipay-card-issue-bottomsheet.interface';
import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import CardIssueStyle from './ipay-card-issue-bottomsheet.styles';
import { IPayButton, IPayList } from '@app/components/molecules';
import { cardTypes } from '@app/utilities/enums.util';

const IPayCardIssueBottomSheet: React.FC<IPayCardIssueProps> = ({ }: IPayCardIssueProps) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = CardIssueStyle(colors);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardSelection = (cardType: string) => {
    setSelectedCard(cardType);
  };

  return (
    <IPaySafeAreaView style={styles.margin}>
      <IPayView style={styles.headerRow}>
        <IPayIcon icon={icons.add_card2} size={48} color={colors.primary.primary500} />
        <IPayFootnoteText text={localizationText.choose_your_preffered} style={styles.titleColor} />
      </IPayView>
      <IPayView style={styles.listStyle}>
        {/* Step 3: Conditionally render the icon based on selection */}
        <IPayList
          subTextStyle={styles.detailsStyle}
          textStyle={styles.titleStyle}
          title={localizationText.virtual_card}
          isShowSubTitle
          subTitle={localizationText.virtual_details}
          isShowIcon={selectedCard === cardTypes.VIRTUAL}
          icon={selectedCard === cardTypes.VIRTUAL ? <IPayIcon icon={icons.tick_check_mark_default} /> : undefined}
          onPress={() => handleCardSelection(cardTypes.VIRTUAL)}
        />
        <IPayList
          subTextStyle={styles.detailsStyle}
          textStyle={styles.titleStyle}
          title={localizationText.physical_card}
          isShowSubTitle
          subTitle={localizationText.physical_details}
          isShowIcon={selectedCard === cardTypes.PHYSICAL}
          icon={selectedCard === cardTypes.PHYSICAL ? <IPayIcon icon={icons.tick_check_mark_default} /> : undefined}
          onPress={() => handleCardSelection(cardTypes.PHYSICAL)}
        />
      </IPayView>
      <IPayView style={styles.buttonContainer}>
        <IPayButton
          btnType="primary"
          large
          hasRightIcon
          rightIcon={<IPayIcon icon={icons.rightArrow} color={colors.natural.natural0} />}
          btnText={localizationText.next}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default IPayCardIssueBottomSheet;

