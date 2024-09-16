const getWalletInfoMock: any = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'Alinmapay.walletDetailsInquiry.getWalletDetails.messege.success',
    sessionReference: 'SSPAYC1952f63a57134c109d203fd3b33d153b',
    requestReference: '07897110943309317181',
  },
  response: {
    walletNumber: '10142',
    walletType: 'C',
    viban: 'SA2305012000000110000952',
    walletStatus: 'ACTIVE',
    createdAt: '2019-01-02',
    walletTier: 'P',
    availableBalance: '1223.48',
    currentBalance: '26596.00',
    qrBeforeLogin: false,
    bioRecognised: true,
    limitsDetails: {
      monthlyIncomingLimit: '50000',
      monthlyOutgoingLimit: '50000',
      dailyIncomingLimit: '50000',
      dailyOutgoingLimit: '50000',
      monthlyRemainingIncomingAmount: '4998.67',
      monthlyRemainingOutgoingAmount: '4931.51',
      dailyRemainingIncomingAmount: '4998.67',
      dailyRemainingOutgoingAmount: '4931.51',
    },
    dormant: false,
    idExpired: false,
    passwordMigrated: true,
    nationalAddressComplete: true,
    basicTier: false,
    accountBasicInfoCompleted: true,
    bioRecognition: false,
    addressDetails: {
      district: 'testo',
      street: 'olayan',
      buildingNumber: '1234',
      unitNumber: '1235',
      poBox: '12333',
      additionalNumber: '1235',
    },
    userContactInfo: {
      preferedLanguage: 'Ar',
      address: 'olayan AHAD AL-MASAREHA',
      postalCode: '12333',
      city: 'AHAD AL-MASAREHA',
      townCountry: 'SA',
      mobileNumber: '0583433324',
      owner: null,
      realUser: null,
      moiRegistred: null,
      email: 'msbinhawshan@alinma.com',
      cityDesc: 'أحد المسارحة',
    },
    workDetails: {
      occupation: '71',
      occupationDesc: ' مقدم',
      industry: 'TEST1',
      industryDesc: 'TEST1',
      jobTitle: null,
    },
    accountBasicInfo: {
      incomeSource: 'Payroll',
      incomeAmount: null,
      jobTitle: null,
      monthlyIncomeAmount: '2',
      industry: 'TEST1',
      occupation: '71',
      industryDesc: 'TEST1',
      occupationDesc: ' مقدم',
      nationality: 'Saudi Arabia#السعودية',
    },
    hasVat: false,
    firstName: 'SAHQB',
    fatherName: 'ABDULLAH',
    grandFatherName: 'باد',
    familyName: 'بالاكريشنان',
    fullName: 'SAHQB ABDULLAH',
    pep: false,
    walletRisk: 'L',
    userUnderReview: false,
    userPreferences: {
      hasGifts: true,
      hasMoneyRequests: true,
    },
  },
  successfulResponse: true,
};

export default getWalletInfoMock;
