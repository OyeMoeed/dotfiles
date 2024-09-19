import { WUTransactionDetailsResponse } from './get-western_union_transaction_details.interface';

const wuTransactiontResponseData: WUTransactionDetailsResponse = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'TransferManagement.SpeedRemitanceTransfersInquiryService.getWesternUnionTransactions.messege.success',
    sessionReference: 'SSPAYCbde1c6a47241400a95d06711658f81ce',
    requestReference: '06851820381011026707',
  },
  response: {
    date: '2024-07-15',
    transactionStatus: 'SUCCESS',
    transactionStatusDesc: 'Transaction successfully completed',
    senderFirstName: 'John',
    senderLastName: 'Doe',
    senderCountry: 'US',
    senderCountryDesc: 'United States',
    receiverFirstName: 'Jane',
    receiverLastName: 'Smith',
    receiverCountry: 'CA',
    receiverCountryDesc: 'Canada',
    receiverPhoneNumber: '+1234567890',
    sentAmount: '500.00',
    sentAmountCurrency: 'USD',
    sentAmountCurrencyDesc: 'United States Dollar',
    targetAmount: '2500.00',
    targetAmountCurrency: 'CAD',
    targetAmountCurrencyDesc: 'Canadian Dollar',
    refundEnabled: true,
    updateEnabled: false,
    inquiryEnabled: true,
    updateRequest: {
      westernUnionReferenceNumber: 'WU123456789',
      moneyTransferControlNumber: 'ABC123XYZ456',
      firstName: 'Michael',
      secondName: '',
      thirdName: '',
      lastName: 'Johnson',
      mobileNumber: '+1234567890',
      status: 'PENDING',
      statusDesc: 'Update request pending approval',
    },
    inquiryRequest: {
      westernUnionReferenceNumber: 'WU123456789',
      moneyTransferControlNumber: 'ABC123XYZ456',
      question: 'What is the status of the transaction?',
      questionDesc: '',
      questionDate: '2024-07-15',
      answer: 'Transaction is successful.',
      answerDate: '2024-07-15',
      status: 'CLOSED',
      statusDesc: 'Inquiry closed',
    },
    refundRequest: {
      westernUnionReferenceNumber: 'WU123456789',
      moneyTransferControlNumber: 'ABC123XYZ456',
      status: 'APPROVED',
      statusDesc: 'Refund request approved',
    },
  },
  successfulResponse: true,
};

export default wuTransactiontResponseData;