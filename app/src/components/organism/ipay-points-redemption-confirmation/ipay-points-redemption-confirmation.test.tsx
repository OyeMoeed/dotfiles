import { fireEvent, render, waitFor } from '@testing-library/react-native';
import IPayPointsRedemptionConfirmation from './ipay-points-redemption-confirmation.component';

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary900: '#000000',
      },
      secondary: {
        secondary300: '#000000',
      },
      natural: {
        natural0: '#FFFFFF',
        natural300: '#CCCCCC',
      },
      backgrounds: {
        greyOverlay: '#F0F0F0',
      },
      critical: {
        critical800: '#FF0000',
      },
      gradientPrimary: ['#0000FF', '#00FF00'],
    },
  }),
}));

// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    top_up: 'Top Up',
    points_redeemed: 'Points Redeemed',
    equivalent_balance: 'Equivalent Balance',
    remaining_points: 'Remaining Points',
    redeem_points: 'Redeem Points',
    help_center: 'Help Center',
    not_enrolled: 'Not Enrolled',
    not_enrolled_description: 'You are not enrolled in the points redemption program.',
    remaining: 'Remaining',
  }),
}));

describe('IPayPointsRedemptionConfirmation', () => {
  it('renders correctly without crashing', () => {
    const { getByText } = render(<IPayPointsRedemptionConfirmation />);
    expect(getByText('Top Up')).toBeTruthy();
  });

  it('renders the header with the correct title', () => {
    const { getByText } = render(<IPayPointsRedemptionConfirmation />);
    expect(getByText('Top Up')).toBeTruthy();
  });

  it('renders the Point Redemption Card correctly', () => {
    const { getByText } = render(<IPayPointsRedemptionConfirmation />);
    expect(getByText('Akthr Points Redemption')).toBeTruthy();
  });

  it('displays point details correctly', () => {
    const { getByText } = render(<IPayPointsRedemptionConfirmation />);
    expect(getByText('Points Redeemed')).toBeTruthy();
    expect(getByText('2400 Points')).toBeTruthy();
    expect(getByText('Equivalent Balance')).toBeTruthy();
    expect(getByText('80.00 SAR')).toBeTruthy();
    expect(getByText('Remaining Points')).toBeTruthy();
    expect(getByText('600 Points')).toBeTruthy();
  });

  it('handles Confirm button press and opens bottom sheet', async () => {
    const { getByText, getByTestId } = render(<IPayPointsRedemptionConfirmation />);
    const confirmButton = getByText('Confirm');

    fireEvent.press(confirmButton);

    await waitFor(() => {
      const bottomSheet = getByTestId('bottom-sheet');
      expect(bottomSheet).toBeTruthy();
    });
  });

  it('opens and closes OTP verification bottom sheet correctly', async () => {
    const { getByText, queryByTestId } = render(<IPayPointsRedemptionConfirmation />);
    const confirmButton = getByText('Confirm');

    fireEvent.press(confirmButton);

    await waitFor(() => {
      const otpBottomSheet = getByText('otp-bottom-sheet');
      expect(otpBottomSheet).toBeTruthy();

      const closeButton = getByText('close-otp-bottom-sheet');
      fireEvent.press(closeButton);

      expect(queryByTestId('otp-bottom-sheet')).toBeNull();
    });
  });

  it('opens Help Center correctly', async () => {
    const { getByText, getByTestId } = render(<IPayPointsRedemptionConfirmation />);
    const helpButton = getByText('Help');

    fireEvent.press(helpButton);

    await waitFor(() => {
      const helpCenterBottomSheet = getByTestId('help-center-bottom-sheet');
      expect(helpCenterBottomSheet).toBeTruthy();
    });
  });
});
