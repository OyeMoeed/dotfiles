const INTERNATIONAL_TRANSFERS_URLS = {
  get_western_union_beneficiaries: () => ' /v1/alinma-pay/beneficiaries/wu',
  get_alinma_express_beneficiaries: () => '/v1/alinma-pay/beneficiaries/alinma-express',
  get_western_union_beneficiaries_metadata: () => '/alinmapay/transfer-management/v1/beneficiaries/wu/metadata',
  get_western_union_beneficiaries_countries: () => '/alinmapay/transfer-management/v1/beneficiaries/wu/countries',
  get_beneficiaries_dynamic_fields: () => '/alinmapay/transfer-management/v1/beneficiaries/dynamic-fields',
  post_beneficiaries_wu: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/wu',
};

export default INTERNATIONAL_TRANSFERS_URLS;
