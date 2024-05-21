import colors from '@app/styles/colors.styles';
import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

interface ArrowRightProps {
  testID?: string;
  width?: number;
  height?: number;
  color?: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({
  testID,
  width = 21,
  height = 20,
  color = colors.natural.natural0
}) => {
  return (
    <Svg testID={testID} width={width} height={height} viewBox="0 0 21 20" fill="none">
      <G id="vuesax/twotone/arrow-right">
        <G id="arrow-right">
          <Path
            id="Vector"
            d="M12.5249 4.94168L17.5832 10L12.5249 15.0583"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Vector_2"
            opacity="0.4"
            d="M3.4165 10H17.4415"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </G>
    </Svg>
  );
};

export default ArrowRight;
