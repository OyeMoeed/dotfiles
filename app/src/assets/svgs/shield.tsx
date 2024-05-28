import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

interface ShieldProps {
  color?: string;
}

function Shield({ color }: ShieldProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_9375_33374)">
        <Path
          d="M8 10a.667.667 0 01-.667-.667V4a.667.667 0 011.334 0v5.333A.667.667 0 018 10zm.529 5.84c1.44-.579 6.138-2.854 6.138-7.811V4.58a3.328 3.328 0 00-2.284-3.164L8.21.034a.657.657 0 00-.42 0L3.617 1.417a3.329 3.329 0 00-2.284 3.164V8.03c0 4.374 4.67 7.05 6.103 7.766.18.087.37.155.564.205.18-.037.358-.09.529-.16zm3.434-13.157a2 2 0 011.37 1.898V8.03c0 4.122-4.058 6.074-5.302 6.574-1.258-.63-5.364-2.964-5.364-6.574V4.58a2 2 0 011.37-1.898L8 1.369l3.963 1.314zM8 11.333a.666.666 0 100 1.333.666.666 0 000-1.333z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_9375_33374">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Shield;
