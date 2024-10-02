import { RouteProp } from '@react-navigation/core';
import { MusanedUserDetailsData } from '../musaned-user-details/musaned-user-details.interface';

interface MusanedPaySalaryConfirmScreenProps {}

interface MusanedPaySalaryConfirmPaymentInfo {
  fromDate?: string;
  toDate?: string;
  totalSalary?: number;
  basicSalary: number;
  extraAmount?: number;
  bonusAmount?: number;
  note?: string;
  fees: number;
  vat: number;
  deductionAmount?: number;
  deductionReason?: string;
}

type MusanedPayConfirmationRouteProps = RouteProp<
  { params: { userInfo: MusanedUserDetailsData; paymentInfo: MusanedPaySalaryConfirmPaymentInfo } },
  'params'
>;

export { MusanedPayConfirmationRouteProps, MusanedPaySalaryConfirmPaymentInfo, MusanedPaySalaryConfirmScreenProps };
