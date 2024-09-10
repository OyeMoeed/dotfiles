const INTERNATIONAL_TRANSFERS_URLS = {
  get_western_union_beneficiaries: () => '/v1/alinma-pay/beneficiaries/wu',
  get_alinma_express_beneficiaries: () => '/v1/alinma-pay/beneficiaries/alinma-express',
  get_western_union_beneficiaries_metadata: () => '/alinmapay/transfer-management/v1/beneficiaries/wu/metadata',
  get_western_union_beneficiaries_countries: () => '/alinmapay/transfer-management/v1/beneficiaries/wu/countries',
  western_union_update_request: (moneyTransferControlNumber: string) =>
    `/v1/westernunion-transfer/transactions/${moneyTransferControlNumber}/update-requests`,
  western_union_refund_request: (moneyTransferControlNumber: string) =>
    `/v1/westernunion-transfer/transactions/${moneyTransferControlNumber}/refund-requests`,
  get_western_union_refund_request: () => `/v1/westernunion-transfer/transactions/refund-requests`,
  get_western_union_update_request: () => `/v1/westernunion-transfer/transactions/update-requests`,
  get_western_union_transactions: () => '/v1/westernunion-transfer/transactions',
  get_alinma_express_transactions: () => '/v1/alinma-express-transfer/transactions',
  get_western_union_transactions_details: (moneyTransferControlNumber: string) =>
    `/v1/westernunion-transfer/transactions/${moneyTransferControlNumber}`,
  delete_beneficiary: (beneficiaryCode: string) => `/v1/alinma-pay/beneficiaries${beneficiaryCode}`,
  activate_beneficiary: () => '/v1/alinma-pay/beneficiaries/activation/mark',
  edit_beneficiary: (beneficiaryCode: string) => `/v1/alinma-pay/beneficiaries${beneficiaryCode}`,
};

export default INTERNATIONAL_TRANSFERS_URLS;
