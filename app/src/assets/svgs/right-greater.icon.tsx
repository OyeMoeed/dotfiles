import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Right(props,color) {
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
        d="M11.892 6.88l-4.59-4.59a1 1 0 10-1.41 1.42l4.6 4.58a1.001 1.001 0 010 1.42l-4.6 4.58a1 1 0 001.41 1.42l4.59-4.59a3 3 0 000-4.24z"
        fill="#00BAFE"
      />
    </Svg>
  )
}

export default Right;
