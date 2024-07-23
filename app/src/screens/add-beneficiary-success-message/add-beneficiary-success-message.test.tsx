import { render } from '@testing-library/react-native';
import AddBeneficiarySuccessScreen from './add-beneficiary-success-message.screen';

// Mocking required dependencies
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    colors: {
      natural: { natural0: '' },
      gradientTertiary: ['#ffffff', '#eeeeee'], // Mocked gradient colors
      tertiary: { tertiary400: '#cccccc', primary500: '#aaaaaa' }, // Mocked tertiary colors
      primary: { primary50: '#dddddd', primary800: '#bbbbbb' }, // Mocked primary colors
      secondary: { secondary50: '#999999' }, // Mocked secondary colors
      appGradient: {
        gradientSecondary40: ['#ffffff', '#bbbbbb'],
      },
      backgrounds: {
        successBackground: ['#ffffff', '#000'],
      },
    },
    icons: {
      logoAlinmaPay: jest.fn(),
      successIconGif: jest.fn(),
    },
  }),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    NEW_BENEFICIARY: {
      BENEFICIARY_ADDED_SUCCESSFULLY: 'Beneficiary Added Successfully',
      YOU_NEED_ACTIVATE_BENEFICIARY: 'You need to activate this Beneficiary before making international transfer',
      ACTIVATE_BENEFICIARY: 'Activate Beneficiary',
      INTERNATIONAL_TRANSFER_PAGE: 'International Transfer Page',
    },
  }),
}));

// Mocking Clipboard module
jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

jest.mock('@app/components/molecules', () => ({
  IPaySuccess: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayButton: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayHeader: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

jest.mock('@app/components/templates', () => ({
  IPaySafeAreaView: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

jest.mock('@app/components/atoms', () => ({
  IPayLinearGradientView: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayImage: jest.fn((props) => <image {...props} />),
  IPayView: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

describe('AddBeneficiarySuccessScreen', () => {
  it('renders the component correctly', () => {
    const { getByTestId } = render(<AddBeneficiarySuccessScreen />);
    expect(getByTestId('ipay-success')).toBeDefined();
  });
});
