const helpCenterMockData = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC066dfff6747447e0a131f88de66297ac',
    requestReference: '07705376242783844123',
  },
  response: {
    faqs: [
      {
        answer: [
          'AlinmaPay is a mobile wallet that can be used to pay from point of sale, send money to your friends, and pay your bills, and more.',
        ],
        order: 1,
        question: 'What is AlinmaPay?',
      },
      {
        answer: [
          'With AlinmaPay you can do the following:',
          '- add money to your wallet using debit card, credit card, local transfer, and via apple Pay',
          '- pay bills through SADAD or Government services',
          '- send money internationally using Western Union or Alinma Direct',
          '- send money to your friends using mobile number',
          '- shop at many merchants with some special offers for AlinmaPay customers',
          '- withdraw money from any Alinma ATM without debit card',
          '- you can use the virtual card and purchase anything from any merchant',
        ],
        order: 2,
        question: 'What can I do with AlinmaPay?',
      },
      {
        answer: ['You have to be at least 18 years old to be able to register to AlinmaPay.'],
        order: 3,
        question: 'How old do I have to be in order to register?',
      },
      {
        answer: [
          'Yes, you need to have a valid Saudi citizen ID or iqama ID to be able to register. Additional documents (such as your passport) may be required to verify your identity.',
        ],
        order: 4,
        question: 'Do I need a Saudi ID/ Iqama ID?',
      },
      {
        answer: [
          'STEP 1: Download the AlinmaPay App on your phone. Search for the AlinmaPay App on Apple App store or Google Play Store.',
          'STEP 2: Register using your phone number.',
          'Once you install the app:',
          '- You will enter your phone number',
          '- Confirm your phone number using an OTP that will be sent to you via SMS.',
          '- You will setup your 4-digit PIN code.',
          'STEP 3: Complete your profile information.',
          'After you register your phone, you will be ready to add money & transfer and issue a digital card instantly.',
        ],
        order: 5,
        question: 'How can start using AlinmaPay?',
      },
      {
        answer: [
          'No, AlinmaPay is a mobile wallet that is similar to a bank account, but has nothing to do with your bank account.',
        ],
        order: 6,
        question: 'Is AlinmaPay linked to my bank account?',
      },
      {
        answer: [
          'Debit card is a physical card with some limited features, AlinmaPay is a wallet you can transfer and pay bills and have a credit card for it.',
        ],
        order: 7,
        question: 'What is the difference between a debit card and AlinmaPay?',
      },
      {
        answer: [
          'You can use AlinmaPay anywhere, anytime with all merchants participating with AlinmaPay, or via AlinmaPay digital card.',
        ],
        order: 8,
        question: 'Where can I use AlinmaPay?',
      },
      {
        answer: ['Yes, you can transfer money and pay your invoices anywhere.'],
        order: 9,
        question: 'Can I use AlinmaPay abroad?',
      },
      {
        answer: ['Yes, you can create an account without losing any benefit in AlinmaPay'],
        order: 10,
        question: 'Can I create an account without being an Alinma Bank customer?',
      },
      {
        answer: [
          'No worries, you can click on Forgot My PIN, you will be redirect to account verify page and then we will send you a text message with OTP and you can set up a new PIN.',
        ],
        order: 11,
        question: 'I forgot my PIN?',
      },
      {
        answer: [
          'It is designed mainly to facilitate payment of bills, zakat, taxes and other payments through all banking channels (branch banks, ATM, phone banking and internet).',
        ],
        order: 12,
        question: 'What is SADAD service?',
      },
      {
        answer: ['Currently the only supported currency is SAR'],
        order: 13,
        question: 'What are the supported currencies?',
      },
      {
        answer: [
          'You can view your transactions history inside the App on home page, including the amount, date and time, and more.',
        ],
        order: 14,
        question: 'Where can I view my transactions history?',
      },
      {
        answer: ['No, you can withdrawing from any Alinma Bank ATM without getting any fees'],
        order: 15,
        question: 'Are there any fees for withdrawing money from AlinmaPay account?',
      },
      {
        answer: [
          'All information are safe and you can re-install the AlinmaPay app and login with your phone number and password to start using your AlinmaPay account again.',
        ],
        order: 16,
        question: 'I deleted the AlinmaPay app from my phone?',
      },
      {
        answer: ['For inquiries, you can call AlinmaPay support for free (8004339000)'],
        order: 17,
        question: 'How can I send a Feedback?',
      },
      {
        answer: ['If you want to close your account you can call support (8004339000)'],
        order: 18,
        question: 'How can I close my account?',
      },
      {
        answer: [
          'You can top up your wallet in multiple ways:',
          '- Apple Pay',
          '- Credit/depit card',
          '- From Alinma bank account',
          '- Local transfer using wallet IBAN.',
        ],
        order: 19,
        question: 'How can I add money to my account?',
      },
      {
        answer: ['Click Local Transfer and add the beneficiary.'],
        order: 20,
        question: 'How can I transfer to local bank?',
      },
      {
        answer: [
          'Click International Transfer, then choose the way of transfer: AlinmaPay Direct or Western Union and then add the beneficiary.',
        ],
        order: 21,
        question: 'How can I transfer Internationally?',
      },
      {
        answer: ['Enjoy your digital card without any charge.'],
        order: 22,
        question: 'Is there a charge for getting a digital card?',
      },
      {
        answer: ['Sure, you only have to activate online purchases from the application'],
        order: 23,
        question: 'Can I purchase online with AlinmaPay card?',
      },
      { answer: ['Click SADAD Bills then add new bill.'], order: 24, question: 'How can I pay SADAD bills?' },
      {
        answer: ['Maximum amount for account is up to 20,000 SAR'],
        order: 25,
        question: 'What is the maximum amount I can have on my AlinmaPay account?',
      },
      {
        answer: ['You should have an Absher account to open an account'],
        order: 26,
        question: 'Should I be registered on Absher to have account?',
      },
      {
        answer: ['Click Send Money then enter the mobile number/ Name.'],
        order: 27,
        question: 'How can I transfer money to a phone number?',
      },
      { answer: ['AlinmaPay card supports both mada and visa'], order: 28, question: 'AlinmaPay card mada or Visa?' },
    ],
  },
  successfulResponse: true,
  ok: true,
};

export { helpCenterMockData };
