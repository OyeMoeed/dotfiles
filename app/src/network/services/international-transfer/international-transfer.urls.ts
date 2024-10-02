const INTERNATIONAL_TRANSFERS_URLS = {
  western_union_update_request: (moneyTransferControlNumber: string) =>
    `/v1/westernunion-transfer/transactions/${moneyTransferControlNumber}/update-requests`,
  western_union_refund_request: (moneyTransferControlNumber: string) =>
    `/v1/westernunion-transfer/transactions/${moneyTransferControlNumber}/refund-requests`,
  get_western_union_refund_request: () => '/v1/westernunion-transfer/transactions/refund-requests',
  get_western_union_update_request: () => '/v1/westernunion-transfer/transactions/update-requests',
  get_western_union_transactions: () => '/v1/westernunion-transfer/transactions',
  get_alinma_express_transactions: () => '/v1/alinma-express-transfer/transactions',
  get_western_union_transactions_details: (moneyTransferControlNumber: string) =>
    `/v1/westernunion-transfer/transactions/${moneyTransferControlNumber}`,
  get_western_union_beneficiaries: () => 'transfer-management/v1/alinma-pay/beneficiaries/wu',
  get_alinma_express_beneficiaries: () => 'transfer-management/v1/alinma-pay/beneficiaries/alinma-express',
  get_western_union_beneficiaries_metadata: (serviceType: string) =>
    `transfer-management/v1/beneficiaries/${serviceType}/metadata`,
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
