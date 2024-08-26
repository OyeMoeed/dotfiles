const CARDS_MANAGEMENT_URLS = {
  get_billers_categories: () => 'bills-management/v1/billers/biller-categories',
  get_billers_services: (billerID: string) => `bills-management/v1/alinma-payments/billers/${billerID}/services`,
};

export default CARDS_MANAGEMENT_URLS;
