import { IPaySafeAreaView } from '@app/components/templates';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import ATMWithdrawQRCodeScannerScreen from '@app/screens/atm-withdraw-qrcode-scanner/atm-withdraw-qrcode-scanner.screen';
import AtmWithdrawSuccessful from '@app/screens/atm-withdraw-successful/atm-withdraw-successful.screen';
import AtmWithdrawals from '@app/screens/atm-withdrawals/atm-withdrawals.screen';
import ResetSuccessful from '@app/screens/auth/reset-success/reset-success.screen';
import CardFeatures from '@app/screens/card-features/card-features.screen';
import CardVerification from '@app/screens/cardVerification/cardVerification.screen';
import ChangePinSuccess from '@app/screens/change-pin-success/change-pin-success.screen';
import DelinkSuccess from '@app/screens/delink/delink-success';
import HelpCenter from '@app/screens/help-center/helpcenter.screen';
import IdentitySuccessMessage from '@app/screens/identity-success-message/identity-success-message.screen';
import NearestAtmScreen from '@app/screens/nearest-atm/nearest-atm.screen';
import PointsRedemptionConfirmation from '@app/screens/points-redemptions-confirmation/points-redemptions-confirmation.screen';
import PointsRedemptionsScreen from '@app/screens/points-redemptions/points-redemptions.screen';
import Profile from '@app/screens/profile/profile.screen';
import SendMoneyQRScannerScreen from '@app/screens/send-money-qrcode-scanner/send-money-qrcode-scanner.screen';
import Settings from '@app/screens/settings/settings.screen';
import TopUpIBAN from '@app/screens/topup-iban/topup-iban.screen';
import TopUpRedemptionSuccess from '@app/screens/topup-redemption-success/topup-redemption-success.screen';
import TopUpSuccess from '@app/screens/topup-success/topup-success.screen';
import TopUp from '@app/screens/Topup/topup.screen';
import TransactionHistoryScreen from '@app/screens/transaction-history/transaction-history.screen';

import AddBeneficiarySuccessScreen from '@app/screens/add-beneficiary-success-message/add-beneficiary-success-message.screen';
import AddNewSadadBillScreen from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.screen';
import BeneficiaryTransactionHistoryScreen from '@app/screens/beneficiary-transaction-history/beneficiary-transaction-history';
import BillPaymentConfirmationScreen from '@app/screens/bill-payment-confirmation/bill-payment-confirmation.screen';
import BillPaymentsScreen from '@app/screens/bill-payments/bill-payments.screen';
import CardIssuanceConfirmationScreen from '@app/screens/card-issuace-confirmation-details/Card-issuance-confirmation-details.screen';
import CardOptionsScreen from '@app/screens/card-options/card-options.screen';
import CardRenewalSuccess from '@app/screens/card-renewal-success/card-renewal-success.screen';
import CardRenewal from '@app/screens/card-renewal/card-renewal.screen';
import GiftDetailsScreen from '@app/screens/gift-details/gift-details.screen';
import InternationalTransferHistory from '@app/screens/international-transfer-history/international-transfer-history.screen';
import InternationalTransferInfoScreen from '@app/screens/international-transfer-info/international-transfer-info.screen';
import InternationalTransferScreen from '@app/screens/international-transfer/international-transfer.screen';
import LocalTransferScreen from '@app/screens/local-transfer/local-transfer.screen';
import MoiPaymentConfirmationScreen from '@app/screens/moi-payments/moi-payment-confirmation-screen/moi-payment-confirmation.screen';
import MoneyRequestSummaryScreen from '@app/screens/money-request-summary/money-request-summary.screen';
import NewBeneficiaryScreen from '@app/screens/new-beneficiary/new-beneficiary.screen';
import NewSadadBillScreen from '@app/screens/new-sadad-bill/new-sadad-bill.screen';
import OfferDetails from '@app/screens/offer-details/offer-details.screen';
import OffersList from '@app/screens/offers-list/offers-list.screen';
import PriceCalculatorScreen from '@app/screens/price-calculator/price-calculator.screen';
import ReplaceCardChooseAddress from '@app/screens/replace-card-choose-address/replace-card-choose-address.screen';
import ReplaceCardConfirmDetails from '@app/screens/replace-card-confirm-details/replace-card-confirm-details.screen';
import ReplaceCardSuccess from '@app/screens/replace-card-success/replace-card-success.screen';
import RequestMoneyTransactionScreen from '@app/screens/request-money-transaction/request-money-transaction.screen';
import SadadBillsScreen from '@app/screens/sadad-bills/sadad-bills.screen';
import SendGiftAmountScreen from '@app/screens/send-gift-amount/send-gift-amount.screen';
import SendGiftCard from '@app/screens/send-gift-card/send-gift-card.screen';
import SendGiftListScreen from '@app/screens/send-gift-list/send-gift-list.screen';
import SendGiftPreview from '@app/screens/send-gift-preview/send-gift-preview.screen';
import SendGiftScreen from '@app/screens/send-gift/send-gift.screen';
import SendMoneyFormScreen from '@app/screens/send-money-form/send-money-form.screen';
import TrafficViolationPaymentScreen from '@app/screens/traffic-violation-payment/traffic-violation-payment.screen';
import TrafficViolationSuccessScreen from '@app/screens/traffic-violation-success/traffic-violation-success.screen';
import TrafficViolationScreen from '@app/screens/traffic-violation/traffic-violation.screen';
import TransferFailureScreen from '@app/screens/tranfer-failure/transfer-failure.screen';
import TransferConfirmation from '@app/screens/transfer-confirmation/transfer-confirmation.screen';
import TransferInformation from '@app/screens/transfer-information/transfer-information.screen';
import TransferSuccessScreen from '@app/screens/transfer-success/transfer-success.screen';
import GiftTransferSummaryScreen from '@app/screens/transfer-summary/gift-transfer-summary/gift-transfer-summary.screen';
import TransferSummaryScreen from '@app/screens/transfer-summary/transfer-summary.screen';
import VirtualCardSuccessScreen from '@app/screens/virtual-card-success/virtual-card-success.screen';
import VirtualCardScreen from '@app/screens/virtual-card/virtual-card.screen';
import WalletToWalletTransferScreen from '@app/screens/wallet-to-wallet-transfer/wallet-to-wallet-transfer.screen';

import TabNavigation from '@app/navigation/tab-navigation';
import ActivateBeneficiarySuccessScreen from '@app/screens/activate-beneficiary-success/activate-beneficiary-success.screen';
import AddCardScreen from '@app/screens/add-card/add-card.screen';
import AddInternationalBeneficiary from '@app/screens/add-international-beneficiary/add-international-beneficiary.screen';
import AllCategoriesScreen from '@app/screens/all-categories.screen/all-categories.screen';
import AppTermsAndConditions from '@app/screens/app-terms-and-conditions/AppTermsAndConditions.screen';
import BillActivationScreen from '@app/screens/bill-activation/bill-activation.screen';
import PayBillScreen from '@app/screens/bill-pay-success/bill-pay-success.screen';
import BillPaymentFailedScreen from '@app/screens/bill-payment-failed/bill-payment-failed.screen';
import CardManagementScreen from '@app/screens/card-management/card-management.screen';
import CategoryScreen from '@app/screens/category-screen/category.screen';
import ChooseBeneficiaryScreen from '@app/screens/choose-beneficiary/choose-beneficiary.screen';
import CreateMoneyRequestSummaryScreen from '@app/screens/create-money-request-summary/create-money-request-summary.screen';
import EditIBeneficiaryTransferScreen from '@app/screens/edit-international-beneficiary-transfer/edit-international-beneficiary-transfer.screen';
import InternationalTransferConfirmation from '@app/screens/internation-transfer/internationl-transfer-confirmation/internationl-transfer-confirmation.screen';
import IBeneficiaryTransferScreen from '@app/screens/international-beneficiary-transfer-form/international-beneficiary-transfer-form.screen';
import InternationalTransferSuccessScreen from '@app/screens/international-transfer-success/international-transfer-success.screen';
import IssueNewCardConfirmDetailsScreen from '@app/screens/issue-new-card-confirm-details/issue-new-card-confirm-details.screen';
import IssueNewCardDetailsScreen from '@app/screens/issue-new-card-details/issue-new-card-details.screen';
import IssuePhysicalCardSuccessScreen from '@app/screens/issue-physical-card-success/issue-physical-card-success.screen';
import MerchantScreen from '@app/screens/merchant/merchant.screen';
import MoiPaymentRedund from '@app/screens/moi-payments/moi-payment-refund-screen/moi-payment-refund.screen';
import MoiPaymentScreen from '@app/screens/moi-payments/moi-payment-screen/moi-payment.screen';
import MoiPaymentSuccess from '@app/screens/moi-payments/moi-payment-success-screen/moi-payment-success.screen';
import NotificationCenterScreen from '@app/screens/notification-center/notification-center.screen';
import AllOrdersScreen from '@app/screens/order-history/order-history.screen';
import PhysicalCardMainScreen from '@app/screens/physical-card-main/physical-card-main.screen';
import PrintCardConfirmationScreen from '@app/screens/print-card-confirmation/print-card-confirmation.screen';
import PrintCardSuccessScreen from '@app/screens/print-card-success/print-card-success.screen';
import RequestListScreen from '@app/screens/request-list/request-list.screen';
import SadadEditBillsScreen from '@app/screens/sadad-edit-bill/sadad-edit-bill.screen';
import SendMoneyRequest from '@app/screens/send-money-request/send-money-request.screen';
import ShopCategoriesScreen from '@app/screens/shop-categories/shop-categories.screen';
import ShopDetails from '@app/screens/shop-details/shop-details.screen';
import TrafficViolationPaymentRefundScreen from '@app/screens/traffic-violation-payment-refund/traffic-violation-payment-refund.screen';
import TrafficViolationRefundSuccessScreen from '@app/screens/traffic-violation-refund-success/traffic-violation-refund-success.screen';
import TrafficVoilationIDRefundScreen from '@app/screens/traffic-voilation-refund/traffic-violation-id-refund/traffic-violation-id-refund.screen';
import TrafficViolationNumPaymentScreen from '@app/screens/traffic-voilation-refund/traffic-violation-num-payment/traffic-violation-num-payment.screen';
import TrafficViolationIDScreen from '@app/screens/traffic-voilation/traffic-violation-Id/traffic-violation-Id.screen';
import TrafficVoilationCasesScreen from '@app/screens/traffic-voilation/traffic-voilation-case/traffic-voilation-case.screen';
import GiftTransferSuccessScreen from '@app/screens/transfer-summary/gift-transfer-summary/gift-transfer-success.screen';
import W2WTransferSuccessScreen from '@app/screens/w2w-transfer-success/w2w-transfer-success.screen';
import Wallet from '@app/screens/wallet/wallet.screen';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { IPayRatingSheet } from '@app/components/organism';
import { IPayDisabledModulesSheet } from '@app/components/molecules';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTopLevelNavigator(navigation);
  }, []);

  return (
    <IPaySafeAreaView>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name={screenNames.HOME_BASE} options={{ headerShown: false }} component={TabNavigation} />
        <MainStack.Group screenOptions={{ presentation: 'card', headerMode: 'float', animationTypeForReplace: 'push' }}>
          <MainStack.Screen name={screenNames.WALLET} component={Wallet} />
          <MainStack.Screen name={screenNames.TOP_UP} component={TopUp} />
          <MainStack.Screen name={screenNames.TOP_UP_SUCCESS} component={TopUpSuccess} />
          <MainStack.Screen name={screenNames.W2W_TRANSFER_SUCCESS} component={W2WTransferSuccessScreen} />
          <MainStack.Screen name={screenNames.GIFT_TRANSFER_SUCCESS_SCREEN} component={GiftTransferSuccessScreen} />
          <MainStack.Screen name={screenNames.CARD_VERIFICATION} component={CardVerification} />
          <MainStack.Screen name={screenNames.PROFILE} component={Profile} />
          <MainStack.Screen name={screenNames.ATM_WITHDRAW_QRCODE_SCANNER} component={ATMWithdrawQRCodeScannerScreen} />
          <MainStack.Screen name={screenNames.POINTS_REDEMPTIONS} component={PointsRedemptionsScreen} />
          <MainStack.Screen name={screenNames.WALLET_TRANSFER} component={WalletToWalletTransferScreen} />
          <MainStack.Screen name={screenNames.CARD_ISSUE_CONFIRMATION} component={CardIssuanceConfirmationScreen} />
          <MainStack.Screen name={screenNames.SEND_MONEY_FORM} component={SendMoneyFormScreen} />
          <MainStack.Screen
            name={screenNames.POINTS_REDEMPTIONS_CONFIRMATION}
            component={PointsRedemptionConfirmation}
          />
          <MainStack.Screen
            name={screenNames.POINTS_REDEMPTIONS_SUCCESS_AND_FAILED}
            component={TopUpRedemptionSuccess}
          />
          <MainStack.Screen
            name={screenNames.RESET_SUCCESSFUL}
            options={{ headerShown: false }}
            component={ResetSuccessful}
          />
          <MainStack.Screen name={screenNames.SETTINGS} options={{ headerShown: false }} component={Settings} />
          <MainStack.Screen name={screenNames.IDENTITY_SUCCESSFUL} component={IdentitySuccessMessage} />
          <MainStack.Screen name={screenNames.TRANSACTIONS_HISTORY} component={TransactionHistoryScreen} />
          <MainStack.Screen name={screenNames.DELINK_SUCCESS} component={DelinkSuccess} />
          <MainStack.Screen name={screenNames.TOP_UP_IBAN} component={TopUpIBAN} />
          <MainStack.Screen name={screenNames.HELP_CENTER} component={HelpCenter} />
          <MainStack.Screen name={screenNames.TRANSFER_SUMMARY} component={TransferSummaryScreen} />
          <MainStack.Screen name={screenNames.GIFT_TRANSFER_SUMMARY} component={GiftTransferSummaryScreen} />
          <MainStack.Screen name={screenNames.SEND_MONEY_QRCODE_SCANNER} component={SendMoneyQRScannerScreen} />
          <MainStack.Screen name={screenNames.NEAREST_ATM} component={NearestAtmScreen} />
          <MainStack.Screen name={screenNames.ATM_WITHDRAWALS} component={AtmWithdrawals} />
          <MainStack.Screen name={screenNames.ATM_WITHDRAW_SUCCESSFUL} component={AtmWithdrawSuccessful} />
          <MainStack.Screen name={screenNames.CARD_OPTIONS} component={CardOptionsScreen} />
          <MainStack.Screen name={screenNames.CHANGE_PIN_SUCCESS} component={ChangePinSuccess} />
          <MainStack.Screen name={screenNames.CARD_RENEWAL} component={CardRenewal} />
          <MainStack.Screen name={screenNames.VIRTUAL_CARD} component={VirtualCardScreen} />
          <MainStack.Screen name={screenNames.CARD_FEATURES} component={CardFeatures} />
          <MainStack.Screen name={screenNames.VIRTUAL_CARD_SUCCESS} component={VirtualCardSuccessScreen} />
          <MainStack.Screen name={screenNames.LOCAL_TRANSFER} component={LocalTransferScreen} />
          <MainStack.Screen name={screenNames.NEW_BENEFICIARY} component={NewBeneficiaryScreen} />
          <MainStack.Screen name={screenNames.ADD_BENEFICIARY_SUCCESS} component={AddBeneficiarySuccessScreen} />
          <MainStack.Screen name={screenNames.REPLACE_CARD_CHOOSE_ADDRESS} component={ReplaceCardChooseAddress} />
          <MainStack.Screen name={screenNames.REPLACE_CARD_SUCCESS} component={ReplaceCardSuccess} />
          <MainStack.Screen name={screenNames.REPLACE_CARD_CONFIRM_DETAILS} component={ReplaceCardConfirmDetails} />
          <MainStack.Screen name={screenNames.CARD_RENEWAL_SUCCESS} component={CardRenewalSuccess} />
          <MainStack.Screen
            name={screenNames.EDIT_INTERNATIONAL_BENEFICIARY_TRANSFER}
            component={EditIBeneficiaryTransferScreen}
          />

          <MainStack.Screen name={screenNames.CHOOSE_BENEFICIARY} component={ChooseBeneficiaryScreen} />

          <MainStack.Screen
            name={screenNames.INTERNATIONAL_TRANSFER_HISTORY}
            component={InternationalTransferHistory}
          />
          <MainStack.Screen
            name={screenNames.BENEFICIARY_TRANSACTION_HISTORY}
            component={BeneficiaryTransactionHistoryScreen}
          />
          <MainStack.Screen name={screenNames.ADD_INTERNATIONAL_BENEFICIARY} component={AddInternationalBeneficiary} />
          <MainStack.Screen
            name={screenNames.INTERNATIONAL_BENEFICIARY_TRANSFER_FORM}
            component={IBeneficiaryTransferScreen}
          />
          <MainStack.Screen name={screenNames.TRANSFER_FAILURE_SCREEN} component={TransferFailureScreen} />
          <MainStack.Screen name={screenNames.TRANSFER_SUCCESS} component={TransferSuccessScreen} />
          <MainStack.Screen name={screenNames.TRANSFER_INFORMATION} component={TransferInformation} />
          <MainStack.Screen name={screenNames.TRANSFER_CONFIRMATION} component={TransferConfirmation} />
          <MainStack.Screen name={screenNames.PRICE_CALCULATOR} component={PriceCalculatorScreen} />
          <MainStack.Screen name={screenNames.INTERNATIONAL_TRANSFER} component={InternationalTransferScreen} />
          <MainStack.Screen
            name={screenNames.INTERNATIONAL_TRANSFER_INFO}
            component={InternationalTransferInfoScreen}
          />
          <MainStack.Screen name={screenNames.SADAD_BILLS} component={SadadBillsScreen} />
          <MainStack.Screen name={screenNames.TRAFFIC_VOILATION} component={TrafficViolationScreen} />
          <MainStack.Screen name={screenNames.TRAFFIC_VOILATION_PAYMENT} component={TrafficViolationPaymentScreen} />
          <MainStack.Screen
            name={screenNames.TRAFFIC_VOILATION_PAYMENT_SUCCESS}
            component={TrafficViolationSuccessScreen}
          />
          <MainStack.Screen name={screenNames.TRAFFIC_VOILATION_ID} component={TrafficViolationIDScreen} />
          <MainStack.Screen name={screenNames.TRAFFIC_VOILATION_ID_REFUND} component={TrafficVoilationIDRefundScreen} />
          <MainStack.Screen
            name={screenNames.TRAFFIC_VOILATION_NUM_REFUND}
            component={TrafficViolationNumPaymentScreen}
          />
          <MainStack.Screen name={screenNames.TRAFFIC_VOILATION_CASES_SCREEN} component={TrafficVoilationCasesScreen} />
          <MainStack.Screen name={screenNames.PAY_BILL_SUCCESS} component={PayBillScreen} />
          <MainStack.Screen name={screenNames.GIFT_DETAILS_SCREEN} component={GiftDetailsScreen} />
          <MainStack.Screen name={screenNames.SEND_GIFT_CARD} component={SendGiftCard} />
          <MainStack.Screen name={screenNames.SEND_GIFT_PREVIEW} component={SendGiftPreview} />
          <MainStack.Screen name={screenNames.SEND_GIFT_LIST} component={SendGiftListScreen} />
          <MainStack.Screen name={screenNames.SEND_GIFT} component={SendGiftScreen} />
          <MainStack.Screen name={screenNames.SEND_GIFT_AMOUNT} component={SendGiftAmountScreen} />
          <MainStack.Screen name={screenNames.NEW_SADAD_BILL} component={NewSadadBillScreen} />
          <MainStack.Screen name={screenNames.BILL_PAYMENTS_SCREEN} component={BillPaymentsScreen} />
          <MainStack.Screen
            name={screenNames.ACTIVATE_BENEFICIARY_SUCCESS}
            component={ActivateBeneficiarySuccessScreen}
          />
          <MainStack.Screen name={screenNames.BILL_ACTIVATION} component={BillActivationScreen} />
          <MainStack.Screen name={screenNames.BILL_PAYMENT_CONFIRMATION} component={BillPaymentConfirmationScreen} />
          <MainStack.Screen name={screenNames.ADD_NEW_SADAD_BILLS} component={AddNewSadadBillScreen} />
          <MainStack.Screen name={screenNames.NOTIFICATION_CENTER} component={NotificationCenterScreen} />
          <MainStack.Screen name={screenNames.REQUEST_LISTING_SCREEN} component={RequestListScreen} />
          <MainStack.Screen name={screenNames.MOI_PAYMENT_CONFIRMATION} component={MoiPaymentConfirmationScreen} />
          <MainStack.Screen name={screenNames.OFFERS_LIST} component={OffersList} />
          <MainStack.Screen name={screenNames.OFFER_DETAILS} component={OfferDetails} />
          <MainStack.Screen name={screenNames.REQUEST_SUMMARY} component={MoneyRequestSummaryScreen} />
          <MainStack.Screen name={screenNames.REQUEST_MONEY} component={RequestMoneyTransactionScreen} />
          <MainStack.Screen name={screenNames.MOI_PAYMENT_SCREEN} component={MoiPaymentScreen} />
          <MainStack.Screen name={screenNames.MOI_PAYMENT_REFUND} component={MoiPaymentRedund} />
          <MainStack.Screen name={screenNames.MOI_PAYMENT_SUCCESS} component={MoiPaymentSuccess} />
          <MainStack.Screen name={screenNames.BILL_PAYMENT_FAILED} component={BillPaymentFailedScreen} />
          <MainStack.Screen
            name={screenNames.INTERNATIONAL_TRANSFER_CONFIRMATION}
            component={InternationalTransferConfirmation}
          />
          <MainStack.Screen
            name={screenNames.INTERNATIONAL_TRANSFER_SUCCESS}
            component={InternationalTransferSuccessScreen}
          />
          <MainStack.Screen name={screenNames.MERCHANTS} component={MerchantScreen} />
          <MainStack.Screen name={screenNames.SHOP_CATEGORIES} component={ShopCategoriesScreen} />
          <MainStack.Screen name={screenNames.CATEGORY_SCREEN} component={CategoryScreen} />
          <MainStack.Screen name={screenNames.ALL_CATEGORIES_SCREEN} component={AllCategoriesScreen} />
          <MainStack.Screen name={screenNames.SHOP_ALL_CATEGORIES} component={AllCategoriesScreen} />
          <MainStack.Screen name={screenNames.ALL_ORDERS} component={AllOrdersScreen} />
          <MainStack.Screen
            name={screenNames.TRAFFIC_VOILATION_PAYMENT_REFUND}
            component={TrafficViolationPaymentRefundScreen}
          />
          <MainStack.Screen
            name={screenNames.TRAFFIC_VOILATION_REFUND_SUCCESS}
            component={TrafficViolationRefundSuccessScreen}
          />
          <MainStack.Screen name={screenNames.SADAD_EDIT_BILL_SCREEN} component={SadadEditBillsScreen} />
          <MainStack.Screen name={screenNames.CARD_MANAGEMENT} component={CardManagementScreen} />
          <MainStack.Screen name={screenNames.ADD_CARD} component={AddCardScreen} />
          <MainStack.Screen name={screenNames.PHYSICAL_CARD_MAIN} component={PhysicalCardMainScreen} />
          <MainStack.Screen name={screenNames.PRINT_CARD_CONFIRMATION} component={PrintCardConfirmationScreen} />
          <MainStack.Screen name={screenNames.PRINT_CARD_SUCCESS} component={PrintCardSuccessScreen} />
          <MainStack.Screen name={screenNames.ISSUE_NEW_CARD_DETAILS} component={IssueNewCardDetailsScreen} />
          <MainStack.Screen
            name={screenNames.ISSUE_NEW_CARD_CONFIRM_DETAILS}
            component={IssueNewCardConfirmDetailsScreen}
          />
          <MainStack.Screen name={screenNames.ISSUE_PHYSICAL_CARD_SUCCESS} component={IssuePhysicalCardSuccessScreen} />
          <MainStack.Screen name={screenNames.SHOP_DETAILS} component={ShopDetails} />
          <MainStack.Screen name={screenNames.SEND_MONEY_REQUEST} component={SendMoneyRequest} />
          <MainStack.Screen
            name={screenNames.CREATE_MONEY_REQUEST_SUMMARY}
            component={CreateMoneyRequestSummaryScreen}
          />
          <MainStack.Screen name={screenNames.TERMS_AND_CONDITIONS} component={AppTermsAndConditions} />
        </MainStack.Group>
      </MainStack.Navigator>
      <IPayRatingSheet />
      <IPayDisabledModulesSheet />
    </IPaySafeAreaView>
  );
};

export default MainStackNavigator;
