import LottieView from 'lottie-react-native';
import React from 'react';
import { IPayLottieAnimationProps } from './ipay-lottie-animation.interface';
import lottieStyles from './ipay-lottie-animation.style';

const IPayLottieAnimation: React.FC<IPayLottieAnimationProps> = ({
  testID,
  source,
  style,
  autoplay = true,
  loop = false,
  ...props
}) => {
  const styles = lottieStyles();
  return (
    <LottieView
      testID={`${testID}-lottie-animation`}
      source={source}
      autoPlay={autoplay}
      loop={loop}
      style={[styles.imgStyle, style]}
      {...props}
    />
  );
};

export default IPayLottieAnimation;
