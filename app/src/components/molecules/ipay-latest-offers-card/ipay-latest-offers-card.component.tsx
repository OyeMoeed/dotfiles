import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayImage,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback } from 'react';
import { ImageBackground } from 'react-native';
import { IPayLatestOfferCardProps } from './ipay-latest-offers-card.interface';
import latestOfferCardStyle from './ipay-latest-offers-card.style';

const IPayLatestOfferCard: React.FC<IPayLatestOfferCardProps> = ({
  testID,
  offer,
  containerStyle,
  offerImageStyle,
  isLastItem,
  lineImageStyle,
  childContainerStyle,
  offStyles,
  onPress,
  isSpecialOffer,
}: IPayLatestOfferCardProps) => {
  const localizationText = useLocalization();
  const { colors } = useTheme();

  const styles = latestOfferCardStyle(colors);

  const getImage = useCallback(() => {
    // Check if offer and imageUrlEn exist
    const imageUrl = offer?.imageUrlEn;
    if (!imageUrl) {
      return null; // or handle case where image URL is not available
    }
    const encodedImageUrl = encodeURIComponent(imageUrl);
    return `https://api.allorigins.win/raw?url=${encodedImageUrl}`;
  }, [offer?.imageUrlEn]);

  return (
    <IPayPressable onPress={onPress} testID={testID} style={[containerStyle, isLastItem && styles.lastOffer]}>
      <ImageBackground resizeMode="contain" source={images.offersCover} style={styles.imageBackgroundContainer}>
        <IPayView style={[styles.childContainer, childContainerStyle]}>
          <IPayImage
            style={[styles.imageStyle, offerImageStyle]}
            image={offer?.imageUrlEn ? getImage() : images.offerPlaceholder}
          />

          <IPayImage style={[styles.lineImageStyle, lineImageStyle]} image={images.line} />
          <IPayView style={styles.detailsContainer}>
            <IPayFootnoteText text={offer?.titleEn} regular color={colors.natural.natural900} />
            <IPayView style={styles.textContainer}>
              <IPayHeadlineText style={styles.headingTextStyle}>{offer?.termsEn}</IPayHeadlineText>
              <IPayFootnoteText style={styles.percentageTextStyle} regular={false}>
                {' %'}
              </IPayFootnoteText>
              <IPayCaption1Text style={[styles.captionTextStyle, offStyles]}>
                {localizationText.CARDS.OFF}
              </IPayCaption1Text>
            </IPayView>

            <IPayCaption2Text
              numberOfLines={2}
              text={offer?.titleDetailsEn}
              color={colors.primary.primary900}
              style={styles.captionsTextStyle}
            />
            {isSpecialOffer && (
              <IPayView style={styles.specialOfferContainer}>
                <IPayCaption2Text
                  color={colors.secondary.secondary500}
                  regular
                  text={localizationText.OFFERS.SPECIAL_OFFER}
                />
              </IPayView>
            )}
          </IPayView>
        </IPayView>
      </ImageBackground>
    </IPayPressable>
  );
};

export default IPayLatestOfferCard;
