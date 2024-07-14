import { ViewStyle } from 'react-native';

interface IPayAtmWithdrawalTurtorialsProps {
  testID?: string;
  style?: ViewStyle;
}

interface itemProps {
  id?: string;
  title?: string;
  url: string;
}

interface tutorialItemProps {
  item: itemProps;
}

export { IPayAtmWithdrawalTurtorialsProps, tutorialItemProps };
