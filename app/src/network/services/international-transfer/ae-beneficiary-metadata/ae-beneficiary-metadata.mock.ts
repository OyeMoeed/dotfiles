import AEBeneficiaryMetaDataProps from './ae-beneficiary-metadata.interface';

const aeBeneficiaryMetaDataMock: AEBeneficiaryMetaDataProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    alinmaExpressTypeList: [
      {
        code: 'DIRECT',
        desc: 'Direct Remittance',
      },
      {
        code: 'INDIRECT',
        desc: 'Indirect Remittance',
      },
    ],
  },
  successfulResponse: true,
  ok: true,
  apiResponseNotOk: false,
};

export default aeBeneficiaryMetaDataMock;
