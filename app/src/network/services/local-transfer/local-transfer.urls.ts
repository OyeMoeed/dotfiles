const LOCAL_TRANSFERS_URLS = {
  GET_LOCAL_TRANSFER_BENEFICIARIES_METADATA: () =>
    '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local/metadata',
  GET_LOCAL_TRANSFER_BENEFICIARIES: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local',
  LOCAL_TRANSFER_PREPARE: (walletNumber: string) =>
    `/alinmapay/transfer-management/v1/alinma-pay/${walletNumber}/express/transfer/prepare`,
  LOCAL_TRANSFER_CONFIRM: (walletNumber: string) =>
    `/alinmapay/transfer-management/v1/alinma-pay/${walletNumber}/express/transfer/confirm`,
};

export default LOCAL_TRANSFERS_URLS;
