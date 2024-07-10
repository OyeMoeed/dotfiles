import { StyleProp, ViewStyle } from 'react-native';

interface IpayCardIssuanceConfirmationDetailsProps {
  testID: string;
}
interface IPayListItem {
  id: string;
  title: string;
  detailText: string;
  style?: StyleProp<ViewStyle>;
}
interface IPayListItemProps {
  item: IPayListItem;
}

export { IPayListItemProps, IpayCardIssuanceConfirmationDetailsProps };
