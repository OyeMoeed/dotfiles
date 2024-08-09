/* eslint-disable react/jsx-props-no-spreading */
import { IPayPressable, IPayView } from '@app/components/atoms';
import React, { useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import { FlipCardProps } from './ipay-flip-card.interface';
import flipCardStyles from './ipay-flip-card.style';

const FlipCard: React.FC<FlipCardProps> = ({
  testID,
  style,
  frontViewComponent,
  backViewComponent,
  returnFilpedIndex,
}) => {
  const styles = flipCardStyles();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);
  const perspective = 700;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  const backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsFlipped(false);
        if (returnFilpedIndex) returnFilpedIndex(0);
      });
    } else {
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsFlipped(true);
        if (returnFilpedIndex) returnFilpedIndex(1);
      });
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      const { dx } = gestureState;
      return Math.abs(dx) > 20;
    },
    onPanResponderRelease: (_, gestureState) => {
      const { dx } = gestureState;
      if (dx > 20 || dx < -20) {
        flipCard();
      }
    },
  });

  return (
    <IPayView testID={`${testID}-flip-card`} style={[styles.container, style]} {...panResponder.panHandlers}>
      <IPayPressable onPress={flipCard}>
        <IPayView>
          <Animated.View
            style={[
              styles.flipCard,
              {
                transform: [{ perspective }, { rotateY: frontInterpolate }],
              },
              { opacity: frontOpacity },
            ]}
          >
            {frontViewComponent}
          </Animated.View>
          <Animated.View
            style={[
              styles.flipCard,
              styles.flipCardBack,
              {
                transform: [{ perspective }, { rotateY: backInterpolate }],
              },
              { opacity: backOpacity },
            ]}
          >
            {backViewComponent}
          </Animated.View>
        </IPayView>
      </IPayPressable>
    </IPayView>
  );
};

export default FlipCard;
