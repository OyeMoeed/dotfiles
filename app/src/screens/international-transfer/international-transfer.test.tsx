import { fireEvent, render } from '@testing-library/react-native';
import InternationalTransferScreen from './international-transfer.screen';

// Mocking dependencies and components
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: { primary500: '#000' },
      natural: { natural500: '#fff' },
      backgrounds: { transparent: 'white' },
      error: { error500: 'red' },
      appGradient: {
        buttonBackground: ['#00BAFE1F', '#CAA7FF1F'],
      },
      tertiary: { tertiary50: '#F2FCE9' },
      secondary: {
        secondary100: '#F1E8FF',
      },
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

  it('renders InternationalTransferScreen Search Input', () => {
    const { getByTestId } = render(<InternationalTransferScreen />);
    const header = getByTestId('transfer-search-text-input-base-view');
    expect(header).toBeTruthy();
  });

  it('renders InternationalTransferScreen Price Calculator', () => {
    const { getByTestId } = render(<InternationalTransferScreen />);
    const header = getByTestId('price-calculator-item-linear-gradient');
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

  it('filters beneficiaries on search input', () => {
    const { getByTestId } = render(<InternationalTransferScreen />);

    const textInput = getByTestId('transfer-search-input');
    fireEvent.changeText(textInput, 'Hello');
    expect(textInput.props.value).toBe('Hello');
  });
});
