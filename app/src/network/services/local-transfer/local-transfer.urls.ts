const LOCAL_TRANSFERS_URLS = {
  GET_LOCAL_TRANSFER_BENEFICIARIES_METADATA: () =>
    '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local/metadata',
  GET_LOCAL_TRANSFER_BENEFICIARIES: () => '/alinmapay/transfer-management/v1/alinma-pay/beneficiaries/local',
  GET_LOCAL_BENEFICIARIES_BANK_DETAILS: (
    iban: string,
    countryCode: string,
    bankCode: string,
    beneficiaryType: string,
  ) =>
    `/alinmapay-soft/transfer-management/v1/alinma-pay/beneficiaries/
    ${iban}?country-code=${countryCode}&bank-code=${bankCode}&beneficiary-type=${beneficiaryType}`,
  ADD_LOCAL_TRANSFER_BENEFICIARY: () => '/alinmapay-soft/transfer-management/v1/alinma-pay/beneficiaries/local',
};

export default LOCAL_TRANSFERS_URLS;
