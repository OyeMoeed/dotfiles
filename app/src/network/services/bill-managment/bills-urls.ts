/* eslint-disable @typescript-eslint/naming-convention */
// Import the MoiDynamicFieldsPayloadProps interface
import { MoiDynamicFieldsPayloadProps } from './moi/get-dynamic-feilds/get-dynamic-fields.interface';

// Define the BILLS_URLS object with the GET_DYNAMIC_FIELD method
const BILLS_URLS = {
  GET_DYNAMIC_FIELD: ({ billerId, serviceId, walletNumber }: MoiDynamicFieldsPayloadProps) =>
    `/v1/alinma-payments/billers/${billerId}/services/${serviceId}/dynamic-fields/wallet/${walletNumber}`,
  VALIDATE_PAYMENT: (billerId: string, serviceId: string) =>
    `/v1/moi/billers/${billerId}/services/${serviceId}/payment/validate`,
  PREPARE_MOI_BILL: (paymentType: string) => `/v1/alinmaPay/${paymentType}/prepare/bill`,
  MOI_BILL_PAYMENT: '/v1/alinmaPay/moi/payment',
};

// Export the BILLS_URLS object as the default export
export default BILLS_URLS;
