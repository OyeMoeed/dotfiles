import { fireEvent, render } from '@testing-library/react-native';
import NewSadadBillScreen from './new-sadad-bill.screen';

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    NEW_SADAD_BILLS: {
      NEW_SADAD_BILLS: 'New Sadad Bills',
    },
    COMMON: { SAR: 'SAR' },
    TOP_UP: {
      PAY: 'Pay',
    },
    HOME: { ACCOUNT_BALANCE: 'balance' },
    LOCAL_TRANSFER: { TOTAL_AMOUNT: 'total amount' },
  })),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    colors: {
      background: 'white',
      primary: { primary900: 'blue', primary800: '#555' },
      natural: { natural700: '#fff', natural1000: '#ffff' },
      secondary: { secondary100: '#ddd' },
      error: { error500: 'red' },
      tertiary: { tertiary50: '#eee' },
      appGradient: { gradientPrimary10: ['#111', '#222'] },
    },
  })),
}));

describe('NewSadadBillScreen Component', () => {
  it('renders correctly with mocked dependencies', () => {
    const { getByText } = render(<NewSadadBillScreen />);
    expect(getByText('New Sadad Bills')).toBeTruthy();
    expect(getByText('balance')).toBeTruthy();
  });

  it('renders correctly with IPaySadadBillDetailsBox', () => {
    const { getByText } = render(<NewSadadBillScreen />);

    expect(getByText(' My Electricity Bill')).toBeTruthy();
    expect(getByText('123 - Saudi electricity co.')).toBeTruthy();
    expect(getByText('License')).toBeTruthy();
    expect(getByText('574 - Madinah regional mun..')).toBeTruthy();
  });

  it('renders correctly with SadadFooterComponent', () => {
    const { getByText } = render(<NewSadadBillScreen />);

    expect(getByText('total amount')).toBeTruthy();

    // Simulate onPressTopup
    fireEvent.press(getByText('Pay'));
  });
});
