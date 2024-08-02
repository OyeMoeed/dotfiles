interface Params {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
}

export interface BillPaySuccessProps {
  route: {
    params: Params;
  };
  testID?: string;
}
