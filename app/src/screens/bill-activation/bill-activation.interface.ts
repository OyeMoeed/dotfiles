import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';

interface BillPaymentData {
  id?: string;
  lable?: string;
  value?: string | null | number;
}

interface HeaderAttributes {
  title: string;
  companyDetails: string;
  companyImage: string;
}

interface BillActivateSuccessParams {
  billPaymentInfos: BillPaymentInfosTypes;
  billPaymentData: BillPaymentData[];
  headerAttributes: HeaderAttributes;
}

interface BillActivateSuccessProps {
  route: {
    params: BillActivateSuccessParams;
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

export {
  BillActivateSuccessParams,
  BillActivateSuccessProps,
  BillHeaderDetail,
  BillInfoItem,
  BillPaymentData,
  HeaderAttributes,
};
