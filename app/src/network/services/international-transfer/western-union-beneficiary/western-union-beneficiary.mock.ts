import WesternUnionBeneficiariesProps from './western-union-beneficiary.interface';

const westernUnionBeneficiariesData: WesternUnionBeneficiariesProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCe8b1074c206b4e5a93e500295153a018',
    requestReference: '06851820381011026762',
  },
  paginationInfo: {
    matchedRecords: '2',
    sentRecords: '2',
  },
  response: {
    beneficiaries: [
      {
        beneficiaryCode: '10587981-5',
        beneficiaryStatus: 'inactive',
        nickname: 'ramesh preprod PK',
        fullName: 'Adel Sami',
        countryCode: 'PK',
        countryDesc: 'Pakistan',
        currency: 'PKR',
        currencyDesc: 'PAKISTAN RUPEE',
        remittanceType: '500',
        remittanceTypeDesc: 'TO ACCOUNT',
        beneficiaryAccountNumber: 'PK43HABB0005187900257512',
        isIBAN: false,
        beneficiaryBankDetail: {
          bankCode: '02',
          bankName: '02',
          branchName: '',
          address: null,
          correspondingBankCode: null,
          city: null,
        },
      },
      {
        beneficiaryCode: '10587981-4',
        beneficiaryStatus: 'active',
        nickname: 'AA',
        fullName: 'Mohamed Nassar',
        countryCode: 'EG',
        countryDesc: 'Egypt',
        currency: 'USD',
        currencyDesc: 'US DOLLAR',
        remittanceType: '000',
        remittanceTypeDesc: 'CASH',
        isIBAN: false,
        beneficiaryBankDetail: {
          bankCode: null,
          bankName: null,
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
export default westernUnionBeneficiariesData;
