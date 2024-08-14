import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import gradientStyles from './ipay-gradient-text.styles';

interface GradientTextProps {
  colors: string[];
  [x: string]: any;
}
export const IPayGradientText: React.FC<GradientTextProps> = ({ colors, ...rest }: GradientTextProps) => {
  const styles = gradientStyles();
  return (
    <MaskedView maskElement={<Text style={[styles.text]} {...rest} />}>
      <LinearGradient colors={colors} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
        <Text {...rest} style={[rest.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};
