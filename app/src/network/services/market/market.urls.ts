const MARKET_URLS = {
  CHECK_AP_VOUCHER_ISACTIVE: 'market/v1/ap-vouchers/is-active',
  GET_AP_VOUCHER_IMAGES: 'alinmapay/market/v1/ap-vouchers/images',
  GET_AP_VOUCHER_CATEGORIES: '/market/v1/ap-vouchers/categories',
  PREPARE_PURCHASE: 'alinmapay/market/v1/ap-vouchers/purchase/prepare',
  CONFIRM_PURCHASE: 'alinmapay/market/v1/ap-vouchers/purchase/confirm',
  GET_SHOP_ORDER_HISTORY: (walletNumber: string) => `alinmapay/market/v1/${walletNumber}/ap-vouchers/purchase`,
  GET_AP_VOUCHER_MERCHANTS_CATEGORY: (categoryId: number | string) =>
    `/alinmapay/market/v1/ap-vouchers/merchants?category=${categoryId}`,
  GET_PRODUCT_DETAILS_BY_PRODUCT_ID: (merchantId: string, productId: string) =>
    `alinmapay/market/v1/ap-vouchers/products?merchant=${merchantId}&product=${productId}`,
};

export default MARKET_URLS;
