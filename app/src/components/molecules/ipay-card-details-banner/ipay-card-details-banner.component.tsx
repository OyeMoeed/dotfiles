import React from 'react';

import images from '@app/assets/images';
import colors from '@app/styles/colors.const';

import { CardTypes } from '@app/utilities/enums.util';
import { ImageBackground } from 'react-native';
import { IPayCaption2Text, IPayFootnoteText, IPayImage, IPayView } from '@app/components/atoms';
import { IPayCardDetailsBannerProps } from './ipay-card-details-banner.interface';
import styles from './ipay-card-details-banner.style';

/**
 * A customizable button component.
 * @param {IPayCardDetailsBannerProps} props - The props for the RNButton component.
 * @returns {JSX.Element} - The rendered component.
 */

const IPayCardDetailsBannerComponent: React.FC<IPayCardDetailsBannerProps> = ({
  cardType,
  cardTypeName,
  carHolderName,
  containerStyle,
  cardLastFourDigit,
}: IPayCardDetailsBannerProps) => {
  const tintStyle = {
    tintColor:
      cardType === CardTypes.SIGNATURE || cardType === CardTypes.SIGNATURE_CARD ? colors.natural.natural0 : undefined,
  };

  const cardTypeNameAndCardNoColor = {
    color:
      cardType === CardTypes.SIGNATURE || cardType === CardTypes.SIGNATURE_CARD
        ? colors.natural.natural0
        : colors.primary.primary900, // primary900
  };

  const cardHolderNameColor = {
    color:
      cardType === CardTypes.SIGNATURE || cardType === CardTypes.SIGNATURE_CARD
        ? colors.natural.natural0
        : colors.natural.natural900, // natural900
  };

  const getCardCoverImage = () => {
    switch (cardType) {
      case CardTypes.DEBIT_CARD:
      case CardTypes.CLASSIC:
        return images.classicCover;
      case CardTypes.PLATINUIM_CARD:
      case CardTypes.PLATINUM:
        return images.platinumCover;
      case CardTypes.SIGNATURE_CARD:
      case CardTypes.SIGNATURE:
        return images.signatureCover;
      default:
        return images.classicCover;
    }
  };

  return (
    <IPayView style={[styles.container, containerStyle]}>
      <ImageBackground source={getCardCoverImage()} style={styles.imageBackgroundContainer}>
        <IPayView style={styles.childContainer}>
          <IPayView style={styles.contentContainer}>
            <IPayView style={styles.nameContainer}>
              <IPayFootnoteText style={cardHolderNameColor} regular={false} text={carHolderName} />
              <IPayCaption2Text style={cardTypeNameAndCardNoColor} text={`**** ${cardLastFourDigit}`} />
            </IPayView>
            <IPayCaption2Text style={cardTypeNameAndCardNoColor} text={cardTypeName} />
          </IPayView>
          <IPayView style={styles.iconsContainer}>
            {cardType === CardTypes.CLASSIC ? (
              <IPayImage testID="madaIcon" resizeMode="contain" style={styles.madaIcon} image={images.madaIcon} />
            ) : (
              <IPayImage
                style={[styles.cashbackImage, tintStyle]}
                testID="cashback"
                image={images.cashback}
                resizeMode="contain"
              />
            )}
            <IPayImage
              style={[styles.visaIcon, tintStyle]}
              resizeMode="contain"
              testID="visaIcon"
              image={images.visaIcon}
            />
            <IPayImage
              style={[styles.logoIcon, tintStyle]}
              resizeMode="contain"
              testID="logoIconGradient"
              image={images.logoIconGradient}
            />
          </IPayView>
        </IPayView>
      </ImageBackground>
    </IPayView>
  );
};

export default IPayCardDetailsBannerComponent;
