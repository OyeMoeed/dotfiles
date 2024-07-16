import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { moderateScale } from 'react-native-size-matters';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import CircularProgressProps from './ipay-circular-progressbar.interface';
import circularProgressbarStyles from './ipay-circular-progressbar.style';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const IPayAnimatedCircularProgress = ({
  size = moderateScale(150),
  width = 9,
  fill = 80,
  arcSweepAngle = 270,
  gradientColors,
  backgroundColor,
  padding = moderateScale(10),
  lineCap = 'round',
  children,
}: CircularProgressProps) => {
  const animatedFill = useSharedValue(0);
  const { colors } = useTheme();
  const sizePadding = size + padding * 2;
  const styles = circularProgressbarStyles(padding, size, sizePadding);
  const gradientColorsConfig = gradientColors || colors.appGradient.progressBarGradient;
  const radius = size / 2 - width / 2;
  const circumference = (arcSweepAngle / 360) * (2 * Math.PI * radius);
  const strokeDashoffset = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * animatedFill.value) / 100,
  }));

  React.useEffect(() => {
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

  return (
    <View style={styles.circularView}>
      <Svg width={sizePadding} height={sizePadding} viewBox={`0 0 ${sizePadding} ${sizePadding}`}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            {gradientColorsConfig.map((color, index) => (
              <Stop
                key={`${index + 1}`}
                offset={`${(index / (gradientColorsConfig.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </LinearGradient>
        </Defs>
        <Path
          d={`
            M ${startX + padding},
            ${startY + padding} A ${radius},
            ${radius} 0 ${largeArcFlag} 1 ${endX + padding}
            ,${endY + padding}`}
          stroke={backgroundColor || colors.natural.natural0}
          strokeWidth={width}
          fill="none"
        />
        <AnimatedPath
          d={`M ${startX + padding},
            ${startY + padding} A ${radius},
            ${radius} 0 ${largeArcFlag} 1 ${endX + padding},
            ${endY + padding}`}
          stroke="url(#gradient)"
          strokeWidth={width}
          strokeLinecap={lineCap}
          strokeDasharray={`${circumference}`}
          animatedProps={strokeDashoffset}
          fill="none"
        />
        {children && <View style={styles.childrenStyle}>{children}</View>}
      </Svg>
    </View>
  );
};

export default IPayAnimatedCircularProgress;
