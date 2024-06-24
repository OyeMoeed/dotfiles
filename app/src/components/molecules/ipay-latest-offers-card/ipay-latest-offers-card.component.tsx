import images from '@app/assets/images';
import {
  IPayCaption1Text,
  IPayCaption2Text,
  IPayFootnoteText,
  IPayHeadlineText,
  IPayImage,
  IPayLinearGradientView,
  IPayView
} from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayLatestListCardProps } from './ipay-latest-offers-card.interface';
import latestOfferStyles from './ipay-latest-offers-card.style';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayLatestListCard: React.FC<IPayLatestListCardProps> = ({
  testID,
  onPressUp,
  onPressDown
}: IPayLatestListCardProps): JSX.Element => {
  const { colors } = useTheme();
  const styles = latestOfferStyles(colors);
  const localizationText = useLocalization();
  return (
    <IPayView testID={testID}>
      <IPayLinearGradientView gradientColors={colors.appGradient.gradientPrimary10} style={styles.container}>
        <IPayView style={styles.commonContainer}>
          <IPayView style={styles.leftCircleStyle} />
          <IPayImage style={styles.imageStyle} image={images.noon} />
          <IPayImage style={styles.lineImageStyle} image={images.line} />
          <IPayView>
            <IPayFootnoteText style={styles.footnoteTextStyle}>{localizationText.noon_shop}</IPayFootnoteText>
            <IPayView style={styles.textContainer}>
              <IPayHeadlineText style={styles.headingTextStyle}>15-30</IPayHeadlineText>
              <IPayFootnoteText style={styles.footnoteTextStyle}> %</IPayFootnoteText>
              <IPayCaption1Text style={styles.captionTextStyle}> {localizationText.off}</IPayCaption1Text>
            </IPayView>
            <IPayCaption2Text style={styles.captionsTextStyle}>{localizationText.discount_des}</IPayCaption2Text>
          </IPayView>
          <IPayView style={styles.rightCircleStyle} />
        </IPayView>
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPayLatestListCard;
