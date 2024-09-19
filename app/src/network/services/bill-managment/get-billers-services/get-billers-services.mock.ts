const getBillersServicesMockResponse = {
  response: {
    servicesList: [
      {
        serviceDesc: 'Mobile phone service (POST_PAID)',
        amountHintEn: '',
        amountLov: '',
        mainBillIdHint: '',
        applyTax: 'N',
        mainBillIdLabel: 'Account Number',
        billIdTypes: '0',
        amountHintAr: '',
        serviceId: 'GSM_POST',
        typeOfPayment: 'postpaid',
      },
      {
        serviceDesc: 'Land Line phone service (POST_PAID)',
        amountHintEn: '',
        amountLov: '',
        mainBillIdHint: '',
        applyTax: 'N',
        mainBillIdLabel: 'Account Number',
        billIdTypes: '0',
        amountHintAr: '',
        serviceId: 'LLIN_POST',
        typeOfPayment: 'postpaid',
      },
    ],
  },
  successfulResponse: true,
  status: {
    sessionReference: 'SSPAYCa5a9f8005ecc44e4ac3ffa7cbb9f87eb',
    code: 'I000000',
    requestReference: '01684295505543463084',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
  },
};

export default getBillersServicesMockResponse;
