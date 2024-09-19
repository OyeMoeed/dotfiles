const INTERNATIONAL_TRANSFERS_URLS = {
  get_western_union_beneficiaries: () => 'transfer-management/v1/alinma-pay/beneficiaries/wu',
  get_alinma_express_beneficiaries: () => 'transfer-management/v1/alinma-pay/beneficiaries/alinma-express',
  get_western_union_beneficiaries_metadata: () => 'transfer-management/v1/beneficiaries/wu/metadata',
  get_western_union_beneficiaries_countries: () => 'transfer-management/v1/beneficiaries/wu/countries',
  western_union_beneficiaries: () => 'transfer-management/v1/alinma-pay/beneficiaries',
  western_union_transfer: () => 'transfer-management/v1/alinma-pay/beneficiaries',
  delete_beneficiary: (beneficiaryCode: string) => `transfer-management/v1/alinma-pay/beneficiaries${beneficiaryCode}`,
  activate_beneficiary: () => 'transfer-management/v1/alinma-pay/beneficiaries/activation/mark',
  edit_beneficiary: (beneficiaryCode: string) => `transfer-management/v1/alinma-pay/beneficiaries${beneficiaryCode}`,
  get_beneficiaries_dynamic_fields: () => 'transfer-management/v1/beneficiaries/dynamic-fields',
  post_beneficiaries_wu: () => 'transfer-management/v1/alinma-pay/beneficiaries/wu',
  alinma_express_beneficiaries_metadata: () => 'transfer-management/v1/beneficiaries/alinma-express/metadata',
  alinma_express: () => 'transfer-management/v1/beneficiaries/alinma-express',
};

export default INTERNATIONAL_TRANSFERS_URLS;
