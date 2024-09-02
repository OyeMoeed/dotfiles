export interface Status {
  code: string;
  type: string;
  desc: string;
  sessionReference: string;
  requestReference: string;
}

export interface UpdateRequest {
  westernUnionReferenceNumber: string;
  moneyTransferControlNumber: string;
  firstName: string;
  secondName?: string;
  thirdName?: string;
  lastName: string;
  mobileNumber: string;
  status: string;
  statusDesc: string;
}

export interface InquiryRequest {
  westernUnionReferenceNumber: string;
  moneyTransferControlNumber: string;
  question: string;
  questionDesc?: string;
  questionDate: string;
  answer: string;
  answerDate: string;
  status: string;
  statusDesc: string;
}

export interface RefundRequest {
  westernUnionReferenceNumber: string;
  moneyTransferControlNumber: string;
  status: string;
  statusDesc: string;
}

export interface Response {
  date: string;
  transactionStatus: string;
  transactionStatusDesc: string;
  senderFirstName: string;
  senderLastName: string;
  senderCountry: string;
  senderCountryDesc: string;
  receiverFirstName: string;
  receiverLastName: string;
  receiverCountry: string;
  receiverCountryDesc: string;
  receiverPhoneNumber: string;
  sentAmount: string;
  sentAmountCurrency: string;
  sentAmountCurrencyDesc: string;
  targetAmount: string;
  targetAmountCurrency: string;
  targetAmountCurrencyDesc: string;
  refundEnabled: boolean;
  updateEnabled: boolean;
  inquiryEnabled: boolean;
  updateRequest?: UpdateRequest;
  inquiryRequest?: InquiryRequest;
  refundRequest?: RefundRequest;
}

export interface wuTransactionDetailsResponse {
  status: Status;
  response: Response;
  successfulResponse: boolean;
}
