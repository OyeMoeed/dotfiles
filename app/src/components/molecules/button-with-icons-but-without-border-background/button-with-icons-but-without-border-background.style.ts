export interface RNButtonWithIconsButWithoutBorderAndBackgroundProps {
  disabled?: boolean;
  testID?: string;
  onPress: () => void;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  width?: number | string;
  arrowIconColor?: string;
}
