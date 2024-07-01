import { fireEvent, render } from '@testing-library/react-native';
import IPayPointsRedemption from './ipay-points-redemption.component';

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
    not_enrolled: 'Not Enrolled',
    not_enrolled_description: 'You are not enrolled in the points redemption program.',
    remaining: 'Remaining',
  }),
}));

describe('IPayPointsRedemption', () => {
  it('renders correctly without crashing', () => {
    const { getByText } = render(<IPayPointsRedemption />);
    expect(getByText('Not Enrolled')).toBeTruthy();
  });

  it('renders the not enrolled view', () => {
    const { getByText, getByTestId } = render(<IPayPointsRedemption />);
    expect(getByText('Not Enrolled')).toBeTruthy();
    expect(getByTestId('not-enrolled-icon')).toBeTruthy();
  });

  it('renders the points redemption view', () => {
    const { getByText, getByPlaceholderText } = render(<IPayPointsRedemption />);

    // Simulate conditional rendering
    const pointsRedemptionView = getByText('Redeem the Points');
    expect(pointsRedemptionView).toBeTruthy();

    const inputField = getByPlaceholderText('0');
    expect(inputField).toBeTruthy();
  });

  it('updates input field correctly', () => {
    const { getByPlaceholderText } = render(<IPayPointsRedemption />);
    const inputField = getByPlaceholderText('0');

    fireEvent.changeText(inputField, '100');
    expect(inputField.props.value).toBe('100');
  });

  it('enables the redeem button only when there is text in the input field', () => {
    const { getByText, getByPlaceholderText } = render(<IPayPointsRedemption />);
    const inputField = getByPlaceholderText('0');
    const redeemButton = getByText('Redeem');

    // Initially, the button should be disabled
    expect(redeemButton.props.disabled).toBe(true);

    // Enter text in the input field
    fireEvent.changeText(inputField, '100');
    expect(inputField.props.value).toBe('100');
    expect(redeemButton.props.disabled).toBe(false);
  });

  it('applies dynamic styles correctly based on input length', () => {
    const { getByPlaceholderText } = render(<IPayPointsRedemption />);
    const inputField = getByPlaceholderText('0');

    // Initially, check dynamic styles
    expect(inputField.props.style).toContainEqual({ color: '#CCCCCC' });

    // Enter text in the input field
    fireEvent.changeText(inputField, '100');
    expect(inputField.props.style).toContainEqual({ color: '#000000' });
  });
});
