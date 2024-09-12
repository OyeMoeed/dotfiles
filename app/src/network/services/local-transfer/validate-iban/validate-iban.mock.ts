import { ValidateIBANResponse } from './validate-iban.interface';

const ibanValidityMock: ValidateIBANResponse = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCe205da87fb5b4376a2cc97ee698c1de7',
    requestReference: '03932400265611145238',
  },
  response: { bankCode: '999999' },
  successfulResponse: true,
};

export default ibanValidityMock;
