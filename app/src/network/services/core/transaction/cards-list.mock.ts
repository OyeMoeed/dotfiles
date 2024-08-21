const cardsListMock = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'Alinmapay.cardManagement.cardPaymentStatus.messege.success',
    sessionReference: 'SSPAYC5989e5923c3d4c978e5edde21f87b03f',
    requestReference: '04268131955827439386',
  },
  response: {
    referenceNumber: '12',
    transactionDate: '2024-07-14T11:49:26Z',
    cardList: {
      registrationId: '21000000',
      cardBin: '12',
      lastDigits: '45',
      binCountry: 'SA',
      expirationYear: '2025',
      expirationMonth: '12',
      embossingName: 'AJ',
      cardBrand: 'VISA',
      createdAt: '2024-07-14T11:49:26Z',
      paymentGateway1: 'IPN',
      token: '121212121',
    },
  },
  successfulResponse: true,
};

export default cardsListMock;
