interface BillPaymentConfirmationParams {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
}

export interface BillPaymentConfirmationProps {
  route: {
    params: BillPaymentConfirmationParams;
  };
  testID?: string;
}
