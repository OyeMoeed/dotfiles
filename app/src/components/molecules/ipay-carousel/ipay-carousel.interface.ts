import { StyleProp, ViewStyle } from 'react-native';
import { CarouselRenderItem } from 'react-native-reanimated-carousel';

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

export interface IPayCarouselProps<T> {
  testID?: string;
  data: T[];
  width?: number;
  height?: number;
  mode?: CarouselMode;
  style?: StyleProp<ViewStyle>;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayReverse?: boolean;
  scrollAnimationDuration?: number;
  pagination?: boolean;
  renderItem: CarouselRenderItem<T>;
  stylePagination?: StyleProp<ViewStyle>;
  modeConfig?: CarouselModeConfig;
  onChangeIndex?: (index: number) => void;
  carouselContainerStyle?: StyleProp<ViewStyle>;
  /**
   * reset indexes states and paginator to 0 when data
   * changes incase of multiple list of source data
   */
  resetOnDataChange?: boolean;
}
