interface Params {
  isSaveOnly?: boolean;
}

export interface BillPaySuccessProps {
  route: {
    params: Params;
  };
  testID?: string;
}
