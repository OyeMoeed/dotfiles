const LOCAL_TRANSFERS_URLS = {
  get_local_transfer_beneficiaries_metadata: () =>
    '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local/metadata',
  get_local_transfer_beneficiaries: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local',
  local_transfer_prepare: (walletNumber: string) =>
    `/alinmapay/transfer-management/v1/alinma-pay/${walletNumber}/express/transfer/prepare`,
  local_transfer_confirm: (walletNumber: string) =>
    `/alinmapay/transfer-management/v1/alinma-pay/${walletNumber}/express/transfer/confirm`,
  activate_beneficiary: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/activation/mark',
};

export default LOCAL_TRANSFERS_URLS;
