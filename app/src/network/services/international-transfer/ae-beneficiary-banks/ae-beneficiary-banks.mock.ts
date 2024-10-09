import { AEBeneficiaryBanksProps } from './ae-beneficiary-banks.interface';

const aeBeneficiaryBanksMock: AEBeneficiaryBanksProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    banks: [
      {
        code: '001',
        desc: 'Alinma Bank',
        branch: 'Main Branch',
        city: 'Riyadh',
        country: 'SA',
      },
      {
        code: '002',
        desc: 'Riyad Bank',
        branch: 'Kingdom Tower',
        city: 'Riyadh',
        country: 'SA',
      },
    ],
  },
  successfulResponse: true,
  ok: true,
  apiResponseNotOk: false,
};

export default aeBeneficiaryBanksMock;
