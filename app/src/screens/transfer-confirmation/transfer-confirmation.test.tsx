import icons from '@app/assets/icons';
import constants from '@app/constants/constants';
import { render, screen } from '@testing-library/react-native';
import TransferConfirmation from './transfer-confirmation.screen';

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary50: '#f0f0f0',
      primary100: '#d0d0d0',
      primary450: '#00ff00',
      primary800: '#007700',
      primary900: '#004400',
    },
    secondary: {
      secondary50: '#e0e0e0',
      secondary100: '#c0c0c0',
    },
    natural: {
      natural500: '#888888',
      natural900: '#444444',
    },
    bottomsheetGradient: ['#fff', '#eee'],
  },
}));

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  COMMON: {
    SAR: 'SAR',
    TRANSFER: 'Transfer',
  },
  LOCAL_TRANSFER: {
    TRANSFER_CONFIRMATION: 'Transfer Confirmation',
    VAT: 'VAT',
    FEES: 'Fees',
    TOTAL_AMOUNT: 'Total Amount',
    THE_AMOUNT_WILL_BE_TRANSFERRED_DURING_OFFICIAL_HOURS: 'The amount will be transferred during official hours',
    VAT_TAX: 'VAT (15%)',
  },
}));

describe('TransferConfirmation', () => {
  beforeAll(() => {
    constants.BENEFICIARY_DETAILS = [
      { title: 'John Doe', subTitle: 'Account Number: 123456789', icon: null },
      { title: 'Jane Smith', subTitle: 'Account Number: 987654321', icon: null },
    ];
    constants.BANK_DETAILS = {
      icon: icons.bank,
      title: 'Bank Title',
      bankName: 'Bank Name',
      accountNumber: 'Account Number',
    };
  });

  it('renders correctly', () => {
    render(<TransferConfirmation />);
    expect(screen.getByText('Transfer Confirmation')).toBeTruthy();
    expect(screen.getByText('Bank Title')).toBeTruthy();
    expect(screen.getByText(' | Bank Name')).toBeTruthy();
    expect(screen.getByText('Account Number')).toBeTruthy();
  });

  it('renders beneficiary details correctly', () => {
    render(<TransferConfirmation />);
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Account Number: 123456789')).toBeTruthy();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
    expect(screen.getByText('Account Number: 987654321')).toBeTruthy();
  });

  it('renders VAT and Fees correctly', () => {
    render(<TransferConfirmation />);
    expect(screen.getByText('VAT (15%)')).toBeTruthy();
    expect(screen.getByText('10 SAR')).toBeTruthy();
    expect(screen.getByText('Fees')).toBeTruthy();
    expect(screen.getByText('10 SAR')).toBeTruthy();
  });

  it('renders total amount and transfer button correctly', () => {
    render(<TransferConfirmation />);
    expect(screen.getByText('Total Amount')).toBeTruthy();
    expect(screen.getByText('3020 SAR')).toBeTruthy();
    expect(screen.getByText('Transfer')).toBeTruthy();
  });

  it('renders transfer information view correctly', () => {
    render(<TransferConfirmation />);
    expect(screen.getByText('The amount will be transferred during official hours')).toBeTruthy();
  });
});
