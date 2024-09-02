const BILLS_MANAGEMENT_URLS = {
  get_billers_categories: () => 'bills-management/v1/billers/biller-categories',
  get_billers_services: (billerID: string) => `bills-management/v1/alinma-payments/billers/${billerID}/services`,
  edit_bill: () => 'bills-management/v1/alinma-pay/bill',
  get_billers: () => 'bills-management/v1/alinmaPay/billers',
  inquire_bill: () => 'bills-management/v1/alinma-pay/bill',
  multi_payment_prepare_bill: () => 'bills-management/v1/alinmaPay/multi-payment/prepare/bill',
  multi_payment_bill: () => 'bills-management/v1/alinmaPay/multi-payment/bill',
};

export default BILLS_MANAGEMENT_URLS;