import React, { useCallback, useEffect, useRef } from 'react';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import icons from '@app/assets/icons';
import { LogoIcon } from '@app/assets/svgs';
import {
  IPayAnimatedView,
  IPayIcon,
  IPayLinearGradientView,
  IPayPressable,
  IPayScrollView,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { isIosOS } from '@app/utilities/constants';
import { getCustomSheetThreshold } from '@app/utilities';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { verticalScale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/core';
import { IPayCustomSheetProps } from './ipay-custom-sheet.interface';
import customSheetStyles from './ipay-custom-sheet.style';

/**
 * calculated top header value for ios and android devices
 */
const TOP_SCALE = verticalScale(isIosOS ? 100 : 60);
const ANIMATION_CONFIG = {
  duration: 150,
};

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
  closeTrigger = false,
}) => {
  const { colors } = useTheme();
  const THRESHOLD = getCustomSheetThreshold();
  const TOP_TRANSLATE_Y = -WINDOW_HEIGHT + (boxHeight + THRESHOLD);
  const MAX_TRANSLATE_Y = -WINDOW_HEIGHT + topScale;
  const scrollRef = useRef<ScrollView>(null);

  const translateY = useSharedValue(TOP_TRANSLATE_Y);
  const styles = customSheetStyles(colors);

  const [isSheetOpen, setIsSheetOpen] = React.useState<boolean>(false);

  const closeSheet = useCallback(() => {
    translateY.value = withTiming(TOP_TRANSLATE_Y, ANIMATION_CONFIG);
    setIsSheetOpen(false);
    scrollRef?.current?.scrollTo({ y: 0 });
  }, [TOP_TRANSLATE_Y, translateY]);

  const openSheet = useCallback(() => {
    translateY.value = withTiming(MAX_TRANSLATE_Y, ANIMATION_CONFIG);
    setIsSheetOpen(true);
  }, [MAX_TRANSLATE_Y, translateY]);

  useEffect(() => {
    closeSheet();
  }, [closeTrigger]);

  useFocusEffect(
    useCallback(() => {
      closeSheet();
    }, [closeSheet]),
  );

  const panGestureHandler = Gesture.Pan()
    .onUpdate((event) => {
      const newTranslateY = translateY.value + event.translationY;

      // THIS CONDITION IS TO KEEP THE SHEET POSITION BETWEEN TWO BORDERS
      if (newTranslateY <= 0 && newTranslateY >= MAX_TRANSLATE_Y && newTranslateY <= TOP_TRANSLATE_Y) {
        translateY.value = withSpring(newTranslateY);
      }
    })
    .onEnd(() => {
      if (isSheetOpen && translateY.value > MAX_TRANSLATE_Y + 10) {
        runOnJS(closeSheet)();
      } else if (!isSheetOpen && translateY.value < TOP_TRANSLATE_Y - 10) {
        runOnJS(openSheet)();
      } else if (isSheetOpen) {
        // THIS CONDITION IS TO KEEP SHEET SAME POSITION IF THE USER DID NOT MOVE IT 25 pixel
        runOnJS(openSheet)();
      } else {
        // THIS CONDITION IS TO KEEP SHEET SAME POSITION IF THE USER DID NOT MOVE IT 25 pixel
        runOnJS(closeSheet)();
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const toggleSheet = useCallback(() => {
    if (translateY.value === MAX_TRANSLATE_Y) {
      closeSheet();
    } else {
      openSheet();
    }
  }, [MAX_TRANSLATE_Y, closeSheet, openSheet, translateY.value]);

  useEffect(() => {
    translateY.value = withTiming(TOP_TRANSLATE_Y, ANIMATION_CONFIG);
  }, [TOP_TRANSLATE_Y, translateY]);

  return (
    <>
      <TouchableWithoutFeedback onPress={closeSheet} disabled={!isSheetOpen}>
        <View style={isSheetOpen && styles.touchableWithoutFeedbackViewStyle} />
      </TouchableWithoutFeedback>
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
            <LogoIcon width={scaleSize(28)} height={verticalScale(28)} onPress={toggleSheet} />
            <IPayView testID={testID} style={styles.childContainer}>
              <IPayScrollView
                contentContainerStyle={[styles.innerStyle, isSheetOpen && styles.innerStyleOpen]}
                testID={testID}
                isGHScrollView
                pinchGestureEnabled
                scrollEnabled={isSheetOpen}
                ref={scrollRef}
              >
                {children}
              </IPayScrollView>
            </IPayView>
          </IPayLinearGradientView>
        )}
        {simpleHandler && (
          <IPayView testID={testID} style={styles.childContainer}>
            <IPayPressable onPress={toggleSheet}>
              <IPayView style={[styles.arrowIcon, isSheetOpen && styles.rotateIcon]}>
                <IPayIcon icon={icons.arrow_up_double} height={24} width={18} color={colors.primary.primary500} />
              </IPayView>
            </IPayPressable>
            <IPayScrollView testID={testID} isGHScrollView scrollEnabled={isSheetOpen}>
              {children}
            </IPayScrollView>
          </IPayView>
        )}
        {customHandler && customHandler}
      </IPayAnimatedView>
    </>
  );
};

export default IPayCustomSheet;
