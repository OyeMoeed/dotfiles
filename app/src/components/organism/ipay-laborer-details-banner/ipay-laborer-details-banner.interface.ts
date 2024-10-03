export interface IPayLaborerDetailsBannerProps {
  titleText: string;
  amount?: string | number;
  testID?: string;
  onPress?: () => void;
  shouldTranslateTitle?: boolean;
  withArrow?: boolean;
  details: string;
  isDetailsBanner?: boolean;
}
