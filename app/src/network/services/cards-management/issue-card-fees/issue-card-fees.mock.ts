const issueCardFeesMockResponse = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC208d491ca8d84d5c8d541d8b526a4a13',
    requestReference: '04268131955827439387',
  },
  response: {
    feeAmount: 0.00,
    vatAmount: 0.00,
    bankFeeAmount: 400.00,
    bankVatAmount: 60.00
  },
  successfulResponse: true,
};

export default issueCardFeesMockResponse;