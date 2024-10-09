import { BillPaymentOptions } from '@app/utilities';

interface TrafficFormValues {
  serviceProvider: string;
  serviceType: string;
  idType: string;
  duration: string;
  beneficiaryId: string;
  myId: string;
  myIdInput: string;
  myIdCheck?: boolean;
  voilationNumber: string;
}

interface ViolationDetails {
  serviceId?: string;
  serviceDescription?: string;
  applyTax?: string;
  billerId?: string;
  groupPaymentId?: string;
  paymentId?: string;
  moiBillPaymentType?: string;
  amount?: string;
  violatorId: string;
  violationNo: string;
  serviceProvider: BillPaymentOptions;
  serviceType: string;
}
export { TrafficFormValues, ViolationDetails };
