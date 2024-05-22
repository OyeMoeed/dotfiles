import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RightIcon(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.429 15a.833.833 0 10-1.667 0 .833.833 0 001.667 0zM10.596 4.167A.833.833 0 009.762 5v6.667a.833.833 0 101.667 0V5a.834.834 0 00-.833-.833z"
        fill="#00BAFE"
      />
      <Path
        d="M10.596 0a10 10 0 1010 10 10.011 10.011 0 00-10-10zm0 18.333A8.333 8.333 0 1118.929 10a8.342 8.342 0 01-8.333 8.333z"
        fill="#00BAFE"
      />
    </Svg>
  )
}

export default RightIcon;
