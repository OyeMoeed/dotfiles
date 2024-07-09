import images from '@app/assets/images';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardCategories } from '@app/utilities/enums.util';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayView,
} from '@components/atoms';
import React from 'react';
import { ImageBackground } from 'react-native';
import { IPayATMCardProps } from './ipay-atm-card.interface';
import cardStyles from './ipay-atm-card.style';
import useLocalization from '@app/localization/hooks/localization.hook';

const IPayATMCard: React.FC<IPayATMCardProps> = ({ testID, card }) => {
  const { colors } = useTheme();
  const styles = cardStyles(colors);
  const localizationText = useLocalization()

  const cardStyleVariant = {
    [CardCategories.CLASSIC]: {
      logo: images.logo,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visa,
      gradient: colors.classicCardGradient,
      start: { x: 1, y: 0.6 },
      end: { x: 0.1, y: 1 },
      backgroundImage: images.classicBg,
    },
    [CardCategories.PLATINUM]: {
      logo: images.logo,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visa,
      gradient: colors.platinumCardGradient,
      start: { x: 1, y: 1.5 },
      end: { x: 1, y: 0.3 },
      backgroundImage: images.platinumBg,
    },
    [CardCategories.SIGNATURE]: {
      logo: images.textLogoLight,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visaWhite,
      gradient: colors.signatureCardGradient,
      start: { x: 1, y: 0.6 },
      end: { x: 0.9, y: 1 },
      backgroundImage: images.signatureBg,
    },
  };

  return (
    <IPayView testID={testID} style={styles.cardContainer}>
      <IPayFootnoteText testID={testID} style={styles.cardHeaderText}>
        {card.cardHeaderText}
      </IPayFootnoteText>
      <IPayLinearGradientView
        gradientColors={cardStyleVariant[card.cardType].gradient}
        start={cardStyleVariant[card.cardType].start}
        end={cardStyleVariant[card.cardType].end}
        style={styles.gradientView}
      >
        <ImageBackground source={cardStyleVariant[card.cardType].backgroundImage} style={styles.backgroundImage}>
          <IPayView style={styles.innerContainer}>
            <IPayImage image={cardStyleVariant[card.cardType].logo} style={styles.logoImage} />
            <IPayView style={styles.textContainer}>
              <IPayView style={styles.details}>
                <IPayCaption1Text
                  style={[card.cardType === CardCategories.SIGNATURE ? styles.lightCardName : styles.cardName]}
                  regular={false}
                >
                  {card.name}
                </IPayCaption1Text>
                <IPayCaption1Text
                  style={[card.cardType === CardCategories.SIGNATURE ? styles.lightCardNumber : styles.cardNumber]}
                >
                  {card.cardNumber}
                </IPayCaption1Text>
              </IPayView>
              <IPayView style={styles.bottomImagesContainer}>
                {card.cardType === CardCategories.CLASSIC ? (
                  <IPayImage
                    testID={`${testID}-bottom-left`}
                    image={cardStyleVariant[card.cardType].bottomLeftImage}
                    style={styles.bottomImage}
                  />
                ) : (
                  <IPayCaption2Text
                    testID={`${testID}-bottom-left`}
                    style={[
                      styles.cashbackText,
                      card.cardType === CardCategories.PLATINUM ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {localizationText.CARDS.CASHBACK}
                  </IPayCaption2Text>
                )}
                <IPayImage
                  testID={`${testID}-bottom-right`}
                  image={cardStyleVariant[card.cardType].bottomRightImage}
                  style={styles.bottomImage}
                />
              </IPayView>
            </IPayView>
          </IPayView>
        </ImageBackground>
      </IPayLinearGradientView>
    </IPayView>
  );
};
export default IPayATMCard;
