import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLargeTitleText,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { IPaySuggestedSliderProps } from './ipay-suggested-slider.interface';
import genratedStyles from './ipay-suggested-slider.style';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPaySuggestedSlider: React.FC<IPaySuggestedSliderProps> = ({ testID }: IPaySuggestedSliderProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = genratedStyles(colors);

  return (
    <IPayView testID={testID} style={styles.mainContainer}>
      <IPayLinearGradientView
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
        gradientColors={[colors.primary.primary200, colors.orange.oraange10]}
      >
        <IPayView style={styles.commonConStyle}>
          {/* left side Text */}
          <IPayView>
            <IPayView style={styles.commonConStyle}>
              {/* <icons.receiptIcon /> */}
              <IPayIcon icon={icons.receipt_item} size={18} color={colors.orange.orange500} />
              <IPayFootnoteText style={styles.footnoteTextStyle} text="HOME.BILL_PAYMENTS" />
            </IPayView>
            <IPayCaption2Text style={[styles.footnoteTextStyle, styles.captionTextStyle]}>
              {t('CARDS.WALLET_WITH_EVERY_BILL')}
            </IPayCaption2Text>
          </IPayView>
          {/* Right side Text */}
          <IPayView>
            <IPayLargeTitleText style={styles.largeTextStyle}>45%</IPayLargeTitleText>
            <IPaySubHeadlineText style={styles.subHeadingTextStyle} text="COMMON.CASH_BACK" />
          </IPayView>
        </IPayView>
        <IPayView style={styles.imagContainer}>
          <IPayImage style={styles.imageStyle} image={images.currency} />
        </IPayView>
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPaySuggestedSlider;
