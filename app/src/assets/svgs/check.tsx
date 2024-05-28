import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Check(props) {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        opacity={0.4}
        d="M43.174 5.333H20.827c-9.706 0-15.493 5.787-15.493 15.494v22.32c0 9.733 5.787 15.52 15.493 15.52h22.32c9.707 0 15.494-5.787 15.494-15.494V20.827c.026-9.707-5.76-15.494-15.467-15.494z"
        fill="#00BAFE"
      />
      <Path
        d="M28.212 41.547c-.534 0-1.04-.214-1.413-.587l-7.547-7.547a2.012 2.012 0 010-2.826 2.012 2.012 0 012.826 0l6.134 6.133 13.707-13.707a2.012 2.012 0 012.826 0 2.012 2.012 0 010 2.827l-15.12 15.12c-.373.373-.88.587-1.413.587z"
        fill="#00BAFE"
      />
    </Svg>
  );
}

export default Check;
