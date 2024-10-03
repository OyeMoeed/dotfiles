import { StyleProp, ViewStyle } from 'react-native';

interface IPayLaborerDetailsBannerProps {
  titleText: string;
  amount?: string | number;
  testID?: string;
  onPress?: () => void;
  shouldTranslateTitle?: boolean;
  withArrow?: boolean;
  details: string;
  isDetailsBanner?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  withProfileIcon?: boolean;
  onlyAmount?: boolean;
  withLogoOnRight?: boolean;
  boldTitle?: boolean;
}

export default IPayLaborerDetailsBannerProps;
