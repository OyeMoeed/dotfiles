import WUBeneficiaryDetailsMetaDataProps from './wu-beneficiary-details-metadata.interface';

const wuBeneficiaryDetailsMetaDataMock: WUBeneficiaryDetailsMetaDataProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  response: {
    transferReasonList: [
      {
        code: 'WUS.5',
        desc: 'Education/School Fee',
        addtionalAttribute1: 'رسوم تعليم',
      },
      {
        code: 'WUS.7',
        desc: 'Emergency Needs',
        addtionalAttribute1: 'احتياجات طارئة',
      },
    ],
  },
  successfulResponse: true,
  ok: true,
};

export default wuBeneficiaryDetailsMetaDataMock;
