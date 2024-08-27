import LocalBeneficiaryMetaMockProps from './local-beneficiary-metadata.interface';

const localBeneficiaryMetaDataMock: LocalBeneficiaryMetaMockProps = {
  data: {
    localBanks: [
      {
        code: '001',
        desc: 'Local Bank 1',
      },
      {
        code: '002',
        desc: 'Local Bank 2',
      },
    ],
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

export default localBeneficiaryMetaDataMock;
