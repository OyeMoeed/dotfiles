// TODO: fix in another PR

import { InquireBillPayloadProps } from './inquire-bill/inquire-bill.interface';

/* eslint-disable @typescript-eslint/naming-convention */
const BILLS_MANAGEMENT_URLS = {
  get_billers_categories: () => 'bills-management/v1/billers/biller-categories',
  get_billers_services: (billerID: string) => `bills-management/v1/alinma-payments/billers/${billerID}/services`,
  edit_bill: () => 'bills-management/v1/alinma-pay/bill',
  get_billers: 'bills-management/v1/alinma-payments/billers',
  SAVE_BILL: () => 'bills-management/v1/alinma-pay/bill',
  multi_payment_prepare_bill: () => 'bills-management/v1/alinmaPay/multi-payment/prepare/bill',
  multi_payment_bill: () => 'bills-management/v1/alinmaPay/multi-payment/bill',
  get_dynamic_fields: (billerId: string, serviceId: string, walletNumber: string) =>
    `bills-management/v1/alinma-payments/billers/${billerId}/services/${serviceId}/dynamic-fields/wallet/${walletNumber}`,
  GET_BILLS: 'bills-management/v1/bills',
  GET_BILLS_BY_STATUS: (walletNumber: string, billStatus: string) =>
    `bills-management/v1/alinmapay/bills/${walletNumber}?billStatus=${billStatus}`,
  GET_BILLER_IMAGE: (billerId: string) =>
    `https://www.alinma.com/ADS/channels/retail/assets/images/billers/${billerId}.png`,
  DELETE_BILL: 'bills-management/v1/alinma-pay/bill',
  IQUIRE_BILL: (payload: InquireBillPayloadProps) =>
    `bills-management/v1/adhoc-payment/billers/${payload?.billerId}/service/${payload.serviceId}/bills/${payload.billAccountNumber}/check-amount`,
  get_child_lovs: (lovType: string, filter1: string) =>
    `bills-management/v1/billers/services/dynamic-fields/lov-list/${lovType}?filter1=${filter1}`,
};

export default BILLS_MANAGEMENT_URLS;
