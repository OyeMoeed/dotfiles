import LottieView from 'lottie-react-native';
import { IPayLottieAnimationProps } from './ipay-lottie-animation.interface';
import lottieStyles from './ipay-lottie-animation.style';

const IPayLottieAnimation: React.FC<IPayLottieAnimationProps> = ({
  testID,
  source,
  style,
  autoplay = true,
  loop = true,
  ...props
}) => {
  const styles = lottieStyles();
  return (
    <LottieView
      testID={`${testID}-lottie-animation`}
      source={source}
      autoPlay={autoplay}
      loop={loop}
      {...props}
      style={[styles.imgStyle, style]}
    />
  );
};

export default IPayLottieAnimation;
