import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';

interface BillPaymentData {
  id?: string;
  lable?: string;
  value?: string | null | number;
}

interface HeaderAttributes {
  billNickname: string;
  billerName: string;
  billerIcon: string;
}

interface BillPaySuccessParams {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
  totalAmount: string;
  billPaymentInfos: BillPaymentInfosTypes[];
  billPaymentData: BillPaymentData[];
  headerAttributes: HeaderAttributes;
}

interface BillPaySuccessProps {
  route: {
    params: BillPaySuccessParams;
  };
  testID?: string;
}

interface BillInfoItem {
  id: string;
  label: string;
  value: string;
}

interface BillHeaderDetail {
  title: string;
  companyDetails: string;
  companyImage: any;
}

export { BillHeaderDetail, BillInfoItem, BillPaymentData, BillPaySuccessParams, BillPaySuccessProps, HeaderAttributes };
