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
import { IPaySuccessProps } from './ipay-success-component.interface';
import IPaySuccessStyles from './ipay-success-component.style';

const IPaySuccess: React.FC<IPaySuccessProps> = ({
  testID,
  style,
  iconsStyles,
  headingText,
  textGradientColors,
  descriptionText,
  subHeadingText,
}) => {
  const { colors } = useTheme();
  const styles = IPaySuccessStyles(colors);

  const headingTextGradientColors = textGradientColors || [colors.tertiary.tertiary500, colors.primary.primary450];

  return (
    <IPayView style={[styles.container, style]} testID={`${testID}-success`}>
      <IPayLottieAnimation
        source={successIconAnimation}
        style={StyleSheet.flatten([styles.successIcon, iconsStyles])}
        loop
      />
      <IPayView style={styles.linearGradientTextView}>
        <IPayGradientTextMasked colors={headingTextGradientColors}>
          <IPayTitle2Text regular={false} text={headingText} style={styles.gradientText} />
        </IPayGradientTextMasked>
        {descriptionText && (
          <IPayFootnoteText
            regular
            color={colors.primary.primary800}
            text={descriptionText}
            style={styles.discriptionText}
          />
        )}
        {subHeadingText && <IPaySubHeadlineText regular={false} text={subHeadingText} style={styles.subHeadingText} />}
      </IPayView>
    </IPayView>
  );
};

export default IPaySuccess;
