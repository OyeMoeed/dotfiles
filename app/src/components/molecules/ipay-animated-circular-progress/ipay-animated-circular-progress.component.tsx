// IPayAnimatedCircularProgress.tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';
import { IPayAnimatedCircularProgressProps } from './ipay-animated-circular-progress.interface';
import getDynamicStyles from './ipay-animated-circular-progress.styles';

// Animated component for the path
const AnimatedPath = Animated.createAnimatedComponent(Path);

const IPayAnimatedCircularProgress: React.FC<IPayAnimatedCircularProgressProps> = ({
  size = moderateScale(150),
  width = 9,
  fill = 80,
  arcSweepAngle = 270,
  gradientColors = ['#7DD942', '#7DD942', '#00BAFE'],
  backgroundColor = '#FFFFFF',
  padding = moderateScale(10),
  lineCap = 'round',
  children,
}) => {
  const animatedFill = useSharedValue(0);

  // Calculations for the circular progress
  const radius = size / 2 - width / 2;
  const circumference = (arcSweepAngle / 360) * (2 * Math.PI * radius);
  const strokeDashoffset = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * animatedFill.value) / 100,
  }));

  useEffect(() => {
    animatedFill.value = withTiming(fill, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, [fill]);

  const startAngle = 140;
  const endAngle = 40;

  const startX = radius + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = radius + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = radius + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = radius + radius * Math.sin((endAngle * Math.PI) / 180);

  const largeArcFlag = arcSweepAngle > 180 ? 1 : 0;

  // Get dynamic styles based on size and padding
  const dynamicStyles = getDynamicStyles(size, padding);

  return (
    <View style={dynamicStyles.container}>
      <Svg
        width={size + padding * 2}
        height={size + padding * 2}
        viewBox={`0 0 ${size + padding * 2} ${size + padding * 2}`}
      >
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            {gradientColors.map((color, index) => (
              <Stop
                key={`${color}-${`${index}Stop`}`}
                offset={`${(index / (gradientColors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </LinearGradient>
        </Defs>
        <Path
          d={`M ${startX + padding},${startY + padding} A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX + padding},${endY + padding}`}
          stroke={backgroundColor}
          strokeWidth={width}
          fill="none"
        />
        <AnimatedPath
          d={`M ${startX + padding},${startY + padding} A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX + padding},${endY + padding}`}
          stroke="url(#gradient)"
          strokeWidth={width}
          strokeLinecap={lineCap}
          strokeDasharray={`${circumference}`}
          animatedProps={strokeDashoffset}
          fill="none"
        />
        {children && <View style={dynamicStyles.childrenContainer}>{children}</View>}
      </Svg>
    </View>
  );
};

export default IPayAnimatedCircularProgress;
