const LOCAL_TRANSFERS_URLS = {
  GET_LOCAL_TRANSFER_BENEFICIARIES_METADATA: () =>
    '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local/metadata',
  GET_LOCAL_TRANSFER_BENEFICIARIES: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local',
  ACTIVATE_BENEFICIARY: () => '/alinma-pay/beneficiaries/activation/mark',
};

export default LOCAL_TRANSFERS_URLS;
