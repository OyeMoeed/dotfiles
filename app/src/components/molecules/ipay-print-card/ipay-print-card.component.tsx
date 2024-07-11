import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayPrintCardProps from './ipay-print-card.interface';
import printCardStyles from './ipay-print-card.styles';

const IPayPrintCard: React.FC<IPayPrintCardProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = printCardStyles(colors);
  const localizationText = useLocalization();
  const handlePrintCard = () => {
    // TODO:Implement Print Card Functionality
  };

  return (
    <IPayView testID={`${testID}-print-card`} style={styles.container}>
      <IPaySubHeadlineText
        regular={false}
        text={localizationText.CARD_OPTIONS.PHYSICAL_CARD}
        color={colors.natural.natural700}
      />
      <IPayCaption1Text color={colors.natural.natural700} text={localizationText.CARD_OPTIONS.PRINT_CARD_DESCRIPTION} />
      <IPayButton
        medium
        btnText={localizationText.CARDS.PRINT_CARD}
        onPress={handlePrintCard}
        btnType="primary"
        leftIcon={<IPayIcon icon={icons.card} color={colors.natural.natural0} size={18} />}
      />
    </IPayView>
  );
};

export default IPayPrintCard;
