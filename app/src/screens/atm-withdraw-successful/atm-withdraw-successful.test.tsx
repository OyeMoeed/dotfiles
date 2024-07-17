import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import { fireEvent, render } from '@testing-library/react-native';
import AtmWithdrawSuccessful from './atm-withdraw-successful.screen';

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  COMMON: {
    HOME: 'Home',
  },
  ATM_WITHDRAWAL: {
    WITHDRAW_SUCCESSFULLY: 'Withdraw Successfully',
    NEW_WITHDRAWAL: 'New Withdrawal',
  },
}));

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary50: '#f0f0f0',
      primary500: '#ff5000',
    },
    secondary: {
      secondary50: '#f0f0f0',
    },
    tertiary: {
      tertiary500: '#50ff50',
    },
    natural: {
      natural0: '#ffffff',
    },
  },
}));

// Mock constants
jest.mock('@app/constants/constants', () => ({
  ATM_WITHDRAW_SUCCESS_DATA: [
    {
      title: 'Transaction ID',
      subTitle: '12345',
      icon: 'icon-name', // replace with the actual icon name or component if needed
    },
  ],
}));

// Mock navigation service
jest.mock('@app/navigation/navigation-service.navigation', () => ({
  resetNavigation: jest.fn(),
}));

// Mock assets
jest.mock('@app/assets/icons', () => ({
  HOME: 'home-icon', // replace with actual icon component if needed
  refresh: 'refresh-icon', // replace with actual icon component if needed
}));
jest.mock('@app/assets/images', () => ({
  logo: 'logo-image', // replace with actual image component if needed
}));

describe('AtmWithdrawSuccessful Component', () => {
  test('renders correctly with provided data', () => {
    const { getByText } = render(<AtmWithdrawSuccessful />);

    expect(getByText('Withdraw Successfully')).toBeTruthy();
    expect(getByText('5000')).toBeTruthy();
    expect(getByText('Transaction ID')).toBeTruthy();
    expect(getByText('12345')).toBeTruthy();
    expect(getByText('New Withdrawal')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
  });

  test('calls resetNavigation with HOME_BASE when the primary button is pressed', () => {
    const { getByText } = render(<AtmWithdrawSuccessful />);

    const primaryButton = getByText('Home');
    fireEvent.press(primaryButton);

    expect(resetNavigation).toHaveBeenCalledWith('HOME_BASE');
  });

  test('renders logo in the header', () => {
    const { getByTestId } = render(<AtmWithdrawSuccessful />);
    const logoImage = getByTestId('logo-image'); // Update this with the correct testID if needed

    expect(logoImage).toBeTruthy();
  });
});
