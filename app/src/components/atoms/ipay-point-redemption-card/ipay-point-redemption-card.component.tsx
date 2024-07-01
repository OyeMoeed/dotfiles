import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';

import { PointRedemptionBackground, PointRedemptionPlus } from '@app/assets/svgs';
import { IPayGradientText } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { SCALE_20 } from '@app/styles/spacing.const';
import { fonts, typography } from '@app/styles/typography.styles';
import IPayLinearGradientView from '../ipay-linear-gradient-view/ipay-linear-gradient.component';
import IPayText from '../ipay-text/ipay-base-text/ipay-text.component';
import IPayView from '../ipay-view/ipay-view.component';
import { IPayPointRedemptionCardProps } from './ipay-point-redemption-card.interface';
import pointRedemptionCard from './ipay-point-redemption-card.styles';

const IPayPointRedemptionCard: React.FC<IPayPointRedemptionCardProps> = ({
  testID,
  containerStyle,
  points,
  amount,
  pointsStyle,
  headerStyle,
  backgroundImageStyle,
}) => {
  const { colors } = useTheme();
  const styles = pointRedemptionCard(colors);
  const localizationText = useLocalization();
  const gradientColors = [colors.primary.primary500, colors.secondary.secondary300];

  return (
    <IPayLinearGradientView
      locations={[0, 1]}
      gradientColors={colors.appGradient.gradientPrimary20}
      useAngle={true}
      angle={79.03}
      style={[styles.gradientBackground, containerStyle]}
      testID={testID}
    >
      <PointRedemptionBackground style={[styles.pointRedemptionBackground, backgroundImageStyle]} />
      <IPayView style={styles.container}>
        <IPayView style={[styles.header, headerStyle]}>
          <PointRedemptionPlus />
          <IPayText
            fontFamily={fonts.REGULAR}
            style={styles.headerText}
            text={localizationText.akthr_points_redemption}
          />
        </IPayView>
        {points && (
          <IPayView style={styles.pointsContainer}>
            <IPayView style={styles.yourPointsContainer}>
              <IPayText style={styles.yourPointsText} text={localizationText.your_points} />
              <IPayView>
                <IPayGradientText
                  text={`${points} ${localizationText.points}`}
                  gradientColors={gradientColors}
                  fontSize={SCALE_20}
                  fontFamily={typography.FONT_WEIGHT_BOLD}
                  xScale="42%"
                  style={[styles.gradientText, pointsStyle]}
                />
              </IPayView>
            </IPayView>
            <IPayView>
              <IPayText style={styles.pointsValueText} text={localizationText.value_of_points} />
              <IPayText
                style={styles.pointsValueAmount}
                fontFamily={fonts.BOLD}
                isAmount
                text={`${amount} ${localizationText.sar}`}
              />
            </IPayView>
          </IPayView>
        )}
      </IPayView>
    </IPayLinearGradientView>
  );
};

export default IPayPointRedemptionCard;
