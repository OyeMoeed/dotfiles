export interface IPayGradientTextProps {
  testID?: string;
  text: string;
  style?: any;
  gradientColors: string[];
  fontSize?: number;
  fontFamily?: string;
  lineHeight?: number;
  yScale?: number;
  xScale?: string;
  textAnchor?: 'middle' | 'end' | 'start';
  shouldTranslate?: boolean;
}
