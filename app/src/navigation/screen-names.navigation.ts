/**
 * Defines screen names used in navigation.
 */
const enum ScreenNames {
  HOME = 'Home',
  HOME_BASE = 'HomeBase',
  PROFILE = 'Profile',
  SETTINGS = 'Settings',
  HELP_CENTER = 'Help Center',
  MOBILE_IQAMA_VERIFICATION = 'MobileAndIqamaVerification',
  CARDS = 'Cards',
  MARKETPLACE = 'Shop',
  MORE = 'More',
  ADD_PASSCODE = 'Enter Passcode',
  NEW_PASSCODE = 'New Passcode',
  RESET_SUCCESSFUL = 'Reset Successful',
  SET_PASSCODE = 'SetPasscode',
  CONFIRM_PASSCODE = 'ConfirmPasscode',
  REGISTRATION_SUCCESSFUL = 'RegistrationSuccessful',
  LOGIN_VIA_PASSCODE = 'LoginViaPasscode',
  PASSCODE_RECREATED = 'PasscodeRecreatedSuccessfuly',
  ONBOARDING = 'Onboarding',
  SPLASH = 'splash',
  WALLET = 'Wallet',
  DELINK_SUCCESS = 'DelinkSuccess',
  TOP_UP = 'Top Up',
  CARD_VERIFICATION = 'Card Verification',
  TOP_UP_SUCCESS = 'Top Up Success',
  W2W_TRANSFER_SUCCESS = 'Wallet to wallet transfer success',
  IDENTITY_SUCCESSFUL = 'IdentitySuccessMessage',
  POINTS_REDEMPTIONS = 'PointsRedemption',
  POINTS_REDEMPTIONS_CONFIRMATION = 'PointsRedemptionConfirmation',
  POINTS_REDEMPTIONS_SUCCESS_AND_FAILED = 'PointsRedemptionSuccessAndFailed',
  TOP_UP_IBAN = 'TopUpIBAN',
  TRANSACTIONS_HISTORY = 'TransactionsHistory',
  NEAREST_ATM = 'NearestAtmScreen',
  CARD_ISSUE_CONFIRMATION = 'CardIssueConfirmation',
  WALLET_TRANSFER = 'WalletTransfer',
  ATM_WITHDRAW_QRCODE_SCANNER = 'ATMWithDrawQRCodeScanner',
  SEND_MONEY_QRCODE_SCANNER = 'SendMoneyQRCodeScanner',
  ATM_WITHDRAWALS = 'AtmWithdrawals',
  ATM_WITHDRAW_SUCCESSFUL = 'AtmWithdrawSuccessful',
  CARD_OPTIONS = 'CardOptions',
  CHANGE_PIN_SUCCESS = 'ChangePinSuccess',
  CARD_RENEWAL = 'CardRenewal',
  VIRTUAL_CARD = 'VirtualCard',
  REPLACE_CARD_CHOOSE_ADDRESS = 'ReplaceCardChooseAddress',
  REPLACE_CARD_CONFIRM_DETAILS = 'ReplaceCardConfirmDetails',
  CARD_FEATURES = 'CardFeatures',
  VIRTUAL_CARD_SUCCESS = 'VirtualCardSuccess',
  CARD_RENEWAL_SUCCESS = 'CardRenewalSuccess',
  LOCAL_TRANSFER = 'LocalTransfer',
  STATUS_SUCCESS_SCREEN = 'StatusSuccessScreen',
  SEND_MONEY_FORM = 'SendMoneyForm',
  REPLACE_CARD_SUCCESS = 'ReplaceCardSuccess',
  TRANSFER_SUMMARY = 'TransferSummary',
  CREATE_MONEY_REQUEST_SUMMARY = 'CreateMoneyRequestSummary',
  GIFT_TRANSFER_SUMMARY = 'GiftTransferSummary',
  INTERNATIONAL_TRANSFER_HISTORY = 'InternationalTransferHistory',
  BENEFICIARY_TRANSACTION_HISTORY = 'BeneficiaryTransactionHistory',
  GIFT_DETAILS_SCREEN = 'GiftDetailsScreen',
  SEND_GIFT_CARD = 'SendGiftCard',
  SEND_GIFT_PREVIEW = 'SendGiftPreview',
  SEND_GIFT_LIST = 'SendGiftList',
  SEND_GIFT = 'SendGift',
  SEND_GIFT_AMOUNT = 'SendGiftAmount',
  NEW_BENEFICIARY = 'NewBeneficiary',
  ADD_BENEFICIARY_SUCCESS = 'AddBeneficiarySuccess',
  ADD_INTERNATIONAL_BENEFICIARY = 'AddInternationalBeneficiary',
  INTERNATIONAL_BENEFICIARY_TRANSFER_FORM = 'InternationalBeneficiaryTransferForm',
  EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER = 'EditInternationalBeneficiaryTransfer',
  TRANSFER_FAILURE_SCREEN = 'TransferFailureScreen',
  TRANSFER_SUCCESS = 'TransferSuccessScreen',
  TRANSFER_INFORMATION = 'TransferInformation',
  TRANSFER_CONFIRMATION = 'TransferConfirmation',
  PRICE_CALCULATOR = 'PriceCalculator',
  INTERNATIONAL_TRANSFER = 'InternationalTransfer',
  INTERNATIONAL_TRANSFER_INFO = 'InternationalTransferInfo',
  NEW_SADAD_BILL = 'NewSadadBill',
  BILL_PAYMENT_CONFIRMATION = 'BillPaymentConfirmation',
  ADD_NEW_SADAD_BILLS = 'AddNewSadadBills',
  REQUEST_LISTING_SCREEN = 'RequestListingScreen',
  NOTIFICATION_CENTER = 'NotificationCenter',
  MOI_PAYMENT_CONFIRMATION = 'MoiPaymentConfirmationScreen',
  SADAD_BILLS = 'SadadBillsScreen',
  ACTIVATE_BENEFICIARY_SUCCESS = 'ActivateBeneficiarySuccess',
  BILL_PAYMENTS_SCREEN = 'BillPaymentsScreen',
  TRAFFIC_VOILATION = 'TrafficVoilation',
  TRAFFIC_VOILATION_PAYMENT = 'TrafficViolationPayment',
  TRAFFIC_VOILATION_PAYMENT_REFUND = 'TrafficViolationPaymentRefund',
  TRAFFIC_VOILATION_PAYMENT_SUCCESS = 'TrafficViolationPaymentSuccess',
  TRAFFIC_VOILATION_REFUND_SUCCESS = 'TrafficViolationRefundSuccess',
  PAY_BILL_SUCCESS = 'PayBillSuccess',
  OFFERS_LIST = 'OffersList',
  OFFER_DETAILS = 'OfferDetails',
  REQUEST_SUMMARY = 'RequestSummary',
  REQUEST_MONEY = 'RequestMoney',
  MOI_PAYMENT_SCREEN = 'MoiPaymentScreen',
  TRAFFIC_VOILATION_CASES_SCREEN = 'TrafficVoilationCasesScreen',
  MOI_PAYMENT_REFUND = 'MoiPaymentRedund',
  MOI_PAYMENT_SUCCESS = 'MoiPaymentSuccess',
  BILL_PAYMENT_FAILED = 'BillPaymentFailed',
  TRAFFIC_VOILATION_ID = 'TrafficVoilationId',
  TRAFFIC_VOILATION_ID_REFUND = 'TrafficVoilationIdRefund',
  TRAFFIC_VOILATION_NUM_REFUND = 'TrafficVoilationNumRefund',
  INTERNATIONAL_TRANSFER_CONFIRMATION = 'InternationalTransferConfirmation',
  INTERNATIONAL_TRANSFER_SUCCESS = 'InternationalTransferSuccess',
  ALL_ORDERS = 'AllOrders',
  MERCHANTS = 'Merchants',
  SHOP_CATEGORIES = 'ShopCategories',
  CATEGORY_SCREEN = 'CategoryScreen',
  ALL_CATEGORIES_SCREEN = 'AllCategoriesScreen',
  PLAYSTATION = 'PlayStation',
  SADAD_EDIT_BILL_SCREEN = 'SadadEditBillsScreen',
  CARD_MANAGEMENT = 'CardManagement',
  BILL_ACTIVATION = 'BillActivation',
  ADD_CARD = 'AddCard',
  PHYSICAL_CARD_MAIN = 'PhysicalCardMain',
  PRINT_CARD_CONFIRMATION = 'PrintCardConfirmation',
  PRINT_CARD_SUCCESS = 'PrintCardSuccess',
  ISSUE_NEW_CARD_DETAILS = 'IssueNewCardDetails',
  ISSUE_NEW_CARD_CONFIRM_DETAILS = 'IssueNewCardConfirmDetails',
  ISSUE_PHYSICAL_CARD_SUCCESS = 'IssuePhysicalCardSuccessScreen',
  SHOP_DETAILS = 'ShopDetails',
  SHOP_ALL_CATEGORIES = 'SHOP_ALL_CATEGORIES',
  GIFT_TRANSFER_SUCCESS_SCREEN = 'GiftTransferSuccessScreen',
  CHOOSE_BENEFICIARY = 'ChooseBeneficiary',
  SEND_MONEY_REQUEST = 'SendMoneyRequest',
  TERMS_AND_CONDITIONS = 'TermsAndConditions',
  MUSANED = 'Musaned',
  MUSANED_HISTORY = 'MusanedHistory',
  MUSANED_PAY_SALARY = 'MusanedPaySalary',
  MUSANED_USER_DETAILS = 'MusanedUserDetails',
}

export default ScreenNames;
