import images from '@app/assets/images';
import useTheme from '@app/styles/hooks/theme.hook';
import { cardTypes } from '@app/utilities/enums.util';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayImage,
  IPayLinearGradientView,
  IPayText,
  IPayView,
} from '@components/atoms';
import React from 'react';
import { ImageBackground } from 'react-native';
import { IPayATMCardProps } from './ipay-atm-card.interface';
import cardStyles from './ipay-atm-card.style';

const IPayATMCard: React.FC<IPayATMCardProps> = ({ item }) => {
  const { colors } = useTheme();
  const styles = cardStyles(colors);

  const cardStyleVariant = {
    [cardTypes.CLASSIC]: {
      logo: images.logo,
      bottomLeftImage: images.mada,
      bottomRightImage: images.visa,
      gradient: colors.classicCardGradient,
      start: { x: 1, y: 0.6 },
      end: { x: 0.1, y: 1 },
      backgroundImage: images.classicBg,
    },
    [cardTypes.PLATINUM]: {
      logo: images.logo,
      bottomLeftImage: images.mada,
      bottomRightImage: images.visa,
      gradient: colors.platinumCardGradient,
      start: { x: 1, y: 1.5 },
      end: { x: 1, y: 0.3 },
      backgroundImage: images.platinumBg,
    },
    [cardTypes.SIGNATURE]: {
      logo: images.textLogoLight,
      bottomLeftImage: images.mada,
      bottomRightImage: images.visaWhite,
      gradient: colors.signatureCardGradient,
      start: { x: 1, y: 0.6 },
      end: { x: 0.9, y: 1 },
      backgroundImage: images.signatureBg,
    },
  };

  return (
    <IPayView style={styles.cardContainer}>
      <IPayFootnoteText style={styles.cardHeaderText}>{item.cardHeaderText}</IPayFootnoteText>
      <IPayLinearGradientView
        gradientColors={cardStyleVariant[item.cardVariant].gradient}
        start={cardStyleVariant[item.cardVariant].start}
        end={cardStyleVariant[item.cardVariant].end}
        style={styles.gradientView}
      >
        <ImageBackground source={cardStyleVariant[item.cardVariant].backgroundImage} style={styles.backgroundImage}>
          <IPayView style={styles.innerContainer}>
            <IPayImage image={cardStyleVariant[item.cardVariant].logo} style={styles.logoImage} />
            <IPayView style={styles.textContainer}>
              <IPayView style={styles.details}>
                <IPayCaption1Text
                  style={[item.cardVariant === cardTypes.SIGNATURE ? styles.lightCardName : styles.cardName]}
                  regular={false}
                >
                  {item.name}
                </IPayCaption1Text>
                <IPayCaption1Text
                  style={[item.cardVariant === cardTypes.SIGNATURE ? styles.lightCardNumber : styles.cardNumber]}
                >
                  {item.cardNumber}
                </IPayCaption1Text>
              </IPayView>
              <IPayView style={styles.bottomImagesContainer}>
                {item.cardVariant === cardTypes.CLASSIC ? (
                  <IPayImage image={cardStyleVariant[item.cardVariant].bottomLeftImage} style={styles.bottomImage} />
                ) : (
                  <IPayText
                    style={[
                      styles.cashbackText,
                      item.cardVariant === cardTypes.PLATINUM ? styles.darkText : styles.lightText,
                    ]}
                  >
                    CASHBACK
                  </IPayText>
                )}
                <IPayImage image={cardStyleVariant[item.cardVariant].bottomRightImage} style={styles.bottomImage} />
              </IPayView>
            </IPayView>
          </IPayView>
        </ImageBackground>
      </IPayLinearGradientView>
    </IPayView>
  );
};
export default IPayATMCard;
