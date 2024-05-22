import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function LeftIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={24} height={24} rx={12} fill="#5DBE24" />
      <Path
        d="M6.757 13.743l2.083 2.083a1.5 1.5 0 002.12 0l6.434-6.433a.5.5 0 00-.707-.707l-6.433 6.434a.5.5 0 01-.707 0l-2.083-2.083a.5.5 0 00-.707.706z"
        fill="#fff"
      />
    </Svg>
  )
}

export default LeftIcon;
