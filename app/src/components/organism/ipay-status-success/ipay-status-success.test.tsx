import { fireEvent, render } from '@testing-library/react-native';
import IPayStatusSuccess from './ipay-status-success.component';

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  COMMON: {
    SAR: 'SAR',
  },
}));

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary50: '#f0f0f0',
      primary450: '#ff4500',
      primary500: '#ff5000',
      primary800: '#ff8000',
      primary900: '#ff9000',
    },
    secondary: {
      secondary50: '#f0f0f0',
      secondary500: '#0050ff',
    },
    tertiary: {
      tertiary500: '#50ff50',
    },
    natural: {
      natural0: '#ffffff',
      natural700: '#888888',
      natural900: '#000000',
    },
    success: {
      success500: '#00ff00',
    },
    critical: {
      critical800: '#ff0000',
    },
  },
}));

describe('IPayStatusSuccess Component', () => {
  const mockData = [
    {
      title: 'Transaction ID',
      subTitle: '12345',
      icon: 'icon-name', // replace with the actual icon name or component if needed
    },
  ];

  const defaultProps = {
    testID: 'test',
    style: undefined,
    headingText: 'Withdraw Successfully',
    transactionAmount: '2000',
    data: mockData,
    linkButton: true,
    linkBottonText: 'View Details',
    linkButtonIcon: 'icon-name', // replace with actual icon component if needed
    onPressLinkButton: jest.fn(),
    primaryButton: true,
    primaryButtonText: 'Done',
    primaryButtonIcon: 'icon-name', // replace with actual icon component if needed
    onPressPrimaryButton: jest.fn(),
  };

  test('renders correctly with provided data', () => {
    const { getByText, getByTestId } = render(<IPayStatusSuccess {...defaultProps} />);

    expect(getByText('Withdraw Successfully')).toBeTruthy();
    expect(getByText('2000 SAR')).toBeTruthy();
    expect(getByText('Transaction ID')).toBeTruthy();
    expect(getByText('12345')).toBeTruthy();
    expect(getByTestId('test-status-success')).toBeTruthy();
  });

  test('calls onPressLinkButton when the link button is pressed', () => {
    const { getByText } = render(<IPayStatusSuccess {...defaultProps} />);

    const linkButton = getByText('View Details');
    fireEvent.press(linkButton);

    expect(defaultProps.onPressLinkButton).toHaveBeenCalled();
  });

  test('calls onPressPrimaryButton when the primary button is pressed', () => {
    const { getByText } = render(<IPayStatusSuccess {...defaultProps} />);

    const primaryButton = getByText('Done');
    fireEvent.press(primaryButton);

    expect(defaultProps.onPressPrimaryButton).toHaveBeenCalled();
  });

  test('does not render buttons if linkButton and primaryButton are false', () => {
    const { queryByText } = render(<IPayStatusSuccess {...defaultProps} linkButton={false} primaryButton={false} />);

    expect(queryByText('View Details')).toBeNull();
    expect(queryByText('Done')).toBeNull();
  });
});
