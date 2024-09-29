import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';

const getDynamicFieldsMockResponse = {
  response: {
    billNumberLabel: 'Violator ID',
    billNumberMinimumWidth: 10,
    customerIdNumber: { fieldIndex: 'BeneficiaryId.OfficialId', value: '1092103737' },
    customerIdType: { fieldIndex: 'BeneficiaryId.OfficialIdType', value: '1' },
    dynamicFields: [
      {
        index: 'BeneficiaryId.OfficialId',
        integrationTagName: 'BeneficiaryId.OfficialId',
        label: 'Violator ID',
        maxWidth: 10,
        minWidth: 10,
        orderIndex: '1',
        required: true,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: 'NUMBER',
        value: '',
      },
      {
        index: 'BeneficiaryId.OfficialIdType',
        integrationTagName: 'BeneficiaryId.OfficialIdType',
        lOVType: '315',
        label: 'ID Type',
        lovList: [
          { addtionalAttribute1: 'رقم المنشأة', code: 'BIS', desc: 'Business ID' },
          { addtionalAttribute1: 'رقم الإقامة', code: 'IQA', desc: 'Iqama ID' },
          { addtionalAttribute1: 'رقم الهوية الوطنية', code: 'NAT', desc: 'National ID' },
          { addtionalAttribute1: 'رقم جواز خليجي', code: 'PAS', desc: 'GCC Passport' },
        ],
        maxWidth: 32,
        minWidth: 1,
        orderIndex: '2',
        required: true,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: 'LIST_OF_VALUE',
        value: '',
      },
      {
        index: 'BeneficiaryId.OfficialNumber',
        integrationTagName: 'BeneficiaryId.OfficialNumber',
        label: 'Violation Number',
        maxWidth: 10,
        minWidth: 10,
        orderIndex: '1',
        required: true,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: 'NUMBER',
        value: '',
      },
      {
        index: 'BeneficiaryId.OfficialId',
        integrationTagName: 'BeneficiaryId.OfficialId',
        label: 'Violator ID',
        maxWidth: 10,
        minWidth: 10,
        orderIndex: '1',
        required: true,
        requiredInPaymentOrRefund: 'REFUND',
        type: 'NUMBER',
        value: '',
      },
      {
        index: 'BeneficiaryId.OfficialIdType',
        integrationTagName: 'BeneficiaryId.OfficialIdType',
        lOVType: '315',
        label: 'ID Type',
        lovList: [
          { addtionalAttribute1: 'رقم المنشأة', code: 'BIS', desc: 'Business ID' },
          { addtionalAttribute1: 'رقم الإقامة', code: 'IQA', desc: 'Iqama ID' },
          { addtionalAttribute1: 'رقم الهوية الوطنية', code: 'NAT', desc: 'National ID' },
          { addtionalAttribute1: 'رقم جواز خليجي', code: 'PAS', desc: 'GCC Passport' },
        ],
        maxWidth: 32,
        minWidth: 1,
        orderIndex: '2',
        required: true,
        requiredInPaymentOrRefund: 'REFUND',
        type: 'LIST_OF_VALUE',
        value: '',
      },
      {
        index: 'BeneficiaryId.OfficialNumber',
        integrationTagName: 'BeneficiaryId.OfficialNumber',
        label: 'Violation Number',
        maxWidth: 10,
        minWidth: 10,
        orderIndex: '1',
        required: true,
        requiredInPaymentOrRefund: 'REFUND',
        type: 'NUMBER',
        value: '',
      },
    ],
    showbillNumbertHint: false,
  },
  successfulResponse: true,
  status: {
    sessionReference: 'SSPAYC0f6c1165e9fb4c70b39530f8137b509f',
    code: 'I000000',
    requestReference: '02461994742498236274',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
  },
};

const getDynamicFieldsMockResponseByID = {
  response: {
    billNumberLabel: 'Violator ID',
    billNumberMinimumWidth: 10,
    customerIdNumber: { fieldIndex: 'BeneficiaryId.OfficialId', value: '1092103737' },
    customerIdType: { fieldIndex: 'BeneficiaryId.OfficialIdType', value: '1' },
    dynamicFields: [
      {
        index: 'BeneficiaryId.OfficialId',
        integrationTagName: 'BeneficiaryId.OfficialId',
        label: 'Violator ID',
        maxWidth: 10,
        minWidth: 10,
        orderIndex: '1',
        required: true,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: 'NUMBER',
        value: '1092103737',
      },
      {
        index: 'BeneficiaryId.OfficialIdType',
        integrationTagName: 'BeneficiaryId.OfficialIdType',
        lOVType: '315',
        label: 'ID Type',
        lovList: [
          { addtionalAttribute1: 'رقم المنشأة', code: 'BIS', desc: 'Business ID' },
          { addtionalAttribute1: 'رقم الإقامة', code: 'IQA', desc: 'Iqama ID' },
          { addtionalAttribute1: 'رقم الهوية الوطنية', code: 'NAT', desc: 'National ID' },
          { addtionalAttribute1: 'رقم جواز خليجي', code: 'PAS', desc: 'GCC Passport' },
        ],
        maxWidth: 32,
        minWidth: 1,
        orderIndex: '2',
        required: true,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: 'LIST_OF_VALUE',
        value: '1',
      },
      {
        index: 'BeneficiaryId.OfficialId',
        integrationTagName: 'BeneficiaryId.OfficialId',
        label: 'Violator ID',
        maxWidth: 10,
        minWidth: 10,
        orderIndex: '1',
        required: true,
        requiredInPaymentOrRefund: 'REFUND',
        type: 'NUMBER',
        value: '1092103737',
      },
      {
        index: 'BeneficiaryId.OfficialIdType',
        integrationTagName: 'BeneficiaryId.OfficialIdType',
        lOVType: '315',
        label: 'ID Type',
        lovList: [
          { addtionalAttribute1: 'رقم المنشأة', code: 'BIS', desc: 'Business ID' },
          { addtionalAttribute1: 'رقم الإقامة', code: 'IQA', desc: 'Iqama ID' },
          { addtionalAttribute1: 'رقم الهوية الوطنية', code: 'NAT', desc: 'National ID' },
          { addtionalAttribute1: 'رقم جواز خليجي', code: 'PAS', desc: 'GCC Passport' },
        ],
        maxWidth: 32,
        minWidth: 1,
        orderIndex: '2',
        required: true,
        requiredInPaymentOrRefund: 'REFUND',
        type: 'LIST_OF_VALUE',
        value: '1',
      },
      {
        index: 'TermsAndConditions',
        integrationTagName: 'TermsAndConditions',
        label: 'Accept Terms and Conditions',
        maxWidth: 10,
        minWidth: 1,
        orderIndex: '1',
        required: false,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: DYNAMIC_FIELDS_TYPES.BOOLEAN_TYPE,
        value: false,
      },
    ],
    showbillNumbertHint: false,
  },
  successfulResponse: true,
  status: {
    sessionReference: 'SSPAYC0f6c1165e9fb4c70b39530f8137b509f',
    code: 'I000000',
    requestReference: '02461994742498236274',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
  },
};

export { getDynamicFieldsMockResponse, getDynamicFieldsMockResponseByID };
