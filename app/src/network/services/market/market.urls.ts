const MARKET_URLS = {
  CHECK_AP_VOUCHER_ISACTIVE: 'market/v1/ap-vouchers/is-active',
  GET_AP_VOUCHER_IMAGES: 'alinmapay/market/v1/ap-vouchers/images',
  GET_AP_VOUCHER_CATEGORIES: '/market/v1/ap-vouchers/categories',
  GET_AP_VOUCHER_MERCHANTS_CATEGORY: (categoryId: number | string) =>
    `/alinmapay/market/v1/ap-vouchers/merchants?category=${categoryId}`,
};

export default MARKET_URLS;
