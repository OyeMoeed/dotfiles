import { resetNavigation } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { fireEvent, render } from '@testing-library/react-native';
import TransferFailureScreen from './transfer-failure.screen';

jest.mock('@app/styles/hooks/theme.hook');
jest.mock('@app/localization/hooks/localization.hook');
jest.mock('@app/navigation/navigation-service.navigation');

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary50: '#f0f0f0',
      primary500: '#007700',
    },
    secondary: {
      secondary50: '#e0e0e0',
    },
    natural: {
      natural0: '#ffffff',
      natural500: '#888888',
      natural900: '#444444',
    },
    error: {
      error500: '#000',
    },
  },
}));

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  LOCAL_TRANSFER: {
    TRANSFER_FAILED: 'Transfer Failed',
    TRY_AGAIN_TO_COMPLETE_TRANSFER: 'Please try again to complete the transfer.',
  },
  TOP_UP: {
    START_OVER: 'Start Over',
  },
  COMMON: {
    HOME: 'Home',
  },
}));

describe('TransferFailureScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<TransferFailureScreen />);

    expect(getByText('Transfer Failed')).toBeTruthy();
    expect(getByText('Please try again to complete the transfer.')).toBeTruthy();
    expect(getByText('Start Over')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
  });

  it('navigates to home screen on pressing Home button', () => {
    const { getByText } = render(<TransferFailureScreen />);

    const homeButton = getByText('Home');
    fireEvent.press(homeButton);

    expect(resetNavigation).toHaveBeenCalledWith(ScreenNames.HOME_BASE);
  });
});
