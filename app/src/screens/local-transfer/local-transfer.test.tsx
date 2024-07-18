import { render } from '@testing-library/react-native';
import LocalTransferScreen from './local-transfer.screen'; // Update the path as per your project structure

// Mocking dependencies and constants
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    HOME: {
      LOCAL_TRANSFER: 'Local Transfer',
    },
    COMMON: {
      HISTORY: 'History',
    },
    LOCAL_TRANSFER: {
      SEARCH_FOR_NAME: 'Search for name',
      NO_BENEFICIARIES: 'No beneficiaries found.',
      ADD_NEW_BENEFICIARY: 'Add new beneficiary',
      TRANSFER: 'Transfer', // Example of a localized text
    },
  })),
}));

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    colors: {
      primary: {
        primary500: '#000000', // Example color value
        primary800: '#FFFFFF', // Example color value
      },
      natural: {
        natural0: '#FFFFFF', // Example color value
        natural500: '#000000', // Example color value
      },
      backgrounds: { transparent: '' },
      error: { error500: 'red' },
      tertiary: { tertiary50: '#345' },
      secondary: { secondary100: 'blue' },
    },
  })),
}));

jest.mock('./local-transfer.constant', () => ({
  defaultDummyBeneficiaryData: [
    {
      name: 'John Doe',
      account_no: '1234567890',
      bank_name: 'Example Bank',
      bank_logo: 'example_bank_logo_url',
    },
    // Add more dummy data as needed
  ],
}));

describe('LocalTransferScreen', () => {
  it('renders correctly with beneficiaries', () => {
    const { getByText } = render(<LocalTransferScreen />);

    // Test rendering of header component
    expect(getByText('Local Transfer')).toBeTruthy(); // Example of testing localized text
    expect(getByText('History')).toBeDefined();
    expect(getByText('Active')).toBeDefined();
    expect(getByText('Inactive')).toBeDefined();

    // Test rendering of beneficiary list
    expect(getByText('John Doe')).toBeTruthy(); // Example of testing beneficiary data
    expect(getByText('Add new beneficiary')).toBeDefined();
  });

  it('renders correctly with no beneficiaries', () => {
    const { getByTestId, getByText } = render(<LocalTransferScreen />);

    // Test rendering of no beneficiaries message
    expect(getByTestId('no-result-caption-text-base-text')).toBeDefined();
    expect(getByText('No beneficiaries found.')).toBeTruthy(); // Example of testing localized text
  });
});
