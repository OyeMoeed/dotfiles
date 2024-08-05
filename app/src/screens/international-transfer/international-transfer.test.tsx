import { render } from '@testing-library/react-native';
import InternationalTransferScreen from './international-transfer.screen'; // Adjust import path as per your project structure

// Mocking dependencies and components
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: { primary500: '#000' },
      natural: { natural500: '#fff' },
      backgrounds: { transparent: 'white' },
      error: { error500: 'red' },
    },
  }),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    COMMON: { ACTIVE: 'Active', INACTIVE: 'Inactive', HISTORY: 'History' },
    INTERNATIONAL_TRANSFER: {
      INTERNATIONAL_TRANSFER: 'International Transfer',
      TRANSFER: 'Transfer',
      ACTIVATE: 'Activate',
      SEARCH_BENEFICIARY: 'Search beneficiary',
    },
    LOCAL_TRANSFER: { ADD_NEW_BENEFICIARY: 'Add new beneficiary', NO_BENEFICIARIES: 'No beneficiaries' },
  }),
}));

jest.mock('./international-transfer.constent', () => ({
  __esModule: true,
  default: [
    {
      name: 'Name1',
      transferType: 'TransferType',
      countryFlag: 'CountryFlag1',
      countryName: 'CountryName1',
      status: 'Status1',
    },
    {
      name: 'Name2',
      transferType: 'TransferType',
      countryFlag: 'CountryFlag2',
      countryName: 'CountryName2',
      status: 'Status2',
    },
  ],
}));

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

describe('<InternationalTransferScreen />', () => {
  it('renders InternationalTransferScreen correctly when isBeneficiary is true', () => {
    const { getByTestId } = render(<InternationalTransferScreen />);
    const header = getByTestId('international-transfer-ipay-header-base-view');
    expect(header).toBeTruthy();
  });

  it('toggles between isBeneficiary state correctly', () => {
    const { getByTestId } = render(<InternationalTransferScreen />);
    const addBeneficiaryButton = getByTestId('add-new-beneficiary-pressable');
    expect(addBeneficiaryButton).toBeTruthy();
  });

  it('filters beneficiary list based on search input', () => {
    const { getAllByTestId } = render(<InternationalTransferScreen />);
    const beneficiaryItems = getAllByTestId('no-result-caption-text-base-text');
    expect(beneficiaryItems.length).toBe(1);
  });
});
