export interface Params {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
}

export interface BillPaymentConfirmationProps {
  route: {
    params: Params;
  };
  testID?: string;
}
