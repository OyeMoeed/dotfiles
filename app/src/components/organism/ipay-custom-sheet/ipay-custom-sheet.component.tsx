import { LogoIcon } from '@app/assets/svgs';
import { IPayLinearGradientView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { isIosOS } from '@app/utilities/constants';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { ReactNode, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { verticalScale } from 'react-native-size-matters';
import customSheetStyles from './ipay-custom-sheet.style';

const TOP_SCALE = verticalScale(isIosOS ? 100 : 55);
const SCALED_75 = verticalScale(75);
const SCALED_90 = verticalScale(90);
const SCALED_120 = verticalScale(120);

const IPayCustomSheet = ({ children, boxHeight }: { children: ReactNode; boxHeight: number }) => {
  const { colors } = useTheme();
  const THRESHOLD = isIosOS ? SCALED_120 : DeviceInfo.isTablet() ? SCALED_90 : SCALED_75;
  const TOP_TRANSLATE_Y = -WINDOW_HEIGHT + (boxHeight + THRESHOLD);
  const MAX_TRANSLATE_Y = -WINDOW_HEIGHT + TOP_SCALE;

  const translateY = useSharedValue(0);
  const styles = customSheetStyles(colors);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = context.startY + event.translationY;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, 0);
    },
    onEnd: () => {
      if (translateY.value > -WINDOW_HEIGHT / 2) {
        translateY.value = withSpring(TOP_TRANSLATE_Y);
      } else {
        translateY.value = withSpring(MAX_TRANSLATE_Y);
      }
    },
  });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withSpring(TOP_TRANSLATE_Y);
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <IPayLinearGradientView
          gradientColors={[colors.secondary.secondary300, colors.primary.primary500]}
          style={styles.logoContainer}
        >
          <LogoIcon />
          <IPayView style={styles.childContainer}>
            <ScrollView>{children}</ScrollView>
          </IPayView>
        </IPayLinearGradientView>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default IPayCustomSheet;
