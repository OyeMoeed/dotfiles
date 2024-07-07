/**
 * Exports a collection of page-level components for easy import.
 */
import IPayCustomerKnowledge from '@app/components/templates/ipay-customer-knowledge/ipay-customer-knowledge.component';
import IPayNafathVerification from '@components/templates/ipay-nafath-verification/ipay-nafath-verification.component';
import IPaySafeAreaView from '@components/templates/ipay-safe-area-view/ipay-safe-area-view.component';
import IPayTransactionHistory from '@components/templates/ipay-transaction-history/ipay-transaction-history.component';
import IPayOtpVerification from '@components/templates/otp-verification/ipay-otp-verification.component';
import IPayAddCardBottomsheet from './ipay-addcard-bottomsheet/ipay-addcard-bottomsheet.component';
import IPayCvvBottomSheet from './ipay-cvv-bottomsheet/ipay-cvv-bottomsheet.components';
import IPayTopUpSelection from './ipay-topup-selection/ipay-topup-selection.component';
import IPayCardIssuanceConfirmation from './ipay-card-issuace-confirmation-details/ipay-card-issuance-confirmation-details.component';

export {
  IPayAddCardBottomsheet,
  IPayCardIssuanceConfirmation,
  IPayCustomerKnowledge,
  IPayCvvBottomSheet,
  IPayNafathVerification,
  IPayOtpVerification,
  IPaySafeAreaView,
  IPayTopUpSelection,
  IPayTransactionHistory
};
