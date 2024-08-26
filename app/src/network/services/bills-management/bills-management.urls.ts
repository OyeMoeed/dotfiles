const BILLS_MANAGEMENT_URLS = {
  get_billers_categories: () => 'bills-management/v1/billers/biller-categories',
  get_billers_services: (billerID: string) => `bills-management/v1/alinma-payments/billers/${billerID}/services`,
  get_billers: () => 'bills-management/v1/alinmaPay/billers',
};

export default BILLS_MANAGEMENT_URLS;
