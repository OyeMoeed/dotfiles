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
        serviceId: '060',
        serviceDesc: 'List Violations by providing the Issuing entity and category ID',
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
