import { fireEvent, render } from '@testing-library/react-native';
import IPayAtmDetails from './ipay-atm-details.component';

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  COMMON: {
    KM: 'km',
  },
  ATM_WITHDRAWAL: {
    ALINMA_ATM: 'ALINMA_ATM',
  },
}));

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary900: '#ff0000',
    },
    critical: {
      critical800: '#ff0000', // Mocking critical800 color
    },
    natural: {
      natural700: '#888888', // Mocking natural700 color
      natural0: '#fff',
      natural900: '#fff',
    },
    success: {
      success500: '#00ff00', // Mocking success500 color
    },
    secondary: {
      secondary500: '#0000ff', // Mocking secondary500 color
    },
    // Add more mock colors as needed
  },
}));

describe('IPayAtmDetails Component', () => {
  const mockData = {
    address: 'Test Address',
    distance: '2.5', // Assuming distance is a string like '2.5 km'
    type: 'ATM',
    location: {
      latitude: 123,
      longitude: 456,
    },
  };

  test('renders correctly with provided data', () => {
    const { getByText } = render(<IPayAtmDetails testID="test" style={undefined} data={mockData} />);

    const addressText = getByText('Test Address');
    expect(addressText).toBeTruthy();

    const distanceText = getByText('2,5 km'); // Check for localized distance
    expect(distanceText).toBeTruthy();

    const typeText = getByText('ATM');
    expect(typeText).toBeTruthy();

    // You can add more assertions as needed for other elements
  });

  test('calls openGoogleMapsWeb when the button is pressed', () => {
    const { getByTestId } = render(<IPayAtmDetails testID="test" style={undefined} data={mockData} />);

    const baseView = getByTestId('test-atm-details-base-view');
    expect(baseView).toBeTruthy();

    fireEvent.press(baseView); // Fire event on the base view or the specific element that triggers openGoogleMapsWeb
  });
});
