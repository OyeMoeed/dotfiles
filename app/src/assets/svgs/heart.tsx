import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

interface HeartProps {
    color?: string
  }
function HeartIcon({color}:HeartProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_10004_48250)">
        <Path
          d="M17.5 1.917a6.4 6.4 0 00-5.5 3.3 6.4 6.4 0 00-5.5-3.3A6.8 6.8 0 000 8.966c0 4.546 4.787 9.513 8.8 12.88a4.974 4.974 0 006.4 0c4.015-3.367 8.8-8.334 8.8-12.88a6.8 6.8 0 00-6.5-7.05zm-3.584 18.4a2.973 2.973 0 01-3.83 0C4.948 16.006 2 11.87 2 8.967a4.8 4.8 0 014.5-5.05 4.8 4.8 0 014.5 5.05 1 1 0 002 0 4.8 4.8 0 014.5-5.05 4.8 4.8 0 014.5 5.05c0 2.902-2.947 7.039-8.085 11.345v.005z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_10004_48250">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default HeartIcon;
