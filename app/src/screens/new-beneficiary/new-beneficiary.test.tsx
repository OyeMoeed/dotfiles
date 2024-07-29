import { render } from '@testing-library/react-native';
import NewBeneficiaryScreen from './new-beneficiary.screen';

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    COMMON: {
      IBAN: 'IBAN',
      BANK_NAME: 'Bank name',
      ALINMA_BANK: 'Alinma Bank',
    },
    ERROR: {
      REQUIRED_VALIDATION_MESSAGE: 'Required',
    },
    NEW_BENEFICIARY: {
      NEW_BENEFICIARY: 'New Beneficiary',
    },
  }),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: { primary500: '#123123', primary10: '#fff', primary100: '#f4f4f4' },
      natural: { natural900: '#000' },
      secondary: { secondary500: '#789789' },
      backgrounds: { greyOverlay: '#fff', successBackground: '#fefefe' },
      tertiary: { tertiary50: '#334dfs' },
      error: { error500: 'red' },
      critical: {
        critical25: '#FFFDE7',
        critical500: '#FFEB3B',
        critical800: '#735F00',
      },
    },
  }),
}));

jest.mock('formik', () => ({
  useFormikContext: jest.fn().mockReturnValue({
    getFieldMeta: jest.fn(),
  }),
}));

jest.mock('@app/components/molecules', () => ({
  IPayHeader: jest.fn(({ title, ...props }) => <header {...props}>{title}</header>),
}));
jest.mock('@app/components/atoms', () => ({
  IPayIcon: jest.fn((props) => <div {...props} />),
}));

jest.mock('@app/components/templates', () => ({
  IPaySafeAreaView: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

jest.mock('@app/components/templates/ipay-create-beneficiary/ipay-create-beneficiary.component', () => ({
  IPayCreateBeneficiary: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

describe('NewBeneficiaryScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<NewBeneficiaryScreen />);
    expect(getByTestId('new-beneficiary-ipay-view')).toBeDefined();
  });
});
