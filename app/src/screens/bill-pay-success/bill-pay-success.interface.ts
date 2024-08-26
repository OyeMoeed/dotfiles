interface BillPaySuccessParams {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
}

export interface BillPaySuccessProps {
  route: {
    params: BillPaySuccessParams;
  };
  testID?: string;
}
