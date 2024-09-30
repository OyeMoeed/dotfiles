const PHYSICAL_CARD_URLS = {
  print_card: (walletNumber: string) => `/cards-management/v1/${walletNumber}/cards/card-print`,
  print_card_prepare: (walletNumber: string) => `/cards-management/v1/${walletNumber}/cards/card-print/prepare`,
};

export default PHYSICAL_CARD_URLS;
