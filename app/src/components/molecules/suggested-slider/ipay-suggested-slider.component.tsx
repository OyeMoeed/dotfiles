import React, { JSX } from 'react';
import { ImageStyle } from 'react-native';
import images from '@app/assets/images';
import { ReceiptIcon } from '@app/assets/svgs/index';
import {
  IPayCaption2Text,
  IPayFootnoteText,
  IPayImage,
  IPayLargeTitleText,
  IPayLinearGradientView,
  IPayText,
  IPayView,
} from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import { IPaySuggestedSliderProps } from './ipay-suggested-slider.interface';
import styles from './ipay-suggested-slider.style';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPaySuggestedSlider: React.FC<IPaySuggestedSliderProps> = ({ testID }: IPaySuggestedSliderProps): JSX.Element => (
  <IPayView testID={testID} style={styles.mainContainer}>
    <IPayLinearGradientView
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
      gradientColors={[colors.primary.primary200, colors.warning.warningOpacity]}
    >
      <IPayView style={styles.commonConStyle}>
        {/* left side Text */}
        <IPayView>
          <IPayView style={styles.commonConStyle}>
            <ReceiptIcon />
            <IPayFootnoteText style={styles.footnoteTextStyle}>Bill Payments</IPayFootnoteText>
          </IPayView>
          <IPayCaption2Text style={[styles.footnoteTextStyle, styles.captionTextStyle]}>
            {'on your wallet with \nevery bill payment!'}
          </IPayCaption2Text>
        </IPayView>
        {/* Right side Text */}
        <IPayView>
          <IPayLargeTitleText style={styles.largeTextStyle}>45%</IPayLargeTitleText>
          <IPayText style={styles.subHeadingTextStyle}>cash-back</IPayText>
        </IPayView>
      </IPayView>
      <IPayView style={styles.imagContainer}>
        <IPayImage style={styles.imageStyle as ImageStyle} image={images.currency} />
      </IPayView>
    </IPayLinearGradientView>
  </IPayView>
);

export default IPaySuggestedSlider;
