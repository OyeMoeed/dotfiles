const LOCAL_TRANSFERS_URLS = {
  get_local_transfer_beneficiaries_metadata: () => '/transfer-management/v1/alinma-pay/beneficiaries/local/metadata',
  validateIBAN: () => '/transfer-management/v1/alinma-pay/beneficiaries/iban-validty/',
  get_local_transfer_beneficiaries: () => '/transfer-management/v1/alinma-pay/beneficiaries/local',
  local_transfer_prepare: (walletNumber: string) =>
    `/transfer-management/v1/alinma-pay/${walletNumber}/sarie/transfer/prepare`,
  local_transfer_confirm: (walletNumber: string) =>
    `/transfer-management/v1/alinma-pay/${walletNumber}/sarie/transfer/confirm`,
  get_local_beneficiaries_bank_details: () => '/alinmapay-soft/transfer-management/v1/alinma-pay/beneficiaries/',
  add_local_transfer_beneficiary: () => '/transfer-management/v1/alinma-pay/beneficiaries/local',
  activate_beneficiary: '/transfer-management/v1/alinma-pay/beneficiaries/activation/mark',
  get_transaction: (walletNumber: string) => `/core-management/v1/${walletNumber}/transaction`,
  edit_local_transfer_beneficiary: (beneficiaryCode: string) =>
    `/transfer-management/v1/alinma-pay/beneficiaries/${beneficiaryCode}`,
  delete_local_transfer_beneficiary: (beneficiaryCode: string) =>
    `/transfer-management/v1/alinma-pay/beneficiaries/${beneficiaryCode}`,
};

export default LOCAL_TRANSFERS_URLS;
