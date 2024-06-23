// settings.test.tsx
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Settings from './settings.screen';

// Mocking the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: '#0000FF', // Blue
        primary900: '#00008B', // Dark blue
      },
      secondary: {
        secondary500: '#FFA500', // Orange
      },
      natural: {
        natural0: '#FFA500', // Orange
      },
    },
  }),
}));

// Mocking the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    settings: 'Settings',
    language: 'Language',
    securitySettings: 'Security Settings',
    passcode: 'Passcode',
    pin: 'PIN',
    enableBiometrics: 'Enable Biometrics',
    loginBiometrics: 'Use biometrics to log in',
    hideBalance: 'Hide Balance',
    toggle: 'Toggle',
    notifications: 'Notifications',
    activeNotifications: 'Active Notifications',
    generalNotification: 'General Notification',
    generalSubtext: 'General subtext for notification',
    offers: 'Offers',
    offersSubtext: 'Offers subtext for notification',
    hidden_balance: 'Balance Hidden',
    change: 'Change',
  }),
}));

// Mocking components from '@app/components/atoms'
jest.mock('@components/atoms', () => ({
  __esModule: true,
  IPayFootnoteText: jest.fn(({ children, ...props }) => <text {...props}>{children}</text>),
  IPayCaption1Text: jest.fn(({ children, ...props }) => <text {...props}>{children}</text>),
  IPayIcon: jest.fn(({ icon, ...props }) => <icon {...props} />),
  IPayView: jest.fn(({ children, ...props }) => <view {...props}>{children}</view>),
}));

// Mocking components from '@app/components/molecules'
jest.mock('@app/components/molecules', () => ({
  __esModule: true,
  IPayHeader: jest.fn(({ title, ...props }) => <header {...props}>{title}</header>),
  IPayOutlineButton: jest.fn(({ btnText, ...props }) => <button {...props}>{btnText}</button>),
  IPayToggleButton: jest.fn(({ toggleState, ...props }) => <toggle {...props}>{toggleState ? 'ON' : 'OFF'}</toggle>),
  IPayToast: jest.fn(({ title, ...props }) => <toast {...props}>{title}</toast>),
}));

// Mocking components from '@app/components/templates'
jest.mock('@app/components/templates', () => ({
  __esModule: true,
  IPaySafeAreaView: jest.fn(({ children, ...props }) => <safeview {...props}>{children}</safeview>),
}));

describe('Settings Component', () => {
  it('renders correctly', () => {
    // Render the Settings component
    const { getByTestId } = render(<Settings />);

    // Check if the header is present
    expect(getByTestId('IPayHeader')).toBeTruthy();
  });
  it('renders the language selection button', () => {
    // Render the Settings component
    const { getByTestId } = render(<Settings />);

    // Check if the language selection button is present
    expect(getByTestId('LanguageButton')).toBeTruthy();
  });

  it('toggles the hide balance mode', () => {
    // Render the Settings component
    const { getByTestId, queryByTestId } = render(<Settings />);

    // Find the Hide Balance toggle button
    const hideBalanceToggleButton = getByTestId('BalanceToggle');

    // Verify the toast is not showing initially
    expect(queryByTestId('hideBalanceToast')).toBeNull();

    // Toggle the hide balance button
    fireEvent.press(hideBalanceToggleButton);

    // Wait for 3 seconds (simulating the auto-hide behavior)
    jest.advanceTimersByTime(3000);

    // Check if the toast disappears after the timeout
    expect(queryByTestId('hideBalanceToast')).toBeNull();
  });
  it('renders the "Notifications" section header', () => {
    // Render the Settings component
    const { getByTestId } = render(<Settings />);

    // Check if the "Notifications" section header is present
    expect(getByTestId('NotificationIcon')).toBeTruthy();
  });
});
