import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { fireEvent, render } from '@testing-library/react-native';
import BillPaymentsScreen from './bill-payments.screen';

// Mock hooks
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  BILL_PAYMENTS: {
    BILL_PAYMENTS: 'Bill Payments',
  },
  SADAD: {
    ADD_NEW_BILL: 'Add New Bill',
  },
  COMMON: {
    VIEW_ALL: 'View All',
  },
}));

jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#000000',
      primary800: '#000000',
      primary900: '#000000',
    },
    natural: {
      natural0: '#ffffff',
      natural500: '#ffffff',
      natural700: '#ffffff',
      natural900: '#ffffff',
    },
    warning: {
      warning500: '#000',
    },
    error: {
      error500: '#fff',
    },
    critical: {
      critical800: '#000',
    },
    success: {
      success500: '#fff',
    },
    secondary: {
      secondary500: '#000',
    },
    appGradient: { gradientPrimary10: ['#000', '#fff'] },
  },
}));

jest.mock('@app/navigation/navigation-service.navigation', () => ({
  navigate: jest.fn(),
}));

describe('<BillPaymentsScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with bills', () => {
    const { getByText, getByTestId } = render(<BillPaymentsScreen />);
    expect(getByText('Bill Payments')).toBeTruthy();
    expect(getByTestId('ipay-flatlist-flatlist')).toBeTruthy();
    expect(getByText('Add New Bill')).toBeTruthy();
  });

  it('navigates to SADAD_BILLS screen on pressing "View All"', () => {
    const { getByText } = render(<BillPaymentsScreen />);
    fireEvent.press(getByText('View All'));
    expect(navigate).toHaveBeenCalledWith(ScreenNames.SADAD_BILLS);
  });
});
