import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { IPayButton } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { CardCategories } from '@app/utilities/enums.util';
import { IPayCaption1Text, IPayCaption2Text, IPayFootnoteText, IPayIcon, IPayImage, IPayView } from '@components/atoms';
import React from 'react';
import { ImageBackground, LayoutChangeEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CardInterface, IPayATMCardProps } from './ipay-atm-card.interface';
import cardStyles from './ipay-atm-card.style';

const IPayATMCard: React.FC<IPayATMCardProps> = ({
  testID,
  card,
  setBoxHeight,
  showHeaderText = true,
  backgroundImageStyle,
}) => {
  const { colors } = useTheme();
  const styles = cardStyles(colors);
  const { cardHeaderText, cardType, name, maskedCardNumber } = card;
  const { t } = useTranslation();

  const getDetailByStatus = (item: CardInterface) => {
    if (item.expired) {
      return { text: t('CARDS.CARD_EXPIRED'), icon: icons.alertWaring };
    }
    if (card.frozen) {
      return { text: t('CARDS.CARD_FROZEN'), icon: icons.freeze_icon };
    }
    if (card.suspended) {
      return { text: t('CARDS.TEMPORARILY_SUSPENDED'), icon: icons.alertWaring };
    }
    return { text: '', icon: '' };
  };

  const details = getDetailByStatus(card);

  const cardStyleVariant = {
    [CardCategories.CLASSIC]: {
      logo: images.logo,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visaIcon,
      gradient: colors.classicCardGradient,
      start: { x: 1, y: 0.6 },
      end: { x: 0.1, y: 1 },
      backgroundImage: images.madaCardBg,
    },
    [CardCategories.PLATINUM]: {
      logo: images.logo,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visaIcon,
      gradient: colors.platinumCardGradient,
      start: { x: 1, y: 1.5 },
      end: { x: 1, y: 0.3 },
      backgroundImage: images.platinumCardBg,
    },
    [CardCategories.SIGNATURE]: {
      logo: images.textLogoLight,
      bottomLeftImage: images.madaIcon,
      bottomRightImage: images.visaWhite,
      gradient: colors.signatureCardGradient,
      start: { x: 1, y: 0.6 },
      end: { x: 0.9, y: 1 },
      backgroundImage: images.signatureCardBg,
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
      {showHeaderText && (
        <IPayFootnoteText testID={`${testID}-footnote-text`} style={styles.cardHeaderText}>
          {cardHeaderText}
        </IPayFootnoteText>
      )}
      <ImageBackground
        source={cardStyleVariant[cardType].backgroundImage}
        style={[styles.backgroundImage, backgroundImageStyle]}
      >
        {card.expired || card.frozen || card.suspended ? (
          <IPayView
            style={[
              styles.expiredOverlay,
              card.expired && styles.expiredBackground,
              card.frozen && styles.frozenBackground,
            ]}
          >
            <IPayButton
              btnType="primary"
              btnColor={colors.natural.natural0}
              textColor={colors.primary.primary900}
              btnStyle={styles.btnStyle}
              textStyle={styles.btnTextStyle}
              leftIcon={<IPayIcon size={24} icon={details.icon} />}
              medium
              btnText={details.text}
            />
          </IPayView>
        ) : (
          <IPayView />
        )}
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
                {maskedCardNumber}
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
                  testID={`${testID}-bottom-left-text`}
                  regular={false}
                  color={
                    card.cardType === CardCategories.PLATINUM ? colors.primary.primary900 : colors.primary.primary50
                  }
                  style={styles.cashbackText}
                  text="CARDS.CASHBACK"
                />
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
    </IPayView>
  );
};
export default IPayATMCard;
