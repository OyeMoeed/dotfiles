import React from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface GradientTextProps {
  colors: string[];
  [x: string]: any;
}
const IPayGradientCircleProgressbar: React.FC<GradientTextProps> = ({ colors, ...rest }: GradientTextProps) => {
  return (
    <MaskedView maskElement={<View {...rest} />}>
      <LinearGradient colors={colors} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
        <View {...rest} style={[rest.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default IPayGradientCircleProgressbar;
