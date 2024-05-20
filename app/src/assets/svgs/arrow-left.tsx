import colors from '@app/styles/colors';
import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

interface ArrowLeftProps {
  testID?: string;
  width?: number;
  height?: number;
  color?: string;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ testID, width = 21, height = 20, color = colors.natural.natural0 }) => {
  return (
    <View style={{ width, height }}>
      <Svg testID={testID} width={width} height={height} viewBox="0 0 21 20" fill="none">
        <G id="vuesax/twotone/arrow-left">
          <G id="arrow-left">
            <Path
              id="Vector"
              d="M8.47484 4.94168L3.4165 10L8.47484 15.0583"
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              id="Vector_2"
              opacity={0.4}
              d="M17.5831 10H3.55811"
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default ArrowLeft;
