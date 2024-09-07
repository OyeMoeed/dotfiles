import LocalTransferBeneficiariesMockProps from './local-transfer-beneficiaries.interface';

const localTransferBeneficiariesMock: LocalTransferBeneficiariesMockProps = {
  response: {
    beneficiaries: [
      {
        beneficiaryAccountNumber: 'SA1205000068200032472000',
        beneficiaryBankDetail: { bankCode: '99999', bankName: 'الانماء', branchName: '' },
        beneficiaryCode: '10587983-1',
        beneficiaryStatus: 'NEW_BENEFICIARY',
        fullName: 'Test test test',
        isIBAN: true,
        nickname: 'tester PT 12',
      },
    ],
  },
  status: {
    code: 'I000000',
    desc: 'retail.msg.default.success',
    requestReference: '05682545725635183226',
    sessionReference: 'SSPAYCd6a529bdb2994e68b55d8d0e9cbac666',
    type: 'SUCCESS',
  },
  successfulResponse: true,
};

export default localTransferBeneficiariesMock;
