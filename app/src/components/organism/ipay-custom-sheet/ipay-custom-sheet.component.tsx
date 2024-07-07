import { LogoIcon } from '@app/assets/svgs';
import { IPayLinearGradientView, IPayScrollView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { isIosOS } from '@app/utilities/constants';
import { getCustomSheetThreshold } from '@app/utilities/custom-sheet-helper.utils';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { verticalScale } from 'react-native-size-matters';
import { IPayCustomSheetProps } from './ipay-custom-sheet.interface';
import customSheetStyles from './ipay-custom-sheet.style';

/**
 * calculated top header value for ios and android devices
 */
const TOP_SCALE = verticalScale(isIosOS ? 100 : 60);

/**
 * A home page gragable sheet
 * @param {IPayCustomSheetProps} props - The props for the IPayCustomSheetProps component.
 * @param {props.testID} - The props for adding test id to test element.
 * @param {props.children} - The props for children element.
 * @param {props.boxHeight} - The that is being used pass the height of element above this component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayCustomSheet: React.FC<IPayCustomSheetProps> = ({ testID, children, boxHeight = 300 }) => {
  const { colors } = useTheme();
  const THRESHOLD = getCustomSheetThreshold();
  const TOP_TRANSLATE_Y = -WINDOW_HEIGHT + (boxHeight + THRESHOLD);
  const MAX_TRANSLATE_Y = -WINDOW_HEIGHT + TOP_SCALE;
  const MID_POINT = WINDOW_HEIGHT / 2;

  const translateY = useSharedValue(TOP_TRANSLATE_Y);
  const styles = customSheetStyles(colors);

  const panGestureHandler = Gesture.Pan()
    .onChange((event) => {
      const newTranslateY = translateY.value + event.translationY;

      if (newTranslateY <= 0 && newTranslateY >= MAX_TRANSLATE_Y) {
        if (newTranslateY < -MID_POINT) {
          translateY.value = withSpring(newTranslateY);
        } else {
          translateY.value = withSpring(newTranslateY);
        }
      }
    })
    .onEnd(() => {
      if (translateY.value > -MID_POINT) {
        translateY.value = withSpring(TOP_TRANSLATE_Y);
      } else {
        translateY.value = withSpring(MAX_TRANSLATE_Y);
      }
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withSpring(TOP_TRANSLATE_Y);
  }, []);

  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View testID={`${testID}-animated`} style={[styles.bottomSheetContainer, animatedStyles]}>
        <IPayLinearGradientView
          testID={`${testID}-gradient`}
          gradientColors={[colors.secondary.secondary300, colors.primary.primary500]}
          style={styles.logoContainer}
        >
          <LogoIcon width={scaleSize(28)} height={verticalScale(28)} />
          <IPayView testID={testID} style={styles.childContainer}>
            <IPayScrollView testID={testID} isGHScrollView>
              {children}
            </IPayScrollView>
          </IPayView>
        </IPayLinearGradientView>
      </Animated.View>
    </GestureDetector>
  );
};

export default IPayCustomSheet;
