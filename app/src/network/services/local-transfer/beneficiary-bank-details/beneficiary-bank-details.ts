import images from '@app/assets/images';
import { LocalTransferBeneficiaryBankMockProps } from './beneficiary-bank-details.interface';

const localTransferBeneficiaryBankDetailsMock: LocalTransferBeneficiaryBankMockProps = {
  // TODO need to update this data
  data: {
    bankCode: '000011',
    bankName: 'Alinma Bank',
    correspondingBankCode: '9000',
    beneficiaryType: '',
    bankLogo: images.alinmaBankLogo,
  },
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCd34f801b028f4662b8b9559655775214',
    requestReference: '06851820381011026813',
  },
  successfulResponse: true,
  ok: true,
  apiResponseNotOk: false,
};

export default localTransferBeneficiaryBankDetailsMock;
