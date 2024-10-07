import { RouteProp } from '@react-navigation/core';
import { SelectedValue } from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.interface';
import { MusanedUserDetailsData } from '../musaned-user-details/musaned-user-details.interface';

interface MusanedPaySalaryConfirmScreenProps {}

interface MusanedPaySalaryConfirmPaymentInfo {
  fromDate?: Date | string | null;
  toDate?: Date | string | null;
  totalSalary?: number | string;
  basicSalary: number | string;
  extraAmount?: number | string;
  bonusAmount?: number | string;
  note?: string;
  fees: number;
  vat: number;
  deductionAmount?: number | string;
  deductionReason?: string;
  salaryType: SelectedValue;
}

type MusanedPayConfirmationRouteProps = RouteProp<
  { params: { userInfo: MusanedUserDetailsData; paymentInfo: MusanedPaySalaryConfirmPaymentInfo } },
  'params'
>;

export { MusanedPayConfirmationRouteProps, MusanedPaySalaryConfirmPaymentInfo, MusanedPaySalaryConfirmScreenProps };
