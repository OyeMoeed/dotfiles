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
    tintColor: cardType === CardTypes.SIGNATURE ? colors.natural.natural0 : undefined,
  };

  const cardTypeNameAndCardNoColor = {
    color: cardType === CardTypes.SIGNATURE ? colors.natural.natural0 : colors.primary.primary900, // primary900
  };

  const cardHolderNameColor = {
    color: cardType === CardTypes.SIGNATURE ? colors.natural.natural0 : colors.natural.natural900, // natural900
  };

  return (
    <IPayView style={[styles.container, containerStyle]}>
      <ImageBackground source={images[cardType]} style={styles.imageBackgroundContainer}>
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
              <IPayImage testID="madaIcon" style={styles.madaIcon} image={images.madaIcon} />
            ) : (
              <IPayImage style={[styles.cashbackImage, tintStyle]} testID="cashback" image={images.cashback} />
            )}
            <IPayImage style={[styles.visaIcon, tintStyle]} testID="visaIcon" image={images.visaIcon} />
            <IPayImage style={[styles.logoIcon, tintStyle]} testID="logoIconGradient" image={images.logoIconGradient} />
          </IPayView>
        </IPayView>
      </ImageBackground>
    </IPayView>
  );
};

export default IPayCardDetailsBannerComponent;
