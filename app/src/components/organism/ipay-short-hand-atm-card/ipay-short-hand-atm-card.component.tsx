import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayImageBackground,
  IPayText,
  IPayView,
} from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardTypes, CardTypesCodes } from '@app/utilities/enums.util';
import React from 'react';
import { IPayShortHandATMCardProps } from './ipay-short-hand-atm-card.interface';
import cardStyles from './ipay-short-hand-atm-card.style';

const IPayShortHandAtmCard: React.FC<IPayShortHandATMCardProps> = ({ textID, cardData }) => {
  const { colors } = useTheme();
  const styles = cardStyles(colors);
  const localizationText = useLocalization();

  const getCardImage = () => {
    switch (cardData?.cardTypeId) {
      case CardTypesCodes.MADA:
        return images.shortHandDeitCard;
      case CardTypesCodes.PLATINUM:
        return images.shortHandPlatinuimCard;
      default:
        return images.shortHandSignatureCard;
    }
  };

  const getCardlogo = () => {
    switch (cardData?.cardType) {
      case CardTypes.SIGNATURE_CARD:
        return <IPayText style={styles.cashBackTextSignatureCard} text={localizationText.CARDS.CASHBACK} />;
      case CardTypes.PLATINUIM_CARD:
        return <IPayText style={styles.cashBackText} text={localizationText.CARDS.CASHBACK} />;
      default:
        return <IPayIcon icon={icons.mada_logo} size={35} />;
    }
  };

  const maskCardNumber = (cardNumber: string): string => {
    const parts = cardNumber.split(' ');
    return `**** ${parts[parts.length - 1]}`;
  };

  const textColor =
    cardData?.cardType === CardTypes.SIGNATURE_CARD ? colors.natural.natural0 : colors.primary.primary900;
  return (
    <IPayView style={styles.atmCardView} testID={`${textID}-short-hand-atm-card`}>
      <IPayImageBackground image={getCardImage()} resizeMode="stretch" style={styles.atmCardImg}>
        <IPayView style={styles.cartInfoView}>
          <IPayView>
            <IPayView style={styles.titleAndCardNumberView}>
              <IPayFootnoteText regular={false} text={cardData.name} color={textColor} />
              <IPayCaption2Text text={cardData?.maskedCardNumber} style={styles.cardNumberText} color={textColor} />
            </IPayView>
            <IPayCaption2Text text={cardData.cardClassDesc} color={textColor} />
          </IPayView>

          <IPayView style={styles.cardlogoView}>
            {getCardlogo()}

            <IPayView style={styles.visaLogoView}>
              <IPayIcon
                icon={cardData?.cardType === CardTypes.SIGNATURE_CARD ? icons.visa_logo_white : icons.visa_logo}
                size={36}
              />
            </IPayView>

            <IPayImage
              image={images.gradientLogo}
              style={[
                styles.gradientLogo,
                cardData?.cardType === CardTypes.SIGNATURE_CARD && {
                  tintColor: colors.natural.natural0,
                },
              ]}
            />
          </IPayView>
        </IPayView>
      </IPayImageBackground>
    </IPayView>
  );
};

export default IPayShortHandAtmCard;
