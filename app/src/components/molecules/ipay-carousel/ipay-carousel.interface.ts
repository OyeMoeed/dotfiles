import { StyleProp, ViewStyle } from 'react-native';

export interface RenderItemProps {
  item: object;
  index: number;
}

type CarouselMode = 'default' | 'stack' | 'parallax';

type CarouselModeConfig = {
  /**
   * Scale factor applied to items during parallax scrolling.
   * @default 1
   */
  parallaxScrollingScale?: number;
  /**
   * Offset applied to items during parallax scrolling.
   * @default 0
   */
  parallaxScrollingOffset?: number;
  /**
   * Scale factor applied to adjacent items during parallax scrolling.
   * @default 1
   */
  parallaxAdjacentItemScale?: number;
};

export interface IPayCarouselProps {
  testID?: string;
  data: object[];
  width?: number;
  height?: number;
  mode?: CarouselMode;
  style?: ViewStyle;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayReverse?: boolean;
  scrollAnimationDuration?: number;
  pagination?: boolean;
  renderItem: (props: RenderItemProps) => JSX.Element;
  stylePagination?: StyleProp<IPayCarouselProps>[];
  modeConfig?: CarouselModeConfig;
}
