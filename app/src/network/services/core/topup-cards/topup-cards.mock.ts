import { TopupCardsMockProps } from './topup-cards.interface';

const topupCardsMock: TopupCardsMockProps = {
  data: {
    response: {
      cardList: [
        {
          expirationYear: '2030',
          createdAt: '2008',
          cardBin: '10142',
          transactionReferenceNumber: 'FT08099NZXYS',
          registrationId: '2C4654BE67A3EA33C6B691FE63807DB9',
          lastDigits: '5454',
          embossingName: null,
          expirationMonth: '10',
          cardBrand: 'MASTERCARD',
          paymentGateway1: 'CLICKPAY',
          binCountry: null,
          token: '2C4654BE67A3EA33C6B691FE63807DB9',
        },
        {
          expirationYear: '2026',
          createdAt: '2008',
          cardBin: '10142',
          transactionReferenceNumber: 'FT08099850PX',
          registrationId: '2C4654BE67A3EA33C6B691FD618078B9',
          lastDigits: '5454',
          embossingName: null,
          expirationMonth: '10',
          cardBrand: 'MASTERCARD',
          paymentGateway1: 'CLICKPAY',
          binCountry: null,
          token: '2C4654BE67A3EA33C6B691FD618078B9',
        },
        {
          expirationYear: '2025',
          createdAt: '2008',
          cardBin: '10142',
          transactionReferenceNumber: 'FT08099079ZW',
          registrationId: '2C4653BD67A3E931C6B791F4678A75BF',
          lastDigits: '0000',
          embossingName: null,
          expirationMonth: '2',
          cardBrand: 'VISA',
          paymentGateway1: 'CLICKPAY',
          binCountry: null,
          token: '2C4653BD67A3E931C6B791F4678A75BF',
        },
        {
          expirationYear: '2026',
          createdAt: '2008',
          cardBin: '10142',
          transactionReferenceNumber: 'FT080991RRXQ',
          registrationId: '2C4654BE67A3EA33C6B691FC618078B9',
          lastDigits: '1111',
          embossingName: null,
          expirationMonth: '10',
          cardBrand: 'VISA',
          paymentGateway1: 'CLICKPAY',
          binCountry: null,
          token: '2C4654BE67A3EA33C6B691FC618078B9',
        },
        {
          expirationYear: '2026',
          createdAt: '2008',
          cardBin: '10142',
          transactionReferenceNumber: 'FT0809991LY6',
          registrationId: '2C4654BE67A3E537C6B791F5658A78B1',
          lastDigits: '5454',
          embossingName: null,
          expirationMonth: '1',
          cardBrand: 'MASTERCARD',
          paymentGateway1: 'CLICKPAY',
          binCountry: null,
          token: '2C4654BE67A3E537C6B791F5658A78B1',
        },
        {
          expirationYear: '2026',
          createdAt: '2008',
          cardBin: '10142',
          transactionReferenceNumber: 'FT080999185M',
          registrationId: '2C4654BE67A3E537C6B791F5658A78B3',
          lastDigits: '5454',
          embossingName: null,
          expirationMonth: '1',
          cardBrand: 'MASTERCARD',
          paymentGateway1: 'CLICKPAY',
          binCountry: null,
          token: '2C4654BE67A3E537C6B791F5658A78B4',
        },
      ],
    },
    paginationInfo: {
      matchedRecords: '6',
      sentRecords: '6',
    },
    successfulResponse: true,
    status: {
      sessionReference: 'SSPAYC5c2207e5333046a780efc88f0d60fc23',
      code: 'I000000',
      requestReference: '00750728259257819755',
      type: 'SUCCESS',
      desc: 'Alinmapay.cardManagement.cardInquiry.getTopupCards.messege.success',
    },
  },
  ok: true,
};

export default topupCardsMock;