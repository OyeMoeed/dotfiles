import LocalBeneficiaryMetaMockProps from './local-beneficiary-metadata.interface';

const localBeneficiaryMetaDataMock: LocalBeneficiaryMetaMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC2ce26d514d12411bae0b16b342da0bf6',
    requestReference: '08432016497290053097',
  },
  response: {
    localBanks: [
      {
        code: '999999',
        desc: 'Albilad Bank',
        addtionalAttribute1: 'بنك البلاد',
        addtionalAttribute2: '1440',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '015',
      },
      {
        code: '20',
        desc: 'Alrajhi Bank',
        addtionalAttribute1: 'مصرف الراجحي',
        addtionalAttribute2: '1497',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '080',
      },
    ],
  },
  successfulResponse: true,
};

export default localBeneficiaryMetaDataMock;
