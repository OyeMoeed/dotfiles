import { MockAPIStatusProps } from '@network/services/services.interface';

export interface BillersService {
  serviceDesc: string;
  amountHintEn: string;
  amountLov: string;
  mainBillIdHint: string;
  applyTax: string;
  mainBillIdLabel: string;
  billIdTypes: string;
  amountHintAr: string;
  serviceId: string;
  typeOfPayment: string;
}

export interface GetBillersServicesResponseTypes {
  response: {
    servicesList: BillersService[];
  };
  successfulResponse: boolean;
  status: MockAPIStatusProps;
}
