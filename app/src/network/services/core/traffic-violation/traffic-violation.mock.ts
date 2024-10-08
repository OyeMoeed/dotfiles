const trafficVoilationMock = {
  response: {
    referenceNumber: 'FT40123XFN10',
    totalCount: '1',
    totalAmount: '100',
    trafficViolations: [
      {
        type: 'signal ',
        amount: '200',
        currency: 'SAR',
        currencyDesc: 'Saudi riyal',
        description: 'Traffic violation',
        violation_no: 12556523,
      },
      {
        type: 'signal ',
        amount: '400',
        currency: 'SAR',
        currencyDesc: 'Saudi riyal',
        description: 'Traffic violation',
        violation_no: 12435356523,
      },
      {
        type: 'signal ',
        amount: '500',
        currency: 'SAR',
        currencyDesc: 'Saudi riyal',
        description: 'Traffic violation',
        violation_no: 12435523653,
      },
    ],
    successfulResponse: true,
  },
  paginationInfo: {
    matchedRecords: '1997',
    sentRecords: '6',
  },
  successfulResponse: true,

  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  ok: true,
};
export default trafficVoilationMock;
