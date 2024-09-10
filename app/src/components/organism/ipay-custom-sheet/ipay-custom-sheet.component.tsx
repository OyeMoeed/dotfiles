import icons from '@app/assets/icons';
import { LogoIcon } from '@app/assets/svgs';
import { IPayAnimatedView, IPayIcon, IPayLinearGradientView, IPayScrollView, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { isIosOS } from '@app/utilities/constants';
import { getCustomSheetThreshold } from '@app/utilities/custom-sheet-helper.utils';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
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
const IPayCustomSheet: React.FC<IPayCustomSheetProps> = ({
  testID,
  children,
  gradientHandler = false,
  simpleHandler = true,
  boxHeight = 300,
  topScale = TOP_SCALE,
  customHandler,
}) => {
  const { colors } = useTheme();
  const THRESHOLD = getCustomSheetThreshold();
  const TOP_TRANSLATE_Y = -WINDOW_HEIGHT + (boxHeight + THRESHOLD);
  const MAX_TRANSLATE_Y = -WINDOW_HEIGHT + topScale;
  const MID_POINT = WINDOW_HEIGHT / 2;

  const translateY = useSharedValue(TOP_TRANSLATE_Y);
  const styles = customSheetStyles(colors);

  const [isSheetOpen, setIsSheetOpen] = React.useState<boolean>(false);

  const panGestureHandler = Gesture.Pan()
    .onChange((event) => {
      const newTranslateY = translateY.value + event.translationY;

      if (newTranslateY <= 0 && newTranslateY >= MAX_TRANSLATE_Y) {
        if (newTranslateY < -MID_POINT) {
          translateY.value = withSpring(newTranslateY);
          runOnJS(setIsSheetOpen)(true);
        } else {
          translateY.value = withSpring(newTranslateY);
          runOnJS(setIsSheetOpen)(false);
        }
      }
    })
    .onEnd(() => {
      if (translateY.value > -MID_POINT) {
        translateY.value = withSpring(TOP_TRANSLATE_Y);
        runOnJS(setIsSheetOpen)(false);
      } else {
        translateY.value = withSpring(MAX_TRANSLATE_Y);
        runOnJS(setIsSheetOpen)(true);
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    translateY.value = withSpring(TOP_TRANSLATE_Y);
  }, []);

  return (
    <IPayAnimatedView
      gesture={panGestureHandler}
      isGestureDetector
      testID={`${testID}-animated`}
      style={styles.bottomSheetContainer}
      animationStyles={animatedStyles}
    >
      {gradientHandler && (
        <IPayLinearGradientView
          testID={`${testID}-gradient`}
          gradientColors={[colors.secondary.secondary300, colors.primary.primary500]}
          style={styles.logoContainer}
        >
          <LogoIcon width={scaleSize(28)} height={verticalScale(28)} />
          <IPayView testID={testID} style={styles.childContainer}>
            <IPayScrollView
              contentContainerStyle={[styles.innerStyle, isSheetOpen && styles.innerStyleOpen]}
              testID={testID}
              isGHScrollView
            >
              {children}
            </IPayScrollView>
          </IPayView>
        </IPayLinearGradientView>
      )}
      {simpleHandler && (
        <IPayView testID={testID} style={styles.childContainer}>
          <IPayView style={[styles.arrowIcon, isSheetOpen && styles.rotateIcon]}>
            <IPayIcon icon={icons.arrow_up_double} height={24} width={18} color={colors.primary.primary500} />
          </IPayView>
          <IPayScrollView testID={testID} isGHScrollView>
            {children}
          </IPayScrollView>
        </IPayView>
      )}
      {customHandler && customHandler}
    </IPayAnimatedView>
  );
};

export default IPayCustomSheet;
