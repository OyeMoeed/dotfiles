import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayAppleWalletButtonStyles from './ipay-print-card.styles';

const IPayPrintCard: React.FC = () => {
  const { colors } = useTheme();
  const styles = IPayAppleWalletButtonStyles(colors);
  const localizationText = useLocalization();
  const handlePrintCard = () => {
    // TODO:Implement Print Card Functionality
  };

  return (
    <IPayView style={styles.container}>
      <IPaySubHeadlineText
        regular={false}
        text={localizationText.CARDS.PHYSICAL_CARD}
        color={colors.natural.natural700}
      />
      <IPayCaption1Text color={colors.natural.natural700} text={localizationText.CARDS.PRINT_CARD_DESCRIPTION} />
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
