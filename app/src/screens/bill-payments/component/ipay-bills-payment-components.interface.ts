import { BillDetailsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';
import { StyleProp, ViewProps } from 'react-native';

interface CommonProps {
  testID?: string;
  style?: StyleProp<ViewProps>;
}

interface IPaySadadBillsHeaderProps extends CommonProps {
  totalSadadBills?: BillDetailsProps[];
  onPressViewAll: () => void;
  unpaidBillsCount?: number;
}

interface IPayBillPaymentNoResultsComponentProps extends CommonProps {
  loadingBills?: boolean;
  onPressViewAll: () => void;
}

interface IPayBillPaymentsFooterProps extends CommonProps {
  trafficUnpaidViolationsCount?: string;
  onPressBillPaymentOption?: (title: string) => void;
}

export { IPayBillPaymentNoResultsComponentProps, IPayBillPaymentsFooterProps, IPaySadadBillsHeaderProps };
