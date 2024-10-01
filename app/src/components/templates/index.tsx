/**
 * Exports a collection of page-level components for easy import.
 */
import IPayCustomerKnowledge from '@app/components/templates/ipay-customer-knowledge/ipay-customer-knowledge.component';
import IPayNafathVerification from '@components/templates/ipay-nafath-verification/ipay-nafath-verification.component';
import IPayPageWrapper from '@components/templates/ipay-page-wrapper/ipay-page-wrapper.component';
import IPaySafeAreaView from '@components/templates/ipay-safe-area-view/ipay-safe-area-view.component';
import IPayTransactionHistory from '@components/templates/ipay-transaction-history/ipay-transaction-history.component';
import IPayOtpVerification from '@components/templates/otp-verification/ipay-otp-verification.component';
import IPayBillBalance from './ipay-bill-balance/ipay-bill-balance.component';
import IPayCardIssueBottomSheet from './ipay-card-issue-bottomsheet/ipay-card-issue-bottomsheet.component';
import IPayCountryCurrencyBox from './ipay-country-currency-box/ipay-country-currency-box.component';
import IPayExpBottomSheet from './ipay-cvv-bottomsheet/ipay-exp-bottomsheet.component';
import IPayTopUpSelection from './ipay-topup-selection/ipay-topup-selection.component';
import IPayFilterTransactions from './ipay-filter-transactions/ipay-filter-transactions.component';
import IPayCardIssuanceSheet from './ipay-card-issaunce-sheet/ipay-card-issaunce-sheet.component';

export { default as IPayAddCardBottomsheet } from './ipay-addcard-bottomsheet/ipay-addcard-bottomsheet.component';

export {
  IPayBillBalance,
  IPayCardIssueBottomSheet,
  IPayCountryCurrencyBox,
  IPayCustomerKnowledge,
  IPayExpBottomSheet,
  IPayNafathVerification,
  IPayOtpVerification,
  IPayPageWrapper,
  IPaySafeAreaView,
  IPayTopUpSelection,
  IPayTransactionHistory,
  IPayFilterTransactions,
  IPayCardIssuanceSheet,
};
