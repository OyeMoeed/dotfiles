import AlinmaExpressBeneficiariesProps from './alinma-express-beneficiary.interface';

const alinmaExpressBeneficiariesData: AlinmaExpressBeneficiariesProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCa724b463c7074a4a910ffe65cef009b0',
    requestReference: '06851820381011026786',
  },
  paginationInfo: {
    matchedRecords: '3',
    sentRecords: '3',
  },
  response: {
    beneficiaries: [
      {
        beneficiaryCode: '10587981-3',
        beneficiaryStatus: 'active',
        nickname: 'test',
        fullName: 'arwa Ahmad ali alali',
        beneficiaryAccountNumber: 'SA2880000000002345567889',
        isIBAN: true,
        countryDesc: 'Pakistan',
        countryCode: 'PK',
        remittanceTypeDesc: 'TO ACCOUNT',
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
        fullName: 'Islam Dosoki',
        beneficiaryAccountNumber: 'SA4005000068200020938002',
        isIBAN: true,
        countryDesc: 'Egypt',
        remittanceTypeDesc: 'TO ACCOUNT',
        countryCode: 'EG',
        beneficiaryBankDetail: {
          bankCode: '99999',
          bankName: 'الانماء',
          branchName: '',
          address: null,
          correspondingBankCode: null,
          city: null,
        },
      },
      {
        beneficiaryCode: '10587981-2',
        beneficiaryStatus: 'inactive',
        fullName: 'arwa ahmad',
        beneficiaryAccountNumber: 'SA6180000296608013414076',
        isIBAN: true,
        countryDesc: 'Pakistan',
        countryCode: 'PK',
        remittanceTypeDesc: 'TO ACCOUNT',
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
        beneficiaryCode: '10587981-62',
        beneficiaryStatus: 'newBeneficiary',
        nickname: 'taha',
        fullName: 'Ahmad Khalid Taha',
        beneficiaryAccountNumber: 'SA4005000068200020938002',
        countryCode: 'JO',
        countryDesc: 'Jordan',
        currency: 'JOD',
        currencyDesc: 'JORDANIAN DINAR',
        remittanceType: 'CASH',
        remittanceTypeDesc: 'CASH',
        isIBAN: false,
        beneficiaryBankDetail: {
          bankCode: 'HBT',
          bankName: 'HBT',
          branchName: '',
          address: null,
          correspondingBankCode: 'HBT',
          city: null,
        },
      },
      {
        beneficiaryCode: '10587981-1',
        beneficiaryStatus: 'active',
        nickname: 'newnickname',
        fullName: 'Ahmad Taha',
        beneficiaryAccountNumber: 'SA4005000068200020938002',
        isIBAN: true,
        countryDesc: 'Jordan',
        remittanceTypeDesc: 'TO ACCOUNT',
        countryCode: 'JO',
        beneficiaryBankDetail: {
          bankCode: '99999',
          bankName: 'الانماء',
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
        fullName: 'Qais Trad',
        beneficiaryAccountNumber: 'SA4005000068200020938002',
        isIBAN: true,
        countryDesc: 'Jordan',
        remittanceTypeDesc: 'TO ACCOUNT',
        countryCode: 'JO',
        beneficiaryBankDetail: {
          bankCode: '99999',
          bankName: 'الانماء',
          branchName: '',
          address: null,
          correspondingBankCode: null,
          city: null,
        },
      },
    ],
  },
  ok: true,
  apiResponseNotOk: false,
  successfulResponse: true,
};
export default alinmaExpressBeneficiariesData;
