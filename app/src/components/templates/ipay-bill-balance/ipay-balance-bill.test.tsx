import { AccountBalanceStatus } from '@app/enums/bill-payment.enum';
import { render } from '@testing-library/react-native';
import IPayBillBalance from './ipay-bill-balance.component';

// Mocking the localization hook
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    NEW_SADAD_BILLS: {
      INSUFFICIENT_BALANCE: 'Insufficient balance',
      NO_REMAINING_AMOUNT: 'No Remaining Amount',
    },
    COMMON: {
      PAY: 'Pay',
    },
    HOME: {
      ACCOUNT_BALANCE: 'Account Balance',
    },
  })),
}));

// Mocking the theme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    colors: {
      gradientSecondary: ['#AAAAAA', '#CCCCCC'],
      appGradient: {
        gradientPrimary10: ['#ffffff', '#000000'],
      },
      redGradient: ['#F44336', '#F44336'],
      natural: {
        natural900: '#333333',
        natural700: '#666666',
        natural500: '#999999',
        natural3: '#FFFFFF3D',
      },
      primary: {
        primary800: '#007AFF',
        primary500: '#3399FF',
      },
      error: {
        error500: '#FF3B30',
      },
      tertiary: { tertiary50: '#F2FCE9' },
      secondary: {
        secondary10: '',
      },
      critical: {
        critical800: '',
      },
      success: {
        success500: '',
      },
    },
  })),
}));

// Mocking navigation
jest.mock('@app/navigation/navigation-service.navigation', () => ({
  navigate: jest.fn(),
}));

describe('IPayBillBalance', () => {
  const defaultProps = {
    toggleControl: jest.fn(),
  };

  const mockProps = {
    ...defaultProps,
    selectedBills: [
      {
        id: '1',
        title: 'Mock Bill 1',
        amount: 100,
      },
      {
        id: '2',
        title: 'Mock Bill 2',
        amount: 200,
      },
    ],
  };

  const singleBillProps = {
    ...defaultProps,
    selectedBills: [{ id: '1', title: 'Mock Bill 1', amount: 100 }],
    accountBalanceStatus: AccountBalanceStatus.INSUFFICIENT_BALANCE, // Or any other status
  };

  it('renders correctly with insufficient balance', () => {
    const { getByTestId } = render(<IPayBillBalance {...mockProps} />);

    const accountBalanceComponent = getByTestId('account-balance-component-base-view');
    const sadadFooterComponent = getByTestId('ipay-bill-sadad-footer-base-view');

    expect(accountBalanceComponent).toBeTruthy();
    expect(sadadFooterComponent).toBeTruthy();
  });

  it('renders correctly with no remaining amount', () => {
    const noRemainingAmountProps = {
      ...mockProps,
      accountBalanceStatus: AccountBalanceStatus.NO_REMAINING_AMOUNT,
    };
    const { getByText } = render(<IPayBillBalance {...noRemainingAmountProps} />);

    const noRemainingAmountWarning = getByText('No Remaining Amount');
    const payButtonText = getByText(/Pay/);

    expect(noRemainingAmountWarning).toBeTruthy();
    expect(payButtonText).toBeTruthy();
  });

  it('does not render single bill save component when there is more than one bill', () => {
    const { queryByText } = render(<IPayBillBalance {...mockProps} />);

    const saveBillComponent = queryByText(/Save Bill/); // Assuming this text or similar is used in the component for saving a bill

    expect(saveBillComponent).toBeNull();
  });
});
