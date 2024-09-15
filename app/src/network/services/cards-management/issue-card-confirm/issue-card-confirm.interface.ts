import { DeviceInfoProps } from '../../services.interface';

export interface IConfirmIssueCardReq {
  deviceInfo: DeviceInfoProps;
  cardPinCode: string;
  otp: string;
  otpRef: string;
  cardType: string;
  transactionType: string;
  physicalCard: boolean;
  cardManageStatus?: string;
  cardIndex?: string;
}

export interface IConfirmIssueCardRes {
  cardInfo: CardInfo;
}

export interface CardInfo {
  cardIndex: string;
  cardNumber: string;
  cardStatus: string;
  cardStatusDesc: string;
  cardTypeId: string;
  cardTypeDesc: string;
  cardClassId: string;
  cardClassDesc: string;
  effectiveDate: any;
  expiryDate: string;
  maskedCardNumber: string;
  cvv2: string;
  linkedName: LinkedName;
  issueDate: string;
  expiryDateMonthYear: string;
  creditCardDetails: CreditCardDetails;
  nickname: any;
  monthlyCashbackAmt: any;
  totalCashbackAmt: any;
  nextAnnualFeeDate: any;
  nextAnnualFeeAmt: any;
  nextAnnualFeeVAT: any;
  physicalCard: boolean;
  reissueDue: boolean;
  annualFeeDue: boolean;
}

export interface LinkedName {
  title: string;
  embossingName: string;
  firstName: string;
  lastName: string;
}

export interface CreditCardDetails {
  dueAmount: string;
  paymentDueDate: any;
  availableBalance: string;
  cashAvailableBalance: string;
  extraBalance: string;
  totalOutstanding: string;
  creditLimit: string;
  cashLimit: string;
  statementIssuanceDate: string;
  nextAnnualFeesDueDate: string;
  virtualCard: boolean;
}
