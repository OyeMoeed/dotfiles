import { LoginViaPasscodeResponseProps } from './login-via-passcode.interface';

const loginViaPasscodeMock: LoginViaPasscodeResponseProps = {
  data: {
    status: {
      code: 'I000000',
      type: 'SUCCESS',
      desc: 'retail.msg.default.success',
      sessionReference: 'SSPAYCc0f4f6b62e4c47c8857b641daa70e523',
      requestReference: '07164344825152995592',
    },
    response: {
      walletNumber: '13719',
      mobileNumber: '0534324672',
      availableBalance: '490.00',
      poiNumber: '1002056065',
      walletTier: 'G',
      walletStatus: 'ACTIVE',
      idExpired: false,
      dormant: false,
      passwordMigrated: true,
      nationalAddressComplete: true,
      basicTier: false,
      accountBasicInfoCompleted: true,
      bioRecognition: false,
      otpTimeout: '5',
      correctDeviceId: false,
      newMember: false,
      hasInmaAccount: false,
      hasErsalAccount: false,
      pep: false,
      walletRisk: 'L',
      userUnderReview: false,
      viban: 'SA6405012000000110294027',
    },
    successfulResponse: true,
  },
  ok: true,
};

export default loginViaPasscodeMock;
