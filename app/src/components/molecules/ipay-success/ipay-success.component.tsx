import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFootnoteText,
  IPayLottieAnimation,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayView,
} from '@app/components/atoms';
import { IPayGradientTextMasked } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { StyleSheet } from 'react-native';
import { IPaySuccessProps } from './ipay-success.interface';
import IPaySuccessStyles from './ipay-success.style';

/**
 * A component for Success Message.
 * @param {IPaySuccessProps} props - The props for the Success Message component.
 * @param {string} props.testID - Test ID for testing purposes.
 * @param {ViewStyle} [props.style] - Additional styles for success message.
 * @param {ImageStyle} [props.iconsStyles] - Additional styles for icon.
 * @param {string} [props.headingText] - Text for heading
 * @param {string[]} [props.textGradientColors] - To add gradient colors
 * @param {string} [props.descriptionText] - Text for description
 * @param {string} [props.subHeadingText] - Text for subheading
 * @param {string} [props.headingStyle] - Style for heading text
 * @param {TextStyle} [props.descriptionStyle] - Style for description text
 */
const IPaySuccess: React.FC<IPaySuccessProps> = ({
  testID,
  style,
  iconsStyles,
  headingText,
  textGradientColors,
  descriptionText,
  subHeadingText,
  headingStyle,
  descriptionStyle,
}) => {
  const { colors } = useTheme();
  const styles = IPaySuccessStyles(colors);

  const headingTextGradientColors = textGradientColors || [colors.tertiary.tertiary500, colors.primary.primary450];

  return (
    <IPayView style={[styles.container, style]} testID={`${testID}-success`}>
      <IPayLottieAnimation
        source={successIconAnimation}
        style={StyleSheet.flatten([styles.successIcon, iconsStyles])}
        loop={false}
      />
      <IPayView style={styles.linearGradientTextView}>
        <IPayGradientTextMasked style={[styles.gradientContanier, headingStyle]} colors={headingTextGradientColors}>
          <IPayTitle2Text regular={false} text={headingText} style={styles.gradientText} />
        </IPayGradientTextMasked>
        {descriptionText && (
          <IPayFootnoteText
            regular
            color={colors.primary.primary800}
            text={descriptionText}
            style={[styles.descriptionText, descriptionStyle]}
          />
        )}
        {subHeadingText && <IPaySubHeadlineText regular={false} text={subHeadingText} style={styles.subHeadingText} />}
      </IPayView>
    </IPayView>
  );
};

export default IPaySuccess;
