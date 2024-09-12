import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface GradientTextProps {
  colors: string[];
  [x: string]: any;
}

const opacity0 = { opacity: 0 };

const IPayGradientText: React.FC<GradientTextProps> = ({ colors, ...rest }: GradientTextProps) => (
  <MaskedView maskElement={<Text {...rest} />}>
    <LinearGradient colors={colors} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
      <Text {...rest} style={[rest.style, opacity0]} />
    </LinearGradient>
  </MaskedView>
);

export default IPayGradientText;
