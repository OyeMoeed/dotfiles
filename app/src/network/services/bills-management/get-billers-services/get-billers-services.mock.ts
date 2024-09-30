const getBillersServicesMockResponse = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCc79d2f01e8284eeeab9ddd53797cc29d',
    requestReference: '04833080371998467938',
  },
  response: {
    servicesList: [
      {
        serviceId: '041',
        serviceDesc: 'Query Traffic Violations by Violation Number',
        typeOfPayment: 'postpaid',
        mainBillIdLabel: 'Violator ID',
        mainBillIdHint: null,
        billIdTypes: null,
        applyTax: 'N',
        amountLov: null,
        amountHintAr: null,
        amountHintEn: null,
      },
      {
        serviceId: '040',
        serviceDesc: 'Query Traffic Violations by the violator ID',
        typeOfPayment: 'postpaid',
        mainBillIdLabel: 'Violator ID',
        mainBillIdHint: null,
        billIdTypes: null,
        applyTax: 'N',
        amountLov: null,
        amountHintAr: null,
        amountHintEn: null,
      },
      {
        serviceId: '091',
        serviceDesc: 'List Violations by providing',
        typeOfPayment: 'prepaid',
        mainBillIdLabel: 'Violator ID',
        mainBillIdHint: 'Violator ID',
        billIdTypes: null,
        applyTax: 'N',
        amountLov: null,
        amountHintAr: null,
        amountHintEn: null,
      },
    ],
  },
  successfulResponse: true,
};

export default getBillersServicesMockResponse;
