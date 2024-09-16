import { MockAPIStatusProps, DeviceInfoProps } from '@network/services/services.interface';

export interface PrintCardPayloadTypes {
  // cardType: CardCategories; // as per swagger
  // deviceInfo: DeviceInfoProps; // as per swagger
  otp: string; // as per old code
  otpRef: string; // as per old code
  deviceInfo: DeviceInfoProps; // as per old code
}

export interface PrintCardResponseTypes {
  status: MockAPIStatusProps;
  response: {
    cardInfo: {
      cardIndex: string;
      cardNumber: string;
      cardStatus: string;
      cardStatusDesc: string;
      cardTypeId: string;
      cardTypeDesc: string;
      cardClassId: string;
      cardClassDesc: string;
      effectiveDate: string;
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
        virtualCard: boolean;
      };
      nickname: string;
      monthlyCashbackAmt: string;
      totalCashbackAmt: string;
      nextAnnualFeeDate: string;
      nextAnnualFeeAmt: string;
      nextAnnualFeeVAT: string;
      physicalCard: boolean;
      reissueDue: string;
      annualFeeDue: string;
    };
  };
  successfulResponse: boolean;
}
