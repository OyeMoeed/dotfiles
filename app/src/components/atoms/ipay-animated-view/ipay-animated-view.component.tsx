import React, { PropsWithChildren } from 'react';
import Animated from 'react-native-reanimated';
import { IPayAnimatedViewProps } from './ipay-animated-view.interface';

const IPayAnimatedView: React.FC<PropsWithChildren<IPayAnimatedViewProps>> = ({
  style,
  animationStyles,
  children,
  testID,
}) => {


  return (
    <Animated.View testID={`${testID}-view-animation`} style={[style, animationStyles]}>
      {children}
    </Animated.View>
  );
};

export default IPayAnimatedView;
