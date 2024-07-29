import { IPaySafeAreaView } from '@app/components/templates';
import { setTopLevelNavigator } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import TopUp from '@app/screens/Topup/topup.screen';
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
import TransactionHistoryScreen from '@app/screens/transaction-history/transaction-history.screen';

import AddBeneficiarySuccessScreen from '@app/screens/add-beneficiary-success-message/add-beneficiary-success-message.screen';
import ATMWithdrawQRCodeScannerScreen from '@app/screens/atm-withdraw-qrcode-scanner/atm-withdraw-qrcode-scanner.screen';
import CardIssuanceConfirmationScreen from '@app/screens/card-issuace-confirmation-details/Card-issuance-confirmation-details.screen';
import CardOptionsScreen from '@app/screens/card-options/card-options.screen';
import CardRenewalSuccess from '@app/screens/card-renewal-success/card-renewal-success.screen';
import CardRenewal from '@app/screens/card-renewal/card-renewal.screen';
import LocalTransferScreen from '@app/screens/local-transfer/local-transfer.screen';
import NewBeneficiaryScreen from '@app/screens/new-beneficiary/new-beneficiary.screen';
import ReplaceCardChooseAddress from '@app/screens/replace-card-choose-address/replace-card-choose-address.screen';
import ReplaceCardConfirmDetails from '@app/screens/replace-card-confirm-details/replace-card-confirm-details.screen';
import ReplaceCardSuccess from '@app/screens/replace-card-success/replace-card-success.screen';
import SadadBills from '@app/screens/sadad-bills/sadad-bills.screen';
import SendGiftScreen from '@app/screens/send-gift/send-gift.screen';
import SendMoneyFormScreen from '@app/screens/send-money-form/send-money-form.screen';
import TransferFailureScreen from '@app/screens/tranfer-failure/transfer-failure.screen';
import TransferConfirmation from '@app/screens/transfer-confirmation/transfer-confirmation.screen';
import TransferInformation from '@app/screens/transfer-information/transfer-information.screen';
import TransferSuccessScreen from '@app/screens/transfer-success/transfer-success.screen';
import TransferSummaryScreen from '@app/screens/transfer-summary/transfer-summary.screen';
import VirtualCardSuccessScreen from '@app/screens/virtual-card-success/virtual-card-success.screen';
import VirtualCardScreen from '@app/screens/virtual-card/virtual-card.screen';
import WalletToWalletTransferScreen from '@app/screens/wallet-to-wallet-transfer/wallet-to-wallet-transfer.screen';

import AddNewSadadBillScreen from '@app/screens/add-new-sadad-bill/add-new-sadad-bill.screen';
import BillPaymentConfirmationScreen from '@app/screens/bill-payment-confirmation/bill-payment-confirmation.screen';

import SendGiftCard from '@app/screens/send-gift-card/send-gift-card.screen';
import SendGiftListScreen from '@app/screens/send-gift-list/send-gift-list.screen';
import SendGiftPreview from '@app/screens/send-gift-preview/send-gift-preview.screen';
import TrafficViolationPaymentSuccessScreen from '@app/screens/traffic-payment-violation-success/traffic-payment-violation-success.screen';
import TrafficViolationPaymentScreen from '@app/screens/traffic-violation-payment/traffic-violation-payment.screen';
import TrafficViolationScreen from '@app/screens/traffic-violation/traffic-violation.screen';
import Wallet from '@app/screens/wallet/wallet.screen';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import TabNavigation from '../../tab-navigation';

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
          <MainStack.Screen name={screenNames.TRANSFER_FAILURE_SCREEN} component={TransferFailureScreen} />
          <MainStack.Screen name={screenNames.TRANSFER_SUCCESS} component={TransferSuccessScreen} />
          <MainStack.Screen name={screenNames.TRANSFER_INFORMATION} component={TransferInformation} />
          <MainStack.Screen name={screenNames.TRANSFER_CONFIRMATION} component={TransferConfirmation} />
          <MainStack.Screen name={screenNames.SADAD_BILLS} component={SadadBills} />
          <MainStack.Screen name={screenNames.TRAFFIC_VOILATION} component={TrafficViolationScreen} />
          <MainStack.Screen name={screenNames.TRAFFIC_VOILATION_PAYMENT} component={TrafficViolationPaymentScreen} />
          <MainStack.Screen
            name={screenNames.TRAFFIC_VOILATION_PAYMENT_SUCCESS}
            component={TrafficViolationPaymentSuccessScreen}
          />
          <MainStack.Screen name={screenNames.SEND_GIFT_CARD} component={SendGiftCard} />
          <MainStack.Screen name={screenNames.SEND_GIFT_PREVIEW} component={SendGiftPreview} />
          <MainStack.Screen name={screenNames.SEND_GIFT_LIST} component={SendGiftListScreen} />
          <MainStack.Screen name={screenNames.SEND_GIFT} component={SendGiftScreen} />
          <MainStack.Screen name={screenNames.BILL_PAYMENT_CONFIRMATION} component={BillPaymentConfirmationScreen} />
          <MainStack.Screen name={screenNames.ADD_NEW_SADAD_BILLS} component={AddNewSadadBillScreen} />
        </MainStack.Group>
      </MainStack.Navigator>
    </IPaySafeAreaView>
  );
};

export default MainStackNavigator;
