import { ViewStyle } from 'react-native';

interface IpayCardIssuanceConfirmationDetailsProps {
  testID: string;
}
interface IPayListItem {
  id: string;
  title: string;
  detailText: string;
  style?: ViewStyle;
}
interface IPayListItemProps {
  item: IPayListItem;
}

export { IPayListItemProps, IpayCardIssuanceConfirmationDetailsProps };
