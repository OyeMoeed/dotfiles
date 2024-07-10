import { fireEvent, render } from '@testing-library/react-native';
import IPayNearestAtmTabComponent from './ipay-nearest-atm-tab.component';

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      appGradient: {
        gradientPrimary10: '#abcdef', // Mocked gradient color
      },
      natural: {
        natural10: '#000',
      },
      primary: {
        primary500: '',
      },
    },
  }),
}));

describe('<IPayNearestAtmTabComponent />', () => {
  it('renders correctly', () => {
    const mockProps = {
      testID: 'test-id',
      style: {},
      headingText: 'Test Heading',
      onPressDropdown: jest.fn(),
      nearestAtmFilters: ['Filter1', 'Filter2'],
    };

    const { getByTestId, getByText } = render(<IPayNearestAtmTabComponent {...mockProps} />);

    const component = getByTestId('test-id-nearest-atm-tab-comp-linear-gradient');
    expect(component).toBeTruthy();

    const headingElement = getByText('Test Heading');
    expect(headingElement).toBeTruthy();
  });

  it('handles dropdown press', () => {
    const mockProps = {
      testID: 'test-id',
      style: {},
      headingText: 'Test Heading',
      onPressDropdown: jest.fn(),
      nearestAtmFilters: ['Filter1', 'Filter2'],
    };

    const { getByText } = render(<IPayNearestAtmTabComponent {...mockProps} />);

    const dropdownComponent = getByText('Test Heading');
    fireEvent.press(dropdownComponent);

    expect(mockProps.onPressDropdown).toHaveBeenCalled();
  });
});
