interface BillPaySuccessParams {
  isSaveOnly?: boolean;
  isPayOnly?: boolean;
  isPayPartially?: boolean;
  billPayDetailes: BillInfoItem[];
  billHeaderDetail: billHeaderDetail;
  totalAmount: string;
}

export interface BillPaySuccessProps {
  route: {
    params: BillPaySuccessParams;
  };
  testID?: string;
}

export interface BillInfoItem {
  id: string;
  label: string;
  value: string;
}

export interface billHeaderDetail {
  title: string;
  companyDetails: string;
  companyImage: any;
}
