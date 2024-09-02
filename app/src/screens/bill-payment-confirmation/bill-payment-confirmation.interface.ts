interface BillPaymentConfirmationParams {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
  billNickname: string;
  billerName: string;
  billerIcon: string;
  serviceType: string;
  billNumOrBillingAcct: string;
  dueDate: string;
  totalAmount: string;
}

export interface BillPaymentConfirmationProps {
  route: {
    params: BillPaymentConfirmationParams;
  };
  testID?: string;
}
