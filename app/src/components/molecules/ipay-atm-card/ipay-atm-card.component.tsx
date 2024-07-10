import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayButton } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardCategories } from '@app/utilities/enums.util';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLinearGradientView,
  IPayView,
} from '@components/atoms';
import React from 'react';
import { ImageBackground, LayoutChangeEvent } from 'react-native';
import { IPayATMCardProps } from './ipay-atm-card.interface';
import cardStyles from './ipay-atm-card.style';

const IPayATMCard: React.FC<IPayATMCardProps> = ({ testID, card, setBoxHeight }) => {
  const { colors } = useTheme();
  const styles = cardStyles(colors);
  const { cardHeaderText, cardType, name, cardNumber } = card;
  const localizationText = useLocalization();

  const cardStyleVariant = {
    [CardCategories.CLASSIC]: {
      logo: images.logo,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visa,
      gradient: colors.classicCardGradient,
      start: { x: 1, y: 0.6 },
      end: { x: 0.1, y: 1 },
      backgroundImage: images.classicBg,
      expired: false,
    },
    [CardCategories.PLATINUM]: {
      logo: images.logo,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visa,
      gradient: colors.platinumCardGradient,
      start: { x: 1, y: 1.5 },
      end: { x: 1, y: 0.3 },
      backgroundImage: images.platinumBg,
      expired: true,
    },
    [CardCategories.SIGNATURE]: {
      logo: images.textLogoLight,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visaWhite,
      gradient: colors.signatureCardGradient,
      start: { x: 1, y: 0.6 },
      end: { x: 0.9, y: 1 },
      backgroundImage: images.signatureBg,
      expired: true,
    },
  };

  return (
    <IPayView
      onLayout={({ nativeEvent }: LayoutChangeEvent) => {
        const { height } = nativeEvent.layout;
        setBoxHeight?.(height);
      }}
      testID={`${testID}-view`}
      style={styles.cardContainer}
    >
      <IPayFootnoteText testID={`${testID}-footnote-text`} style={styles.cardHeaderText}>
        {cardHeaderText}
      </IPayFootnoteText>
      <IPayLinearGradientView
        gradientColors={cardStyleVariant[cardType].gradient}
        start={cardStyleVariant[cardType].start}
        end={cardStyleVariant[cardType].end}
        style={styles.gradientView}
      >
        {cardStyleVariant[cardType].expired ? (
          <IPayView style={styles.expiredOverlay}>
            <IPayButton
              btnType="primary"
              btnColor={colors.natural.natural0}
              textColor={colors.primary.primary900}
              btnStyle={styles.btnStyle}
              textStyle={styles.btnTextStyle}
              leftIcon={<IPayIcon size={24} icon={icons.alertWaring} />}
              medium
              btnText={localizationText.CARDS.CARD_EXPIRED}
            />
          </IPayView>
        ) : (
          <IPayView />
        )}
        <ImageBackground source={cardStyleVariant[cardType].backgroundImage} style={styles.backgroundImage}>
          <IPayView style={styles.innerContainer}>
            <IPayImage image={cardStyleVariant[cardType].logo} style={styles.logoImage} />
            <IPayView style={styles.textContainer}>
              <IPayView style={styles.details}>
                <IPayCaption1Text
                  style={cardType === CardCategories.SIGNATURE ? styles.lightCardName : styles.cardName}
                  regular={false}
                >
                  {name}
                </IPayCaption1Text>
                <IPayCaption1Text
                  style={cardType === CardCategories.SIGNATURE ? styles.lightCardNumber : styles.cardNumber}
                >
                  {cardNumber}
                </IPayCaption1Text>
              </IPayView>
              <IPayView style={styles.bottomImagesContainer}>
                {cardType === CardCategories.CLASSIC ? (
                  <IPayImage
                    testID={`${testID}-bottom-left-image`}
                    image={cardStyleVariant[cardType].bottomLeftImage}
                    style={styles.bottomImage}
                  />
                ) : (
                  <IPayCaption2Text
                    testID={`${testID}-bottom-left`}
                    regular={false}
                    color={
                      card.cardType === CardCategories.PLATINUM ? colors.primary.primary900 : colors.primary.primary50
                    }
                    style={styles.cashbackText}
                  >
                    {localizationText.CARDS.CASHBACK}
                  </IPayCaption2Text>
                )}
                <IPayImage
                  testID={`${testID}-bottom-right-image`}
                  image={cardStyleVariant[cardType].bottomRightImage}
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
