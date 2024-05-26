import colors from '@app/styles/colors.const';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TickMarkProps {
  testID?: string;
  color?: string;
  width?: string | number | '12';
  height?: string | number | '12';
}

const TickMark = ({ height, width, color }: TickMarkProps) => {
  return (
    <Svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
      <Path
        d="M0.756567 7.7435L2.83957 9.8265C3.12086 10.1077 3.50232 10.2657 3.90007 10.2657C4.29781 10.2657 4.67928 10.1077 4.96057 9.8265L11.3936 3.3935C11.4846 3.2992 11.535 3.1729 11.5339 3.0418C11.5328 2.9107 11.4802 2.78529 11.3875 2.69259C11.2948 2.59989 11.1694 2.5473 11.0383 2.54616C10.9072 2.54502 10.7809 2.59542 10.6866 2.6865L4.25357 9.1195C4.1598 9.21323 4.03265 9.26589 3.90007 9.26589C3.76748 9.26589 3.64033 9.21323 3.54657 9.1195L1.46357 7.0365C1.36927 6.94542 1.24296 6.89502 1.11187 6.89616C0.980768 6.8973 0.855362 6.94989 0.762658 7.04259C0.669954 7.13529 0.617369 7.2607 0.61623 7.3918C0.615091 7.5229 0.665488 7.6492 0.756567 7.7435Z"
        fill={color || colors.natural.natural0}
      />
    </Svg>
  );
};

export default TickMark;
