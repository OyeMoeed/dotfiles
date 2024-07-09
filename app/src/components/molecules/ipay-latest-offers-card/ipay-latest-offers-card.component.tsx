import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayImage,
  IPayLinearGradientView,
  IPayView,
} from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import colors from '@app/styles/colors.const';
import React, { useCallback } from 'react';
import { IPayLatestListCardProps } from './ipay-latest-offers-card.interface';
import styles from './ipay-latest-offers-card.style';

const IPayLatestListCard: React.FC<IPayLatestListCardProps> = ({
  testID,
  offer,
  onPressUp,
  onPressDown,
  isLastItem,
}: IPayLatestListCardProps): JSX.Element => {
  const localizationText = useLocalization();

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
    <IPayView testID={testID}>
      <IPayLinearGradientView
        gradientColors={colors.appGradient.gradientPrimary10}
        style={[styles.container, isLastItem && styles.lastOffer]}
      >
        <IPayView style={styles.commonContainer}>
          <IPayView style={styles.leftCircleStyle} />

          <IPayImage style={styles.imageStyle} image={getImage()} />

          <IPayImage style={styles.lineImageStyle} image={images.line} />
          <IPayView>
            <IPayFootnoteText style={styles.footnoteTextStyle}>
              {offer?.titleEn || localizationText.noon_shop}
            </IPayFootnoteText>
            <IPayView style={styles.textContainer}>
              <IPayHeadlineText style={styles.headingTextStyle}>{offer?.termsEn || '15 - 30'}</IPayHeadlineText>
              <IPayFootnoteText style={styles.percentageTextStyle} regular={false}>
                {' %'}
              </IPayFootnoteText>
              <IPayCaption1Text style={styles.captionTextStyle}>{localizationText.off}</IPayCaption1Text>
            </IPayView>
            <IPayCaption2Text style={styles.captionsTextStyle}>
              {offer?.termsDetailsEn || localizationText.while_using_alinma_debit_card}
            </IPayCaption2Text>
          </IPayView>
          <IPayView style={styles.rightCircleStyle} />
        </IPayView>
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPayLatestListCard;
