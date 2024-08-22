interface Params {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
}

export interface BillPaySuccessProps {
  route: {
    params: Params;
  };
  testID?: string;
}
