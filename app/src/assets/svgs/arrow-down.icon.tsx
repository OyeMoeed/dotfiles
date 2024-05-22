import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowDownSVG(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.94 6.712l-4.89 4.89a1.49 1.49 0 01-2.1 0l-4.89-4.89"
        stroke="#00BAFE"
        strokeWidth={1.125}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ArrowDownSVG;
