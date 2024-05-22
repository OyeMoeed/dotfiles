import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Trailing(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.387 14.197l3.819 3.818a2.75 2.75 0 003.889 0L20.888 6.221a.917.917 0 00-1.296-1.296L7.798 16.72a.916.916 0 01-1.296 0L2.683 12.9a.917.917 0 00-1.296 1.296z"
        fill="#00BAFE"
      />
    </Svg>
  )
}

export default Trailing;
