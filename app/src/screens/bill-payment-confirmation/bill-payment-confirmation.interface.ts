import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';

interface BillPaymentConfirmationParams {
  isPayOnly?: boolean;
  isPayPartially?: boolean;
  showBalanceBox: boolean;
  billPaymentInfos: BillPaymentInfosTypes[];
  saveBill?: boolean;
}

export interface detailsArrayItem {
  id: string;
  label: string;
  value: string;
}

export interface BillHeaderDetailTypes {
  title: string;
  companyDetails: string;
  companyImage: any;
}

export interface BillPaymentConfirmationProps {
  route: {
    params: BillPaymentConfirmationParams;
  };
  testID?: string;
}
