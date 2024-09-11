import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';

interface BillPaySuccessParams {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
  totalAmount: string;
  billPaymentInfos: BillPaymentInfosTypes[];
}

export interface BillPaySuccessProps {
  route: {
    params: BillPaySuccessParams;
  };
  testID?: string;
}

export interface BillInfoItem {
  id: string;
  label: string;
  value: string;
}

export interface billHeaderDetail {
  title: string;
  companyDetails: string;
  companyImage: any;
}
