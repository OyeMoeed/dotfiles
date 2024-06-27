import React from 'react';
import { Animated } from 'react-native';
import images from '@app/assets/images'; // Ensure you have the correct path to your image
import { splashStyles } from './spash.styles';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayView } from '@app/components/atoms';
import useSplashScreenAnimations from './use-animated-splash-screen';

const SplashScreen: React.FC = () => {
  const { opacityAnim, scaleAnim, blurAnim } = useSplashScreenAnimations();
  const { colors } = useTheme();
  const styles = splashStyles(colors);

  return (
    <IPayView style={styles.container}>
      <Animated.Image
        source={images.logo}
        resizeMode={'contain'}
        style={[styles.logo, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}
      />
      <Animated.View style={[styles.blurOverlay, { opacity: blurAnim }]} />
    </IPayView>
  );
};

export default SplashScreen;