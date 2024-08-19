import LocalTransferBeneficiariesMockProps from './local-transfer-beneficiaries.interface';

const localTransferBeneficiariesMock: LocalTransferBeneficiariesMockProps = {
  data: {
    beneficiaries: [
      {
        beneficiaryCode: '10587981-3',
        beneficiaryStatus: 'active',
        nickname: 'test',
        fullName: 'arwa Ahmad ali alali',
        beneficiaryAccountNumber: 'SA2880000000002345567889',
        isIBAN: true,
        beneficiaryBankDetail: {
          bankCode: '20',
          bankName: 'Alrajhi Bank',
          branchName: '',
          address: null,
          correspondingBankCode: null,
          city: null,
        },
      },
      {
        beneficiaryCode: '10587981-2',
        beneficiaryStatus: 'newBeneficiary',
        fullName: 'arwa ahmad',
        beneficiaryAccountNumber: 'SA6180000296608013414076',
        isIBAN: true,
        beneficiaryBankDetail: {
          bankCode: '20',
          bankName: 'Alrajhi Bank',
          branchName: '',
          address: null,
          correspondingBankCode: null,
          city: null,
        },
      },
      {
        beneficiaryCode: '10587981-1',
        beneficiaryStatus: 'active',
        nickname: 'newnickname',
        fullName: 'arwa Hamdan',
        beneficiaryAccountNumber: 'SA4005000068200020938002',
        isIBAN: true,
        beneficiaryBankDetail: {
          bankCode: '99999',
          bankName: 'Alinma Bank',
          branchName: '',
          address: null,
          correspondingBankCode: null,
          city: null,
        },
      },
    ],
  },
  paginationInfo: {
    matchedRecords: '3',
    sentRecords: '3',
  },
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCa724b463c7074a4a910ffe65cef009b0',
    requestReference: '06851820381011026786',
  },
  successfulResponse: true,
  ok: true,
};

export default localTransferBeneficiariesMock;
