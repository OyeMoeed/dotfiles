import { MusanedStatus } from '@app/utilities';
import { RouteProp } from '@react-navigation/core';

interface MusanedUserDetailsData {
  borderNumber: number;
  name: string;
  poiNumber: number;
  poiExperationDate: string;
  nationalityAr: string;
  nationalityEn: string;
  nationality: string;
  contractNumber: number;
  payrollAmount: number;
  lastPaidSalaryDate: string;
  salarySource: string;
  occupationAr: string;
  occupationEn: string;
  occupation: string;
  haveWalletFlag: boolean;
  countryCode: string;
  paymentStatus?: MusanedStatus;
}

type MusanedUserDetailsRouteProps = RouteProp<{ params: { userInfo: MusanedUserDetailsData } }, 'params'>;

export { MusanedUserDetailsData, MusanedUserDetailsRouteProps };
