// types.ts
export interface IPayGradientIconProps {
    icon: string;
    size?: number;
    disableFill?: boolean;
    removeInlineStyle?: boolean;
    gradientColors?: string[];
    gradientStart?: { x: number, y: number };
    gradientEnd?: { x: number, y: number };
    gradientLocations?: number[];
    style?: React.CSSProperties;
  }
  