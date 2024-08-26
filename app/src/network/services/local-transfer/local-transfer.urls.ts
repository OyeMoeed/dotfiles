const LOCAL_TRANSFERS_URLS = {
  get_local_transfer_beneficiaries_metadata: () =>
    '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local/metadata',
  get_local_transfer_beneficiaries: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local',
  get_local_beneficiaries_bank_details: () => '/alinmapay-soft/transfer-management/v1/alinma-pay/beneficiaries/',
  add_local_transfer_beneficiary: () => '/alinmapay-soft/transfer-management/v1/alinma-pay/beneficiaries/local',
};

export default LOCAL_TRANSFERS_URLS;
