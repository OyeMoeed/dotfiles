import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';

import { PointRedemptionBackground, PointRedemptionPlus } from '@app/assets/svgs';
import { IPayGradientText } from '@app/components/molecules';
import { SCALE_16 } from '@app/styles/spacing.const';
import { fonts, typography } from '@app/styles/typography.styles';
import { useTranslation } from 'react-i18next';
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
  headerStyle,
  backgroundImageStyle,
  innerContainerStyle,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = pointRedemptionCard(colors);
  const gradientColors = [colors.primary.primary500, colors.secondary.secondary300];

  return (
    <IPayLinearGradientView
      locations={[0, 1]}
      gradientColors={colors.appGradient.gradientPrimary20}
      useAngle
      angle={79.03}
      style={[styles.gradientBackground, containerStyle]}
      testID={testID}
    >
      <PointRedemptionBackground style={[styles.pointRedemptionBackground, backgroundImageStyle]} />
      <IPayView style={[styles.container, innerContainerStyle]}>
        <IPayView style={[styles.header, headerStyle]}>
          <PointRedemptionPlus />
          <IPayText fontFamily={fonts.REGULAR} style={styles.headerText} text="TOP_UP.AKHTR" />
        </IPayView>
        {points && (
          <IPayView style={styles.pointsContainer}>
            <IPayView style={styles.yourPointsContainer}>
              <IPayText style={styles.yourPointsText} text="TOP_UP.YOUR_POINTS" />
              <IPayView style={styles.pointsValueContainer}>
                <IPayGradientText
                  text={`${points} ${t('COMMON.POINTS')}`}
                  gradientColors={gradientColors}
                  fontSize={SCALE_16}
                  fontFamily={typography.FONT_WEIGHT_BOLD}
                  xScale="0"
                  textAnchor="start"
                />
              </IPayView>
            </IPayView>
            <IPayView>
              <IPayText style={styles.pointsValueText} text="TOP_UP.VALUE_OF_POINTS" />
              <IPayView style={styles.pointsValueContainer}>
                <IPayText
                  style={styles.pointsValueAmount}
                  fontFamily={fonts.BOLD}
                  isAmount
                  text={`${amount} ${t('COMMON.SAR')}`}
                />
              </IPayView>
            </IPayView>
          </IPayView>
        )}
      </IPayView>
    </IPayLinearGradientView>
  );
};

export default IPayPointRedemptionCard;
