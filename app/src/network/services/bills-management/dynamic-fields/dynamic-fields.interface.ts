export interface DynamicField {
  isSearchable?: boolean;
  minAmount: number | null;
  parentIndex: number | null;
  onlyHijri: boolean | null;
  type: string;
  disable?: boolean;
  dependsOn?: string;
  required: boolean;
  lovFilter3: string | null;
  billIdType: string | null;
  childIndex: number | null | string;
  lovFilter2: string | null;
  maxAmount: number | null;
  value: string | null;
  lovFilter1: string | null;
  maxWidth: number;
  allowedValues: string[] | null;
  integrationTagName: string;
  hintEn: string | null;
  index: string;
  minWidth: number;
  label: string;
  hintAr: string | null;
  hijriType: string | null;
  dateCompareOperation: string | null;
  requiredInPaymentOrRefund: string;
  orderIndex: string;
  lovList: Array<{
    code: string;
    addtionalAttribute1?: string;
    desc: string;
  }> | null;
  lOVType: string | null;
}

export interface GetDynamicFieldsResponseTypes {
  response: {
    showbillNumbertHint: boolean;
    billNumberMinimumWidth: number;
    dynamicFields: DynamicField[];
    billNumberLabel: string;
    customerIdType: {
      fieldIndex: string;
      value: string;
    };
    billNumberMaximumWidth: number;
    customerIdNumber: {
      fieldIndex: string;
      value: string;
    };
  };
  successfulResponse: boolean;
  status: {
    sessionReference: string;
    code: string;
    requestReference: string;
    type: string;
    desc: string;
  };
}

export interface GetDynamicFieldsPayloadTypes {
  walletNumber: string;
}
