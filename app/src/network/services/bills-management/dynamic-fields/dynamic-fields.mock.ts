
const getDynamicFieldsMockResponse2 = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCa48279ac6ede46b7889fabc71392418c',
    requestReference: '00310369761027365154',
  },
  response: {
    dynamicFields: [
      {
        orderIndex: '1',
        index: 'BeneficiaryId.OfficialId',
        value: '1222103564',
        type: 'NUMBER',
        minWidth: 10,
        maxWidth: 10,
        required: true,
        label: 'Violator ID',
        integrationTagName: 'BeneficiaryId.OfficialId',
        requiredInPaymentOrRefund: 'PAYMENT',
      },
      {
        orderIndex: '2',
        index: 'BeneficiaryId.OfficialIdType',
        value: '1',
        type: 'LIST_OF_VALUE',
        minWidth: 1,
        maxWidth: 32,
        required: true,
        label: 'ID Type',
        lOVType: '315',
        lovList: [
          {
            code: 'BIS',
            desc: 'Business ID',
            addtionalAttribute1: 'رقم المنشأة',
          },
          {
            code: 'IQA',
            desc: 'Iqama ID',
            addtionalAttribute1: 'رقم الإقامة',
          },
          {
            code: 'NAT',
            desc: 'National ID',
            addtionalAttribute1: 'رقم الهوية الوطنية',
          },
          {
            code: 'PAS',
            desc: 'GCC Passport',
            addtionalAttribute1: 'رقم جواز خليجي',
          },
        ],
        integrationTagName: 'BeneficiaryId.OfficialIdType',
        requiredInPaymentOrRefund: 'PAYMENT',
      },
      {
        orderIndex: '3',
        index: 'Beneficiary.OfficialId',
        type: 'NUMBER',
        minWidth: 10,
        maxWidth: 10,
        required: true,
        label: 'Violator ID',
        integrationTagName: 'Beneficiary.OfficialId',
        requiredInPaymentOrRefund: 'REFUND',
      },
      {
        orderIndex: '4',
        index: 'Beneficiary.OfficialIdType',
        type: 'LIST_OF_VALUE',
        minWidth: 1,
        maxWidth: 32,
        required: true,
        label: 'ID Type',
        lOVType: '315',
        lovList: [
          {
            code: 'BIS',
            desc: 'Business ID',
            addtionalAttribute1: 'رقم المنشأة',
          },
          {
            code: 'IQA',
            desc: 'Iqama ID',
            addtionalAttribute1: 'رقم الإقامة',
          },
          {
            code: 'NAT',
            desc: 'National ID',
            addtionalAttribute1: 'رقم الهوية الوطنية',
          },
          {
            code: 'PAS',
            desc: 'GCC Passport',
            addtionalAttribute1: 'رقم جواز خليجي',
          },
        ],
        integrationTagName: 'Beneficiary.OfficialIdType',
        requiredInPaymentOrRefund: 'REFUND',
      },
    ],
    showbillNumbertHint: false,
    billNumberMinimumWidth: 10,
    billNumberLabel: 'Violator ID',
    customerIdType: {
      fieldIndex: 'BeneficiaryId.OfficialIdType',
      value: '1',
    },
    customerIdNumber: {
      fieldIndex: 'BeneficiaryId.OfficialId',
      value: '1222103564',
    },
  },
  successfulResponse: true,
};

export default getDynamicFieldsMockResponse2;
