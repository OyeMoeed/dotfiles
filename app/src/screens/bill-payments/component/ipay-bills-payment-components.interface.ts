import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { StyleProp, ViewProps } from 'react-native';

interface CommonProps {
  testID?: string;
  style?: StyleProp<ViewProps>;
}

interface IPaySadadBillsHeaderProps extends CommonProps {
  totalSadadBills?: BillDetailsProps[];
  onPressViewAll: () => void;
}

interface IPayBillPaymentNoResultsComponentProps extends CommonProps {
  onPressViewAll: () => void;
}

interface IPayBillPaymentsFooterProps extends CommonProps {}

export { IPayBillPaymentNoResultsComponentProps, IPayBillPaymentsFooterProps, IPaySadadBillsHeaderProps };
