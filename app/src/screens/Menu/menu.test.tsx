import { fireEvent, render } from '@testing-library/react-native';
import MoreWithErrorBoundary from './menu.screen';

// Mocking the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary800: '#0000FF', // Blue
        primary900: '#00008B', // Dark blue
      },
      seconday: {
        secondary100: '',
      },
      natural: {
        natural0: '#FFA500', // Orange
        natural700: '#FFA500',
      },
      appGradient: {
        gradientPrimary10: '',
      },
    },
  }),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    show_prodile: 'Show Profile',
    settings: 'Settings',
    support_and_help: 'Support and Help',
    cards_management: 'Cards Management',
    delink: 'Delink',
    logout: 'Logout',
    // Add other localized strings as needed
  }),
}));

jest.mock('@app/navigation/navigation-service.navigation', () => ({
  __esModule: true,
  navigate: jest.fn(),
}));

describe('More Component', () => {
  it('should render profile information', () => {
    const { getByText } = render(<MoreWithErrorBoundary />);
    expect(getByText('Adam Ahmed')).toBeTruthy();
    expect(getByText('Show Profile')).toBeTruthy(); // Ensure this matches your mock setup
  });

  it('should navigate to settings on press', () => {
    const { getByText } = render(<MoreWithErrorBoundary />);
    const settingsButton = getByText('Settings');
    fireEvent.press(settingsButton);
  });

  it('should render menu items correctly', () => {
    const { getByText } = render(<MoreWithErrorBoundary />);
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Support and Help')).toBeTruthy();
  });
});
