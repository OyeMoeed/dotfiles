import { MockAPIStatusProps } from '../../services.interface';

export interface MusnaedInqueryRecords {
  borderNumber: string;
  contractNumber: string;
  countryCode: string;
  haveWalletFlag: boolean;
  lastPaidSalaryDate: string;
  name: string;
  nationality: string;
  nationalityAr: string;
  nationalityEn: string;
  occupation: string;
  occupationAr: string;
  occupationEn: string;
  payrollAmount: string;
  poiExperationDate: string;
  poiNumber: string;
  salarySource: string;
  type?: string;
  paymentStatus?: string;
  mobileNumber?: string;
  walletNumber?: string;
}

export interface MusanedInquiryMockProps {
  status: MockAPIStatusProps;
  successfulResponse: boolean;
  response: {
    sponsorName: string;
    sponsorPOINumber: string;
    sponsorNationality: string;
    sponsorBirthDateHijri: string;
    laborersInfoList: Array<MusnaedInqueryRecords>;
  };
}

export interface MusanedInquiryReqParams {
  walletNumber: string;
}
