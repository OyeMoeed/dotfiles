import LocalTransferBeneficiariesMockProps from './local-transfer-beneficiaries.interface';

const localTransferBeneficiariesMock: LocalTransferBeneficiariesMockProps = {
  response: {
    beneficiaries: [
      {
        beneficiaryAccountNumber: 'SA5805012000000110144464',
        beneficiaryBankDetail: { bankCode: '999999', bankName: 'Alinma Bank', branchName: '' },
        beneficiaryCode: '10587981-33',
        beneficiaryStatus: 'NEW_BENEFICIARY',
        fullName: '12323',
        isIBAN: true,
        nickname: 'Test',
      },
      {
        beneficiaryAccountNumber: 'SA0330000000021201519868',
        beneficiaryBankDetail: { bankCode: '19', bankName: 'Arab National Bank', branchName: '' },
        beneficiaryCode: '10587981-32',
        beneficiaryStatus: 'ACTIVATE',
        fullName: 'Pre Prod Test',
        isIBAN: true,
        nickname: 'Test',
      },
      {
        beneficiaryAccountNumber: 'SA0505000068201231629000',
        beneficiaryBankDetail: { bankCode: '999999', bankName: 'Alinma Bank', branchName: '' },
        beneficiaryCode: '10587981-31',
        beneficiaryStatus: 'ACTIVATE',
        fullName: 'Alinma Bank Bene',
        isIBAN: true,
        nickname: 'Alinma',
      },
      {
        beneficiaryAccountNumber: 'SA8405012000000110295413',
        beneficiaryBankDetail: { bankCode: '20', bankName: 'Alinma Bank', branchName: '' },
        beneficiaryCode: '10587981-29',
        beneficiaryStatus: 'NEW_BENEFICIARY',
        fullName: 'ramesh preprod PK',
        isIBAN: true,
        nickname: 'ramesh preprod',
      },
      {
        beneficiaryAccountNumber: 'SA2880000000002345567889',
        beneficiaryBankDetail: { bankCode: '20', bankName: 'Alrajhi Bank', branchName: '' },
        beneficiaryCode: '10587981-3',
        beneficiaryStatus: 'ACTIVATE',
        fullName: 'arwa Ahmad ali alali',
        isIBAN: true,
        nickname: 'Arwa',
      },
      {
        beneficiaryAccountNumber: 'SA6180000296608013414076',
        beneficiaryBankDetail: { bankCode: '20', bankName: 'Alrajhi Bank', branchName: '' },
        beneficiaryCode: '10587981-2',
        beneficiaryStatus: 'NEW_BENEFICIARY',
        fullName: 'arwa ahmad',
        isIBAN: true,
      },
      {
        beneficiaryAccountNumber: 'SA4005000068200020938002',
        beneficiaryBankDetail: { bankCode: '99999', bankName: 'الانماء', branchName: '' },
        beneficiaryCode: '10587981-1',
        beneficiaryStatus: 'ACTIVATE',
        fullName: 'arwa Hamdan',
        isIBAN: true,
        nickname: 'newnickname',
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
