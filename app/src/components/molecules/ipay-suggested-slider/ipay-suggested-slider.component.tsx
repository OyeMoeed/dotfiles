import images from '@app/assets/images';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayLargeTitleText,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView
} from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPaySuggestedSliderProps } from './ipay-suggested-slider.interface';
import genratedStyles from './ipay-suggested-slider.style';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPaySuggestedSlider: React.FC<IPaySuggestedSliderProps> = ({
  testID,
  onPressUp,
  onPressDown
}: IPaySuggestedSliderProps): JSX.Element => {
  const { colors, icons } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();
  return (
    <IPayView testID={testID} style={styles.mainContainer}>
      <IPayLinearGradientView
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
        gradientColors={[colors.primary.primary200, colors.orangePalette.oraange10]}
      >
        <IPayView style={[styles.commonConStyle, styles.flexContainer]}>
          {/* left side Text */}
          <IPayView>
            <IPayView style={styles.commonConStyle}>
              <IPayIcon icon="receipt-item" size={18} />
              <IPayFootnoteText style={styles.footnoteTextStyle}>{localizationText.bill_Payments}</IPayFootnoteText>
            </IPayView>
            <IPayCaption2Text style={[styles.footnoteTextStyle, styles.captionTextStyle]}>
              {localizationText.bill_payments_des}
            </IPayCaption2Text>
          </IPayView>
          {/* Right side Text */}
          <IPayView>
            <IPayLargeTitleText style={styles.largeTextStyle}>45%</IPayLargeTitleText>
            <IPaySubHeadlineText style={styles.subHeadingTextStyle}>{localizationText.cashback}</IPaySubHeadlineText>
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
