import { IDeveiceInfo } from "../../core/id-renewal/id-renewal.interface";

export interface CardStatusReq {
    status?: string;
    cardIndex?: string;
    deviceInfo?: IDeveiceInfo;
  }
  export enum CardStatusNumber{
    ActiveWithoutOnlinePurchase = '0',
    ActiveWithOnlinePurchase = '100',
    Stolen = '700',
    Freezed = '850'
}
  export interface CardStatusRes {

      cardInfo: {
        cardIndex: string;
        cardNumber: string;
        cardStatus: string;
        cardStatusDesc: string;
        cardTypeId: string;
        cardTypeDesc: string;
        cardClassId: string;
        cardClassDesc: string;
        effectiveDate: null;
        expiryDate: string;
        maskedCardNumber: string;
        cvv2: string;
        linkedName: {
          title: string;
          embossingName: string;
          firstName: string;
          lastName: string;
        };
        issueDate: string;
        expiryDateMonthYear: string;
        creditCardDetails: {
          dueAmount: string;
          paymentDueDate: string;
          availableBalance: string;
          cashAvailableBalance: string;
          extraBalance: string;
          totalOutstanding: string;
          creditLimit: string;
          cashLimit: string;
          statementIssuanceDate: string;
          nextAnnualFeesDueDate: string;
        };
        nickname: string;
      }
  
  }