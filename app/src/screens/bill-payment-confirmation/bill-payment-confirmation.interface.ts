interface BillPaymentConfirmationParams {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
  billNickname: string;
  billerName: string;
  billerIcon: string;
  totalAmount: string;
  detailsArray: detailsArrayItem[];
  billerId: string;
  billIdType: string;
  serviceDescription: string;
  billNumOrBillingAcct: string;
  dueDate: string;
  showBalanceBox: boolean;
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
