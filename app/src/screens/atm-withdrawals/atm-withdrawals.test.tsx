import { fireEvent, render } from '@testing-library/react-native';
import AtmWithdrawals from './atm-withdrawals.screen';

// Mock dependencies
jest.mock('@app/store/store', () => ({
  useTypedSelector: jest.fn(),
}));

jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  ATM_Withdrawals: 'ATM Withdrawals',
  accountBalance: 'Account Balance',
  remainingAmount: 'Remaining Amount',
  of: 'of',
  sar: 'SAR',
}));

jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#000000',
    },
    appGradient: {
      gradientSecondary40: ['#FFFFFF', '#000000'],
    },
    gradientSecondary: ['#AAAAAA', '#CCCCCC'],
  },
}));

jest.mock('@app/utilities/numberComma-helper.util', () => ({
  formatNumberWithCommas: jest.fn((value) => (typeof value === 'number' ? value.toLocaleString() : '*****')),
}));

describe('AtmWithdrawals Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('renders header with correct title', () => {
    const { getByText } = render(<AtmWithdrawals />);
    expect(getByText('ATM Withdrawals')).toBeTruthy();
  });

  it('renders account balance section correctly', () => {
    const mockWalletInfo = {
      availableBalance: 1000,
      limitsDetails: {
        monthlyRemainingOutgoingAmount: 500,
      },
      currentBalance: 2000,
    };

    jest.mock('@app/store/store', () => ({
      useTypedSelector: jest.fn().mockReturnValue({ walletInfo: mockWalletInfo }),
    }));

    const { getByText } = render(<AtmWithdrawals />);
    expect(getByText('Account Balance')).toBeTruthy();
    expect(getByText('1,000')).toBeTruthy(); // Assuming `1000` formatted as `1,000`
    expect(getByText('SAR')).toBeTruthy();
  });

  it('renders top-up button with correct text', () => {
    const { getByText } = render(<AtmWithdrawals />);
    expect(getByText('Top Up')).toBeTruthy();
  });

  it('fires onPress event for top-up button', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<AtmWithdrawals />);
    const topUpButton = getByText('Top Up');
    fireEvent.press(topUpButton);
    // Add assertions for what should happen after pressing the button
  });

  it('renders progress bar', () => {
    const { getByTestId } = render(<AtmWithdrawals />);
    expect(getByTestId('ipay-progress-bar')).toBeTruthy();
    // Add assertions for checking the progress bar appearance and width
  });

  it('renders remaining amount section', () => {
    const mockWalletInfo = {
      availableBalance: 1000,
      limitsDetails: {
        monthlyRemainingOutgoingAmount: 500,
      },
      currentBalance: 2000,
    };

    jest.mock('@app/store/store', () => ({
      useTypedSelector: jest.fn().mockReturnValue({ walletInfo: mockWalletInfo }),
    }));

    const { getByText } = render(<AtmWithdrawals />);
    expect(getByText('Remaining Amount')).toBeTruthy();
    expect(getByText('500')).toBeTruthy(); // Assuming `500` formatted as `500`
    expect(getByText('of')).toBeTruthy();
    expect(getByText('2,000')).toBeTruthy(); // Assuming `2000` formatted as `2,000`
  });

  it('renders QR scan button in remaining account balance component', () => {
    const { getByTestId } = render(<AtmWithdrawals />);
    expect(getByTestId('remaining-account-balance-qr-scan-btn')).toBeTruthy();
  });

  it('renders IPayNearestAtmComponent', () => {
    const { getByTestId } = render(<AtmWithdrawals />);
    expect(getByTestId('nearest-atm-nearest-atm')).toBeTruthy();
  });
});
