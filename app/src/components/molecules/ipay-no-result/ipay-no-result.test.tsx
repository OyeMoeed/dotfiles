import { render } from '@testing-library/react-native';
import IPayNoResult from './ipay-no-result.component';

// Mocking localization
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    no_result_available: 'No result available',
  })),
}));

// Mock useTheme hook to provide colors for styles
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary800: '#123456',
      },
      natural: {
        natural500: '#765432',
      },
    },
  }),
}));

describe('IPayNoResult', () => {
  it('renders correctly with default message', () => {
    const { getByTestId, queryByText } = render(<IPayNoResult testID="IPayNoResult" />);
    expect(getByTestId('IPayNoResult-base-view')).toBeDefined();
    expect(queryByText('No result available')).toBeDefined();
  });

  it('renders correctly with icon', () => {
    const { getByTestId } = render(<IPayNoResult testID="IPayNoResult" showIcon />);
    expect(getByTestId('IPayNoResult-icon-base-view')).toBeDefined();
  });

  it('renders correctly with image', () => {
    const { getByTestId } = render(<IPayNoResult testID="IPayNoResult" showEmptyBox />);
    expect(getByTestId('IPayNoResult-image')).toBeDefined();
  });

  it('renders correctly with custom message', () => {
    const message = 'No result';
    const { getByText } = render(<IPayNoResult testID="IPayNoResult" message={message} />);
    expect(getByText(message)).toBeDefined();
  });
});
