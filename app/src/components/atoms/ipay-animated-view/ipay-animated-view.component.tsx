import React, { PropsWithChildren } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { IPayAnimatedViewProps } from './ipay-animated-view.interface';

const IPayAnimatedView: React.FC<PropsWithChildren<IPayAnimatedViewProps>> = ({
  style,
  animationStyles,
  children,
  testID,
  gesture,
  isGestureDetector = false,
}) => {
  if (isGestureDetector) {
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View testID={`${testID}-view-animation`} style={[style, animationStyles]}>
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }

  return (
    <Animated.View testID={`${testID}-view-animation`} style={[style, animationStyles]}>
      {children}
    </Animated.View>
  );
};

export default IPayAnimatedView;
