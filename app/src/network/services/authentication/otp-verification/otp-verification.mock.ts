import { ValidateOtpMockProps } from './otp-verification.interface';

const validateOtpMock: ValidateOtpMockProps = {
  data: {
    status: {
      code: 'I000000',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
      sessionReference: 'SSPAYC0088bef9fdfd4816995b4cf07ebbe680',
      requestReference: '07631609194089878795',
    },
    response: {
      walletNumber: '10587982',
      mobileNumber: '0568977738',
      firstName: 'SAHQB',
      fatherName: 'ABDULLAH',
      grandFatherName: 'ABDULAHMASAN',
      nickName: 'SAHQB ABDULLAH ABDULAHMASAN ALRMOI#صهب عبدالله عبد المحسن الرومى',
      familyName: 'ALRMOI',
      fullName: 'SAHQB ABDULLAH ABDULAHMASAN ALRMOI',
      availableBalance: '1080.50',
      poiNumber: '1010366648',
      walletTier: 'G',
      walletStatus: 'ACTIVE',
      idExpired: false,
      dormant: false,
      passwordMigrated: true,
      nationalAddressComplete: true,
      basicTier: false,
      accountBasicInfoCompleted: true,
      bioRecognition: false,
      pep: false,
      walletRisk: 'L',
      userUnderReview: false,
      correctDeviceId: true,
      newMember: false,
      hasInmaAccount: false,
      hasErsalAccount: false,
      viban: 'SA9105012000000110295384',
    },
    successfulResponse: true,
  },
  ok: true,
};

export default validateOtpMock;
