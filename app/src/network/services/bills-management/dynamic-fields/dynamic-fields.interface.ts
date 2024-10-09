import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import React from 'react';
import { KeyboardTypeOptions } from 'react-native';

export interface DynamicField {
  parentIndex?: string | null;
  isSearchable?: boolean;
  minAmount: number | null;
  onlyHijri: boolean | null;
  type: string;
  disable?: boolean;
  dependsOn?: string;
  required?: boolean;
  lovFilter3?: string | null;
  billIdType?: string | null;
  childIndex?: string | null;
  lovFilter2?: string | null;
  maxAmount?: number | null;
  value?: string | null;
  lovFilter1?: string | null;
  maxWidth?: number;
  allowedValues?: Array<ListItem> | null;
  integrationTagName?: string;
  hintEn?: string | null;
  index: string;
  minWidth?: number;
  label: string;
  hintAr?: string | null;
  hijriType?: string | null;
  dateCompareOperation?: string | null;
  requiredInPaymentOrRefund?: string;
  orderIndex?: string;
  lovList?: Array<ListItem> | null;
  lOVType?: string | null;
  rightIcon?: React.JSX.Element;
  isCountry?: boolean;
  isCurrency?: boolean;
  returnFullValue?: boolean;
  defaultValue?: string;
  dependent_key?: string;
  dependent_value?: string;
  originalIndex?: string;
  originalParentIndex?: string | null;
  originalChildIndex?: string | null;
  minimumDate?: Date | null;
  maximumDate?: Date | null;
  keyboardType?: KeyboardTypeOptions;
  regex?: RegExp | null;
  showOptional?: boolean;
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

export interface FormValuesType {
  [key: string]: string | ListItem;
}
