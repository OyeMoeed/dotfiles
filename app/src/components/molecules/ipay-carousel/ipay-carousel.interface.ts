import { StyleProp, ViewStyle } from 'react-native';

export interface RenderItemProps {
  item: object;
  index: number;
}

type CarouselMode = 'default' | 'stack' | 'parallax';

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
  stylePagination?:StyleProp<IPayCarouselProps>[]
}
