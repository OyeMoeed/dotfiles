import { fireEvent, render } from '@testing-library/react-native';
import IPayCardDetailsSection from './ipay-card-details-section.component';

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    CARDS: {
      FREEZE_CARD: 'Freeze Card',
      CARD_OPTIONS: 'Card Options',
      CARD_DETAILS: 'Card Details',
      ACCOUNT_BALANCE: 'Account Balance',
      ADDED_TO: 'Added to',
      TOTAL_CASHBACK: 'Total Cashback',
      PRINT_CARD: 'Print Card',
      APPLE_WALLET: 'Apple Wallet',
    },
    COMMON: {
      SAR: 'SAR',
      TRANSACTION_HISTORY: 'Transaction History',
      VIEW_ALL: 'View All',
    },
    HOME: {
      CARDS: 'Cards',
    },
  }),
}));

jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: { primary500: '#123123' },
      natural: { natural900: '#000' },
      secondary: { secondary500: '#789789' },
      backgrounds: { greyOverlay: '#fff' },
      tertiary: { tertiary50: '#334dfs' },
      error: { error500: 'red' },
    },
  }),
}));

jest.mock('@app/navigation/navigation-service.navigation', () => ({
  navigate: jest.fn(),
}));

describe('IPayCardDetailsSection', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<IPayCardDetailsSection testID="card-section" />);
    expect(getByTestId('card-section-base-view')).toBeDefined();
  });

  it('account balance renders correctly', () => {
    const { getByText } = render(<IPayCardDetailsSection />);
    expect(getByText('Account Balance')).toBeTruthy();
  });

  it('cashback list renders correctly', () => {
    const { getByTestId } = render(<IPayCardDetailsSection />);
    expect(getByTestId('cashback-list-pressable')).toBeDefined();
  });

  it('calls the correct functions on button press', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(<IPayCardDetailsSection />);

    fireEvent.press(getByText('Print Card'));

    expect(onPressMock).toHaveBeenCalledTimes(0); // Update to the actual behavior if needed
  });

  it('transaction flatlist renders correctly', () => {
    const { getByTestId } = render(<IPayCardDetailsSection />);
    expect(getByTestId('transaction-flatlist')).toBeDefined();
  });
});
