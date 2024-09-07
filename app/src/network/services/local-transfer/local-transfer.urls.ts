const LOCAL_TRANSFERS_URLS = {
  get_local_transfer_beneficiaries_metadata: () => '/transfer-management/v1/alinma-pay/beneficiaries/local/metadata',
  validateIBAN: () => '/transfer-management/v1/alinma-pay/beneficiaries/iban-validty/',
  get_local_transfer_beneficiaries: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local',
  get_local_beneficiaries_bank_details: () => '/alinmapay-soft/transfer-management/v1/alinma-pay/beneficiaries/',
  add_local_transfer_beneficiary: () => '/alinmapay-soft/transfer-management/v1/alinma-pay/beneficiaries/local',
  activate_beneficiary: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/activation/mark',
  get_transaction: (walletNumber: string) => `/v1/${walletNumber}/transaction`,
};

export default LOCAL_TRANSFERS_URLS;
