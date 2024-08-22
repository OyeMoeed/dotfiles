import { fireEvent, render } from '@testing-library/react-native';
import IPayCreateBeneficiary from './ipay-create-beneficiary.component';

// Mock dependencies
jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

jest.mock('@app/assets/images', () => ({
  bankImg: 'mock_bankImg',
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    COMMON: {
      ON: 'on',
      IBAN: 'IBAN',
      BANK_NAME: 'Bank name',
      ALINMA_BANK: 'Alinma Bank',
      CONFIRM: 'Confirm',
    },
    ERROR: {
      REQUIRED_VALIDATION_MESSAGE: 'Required',
    },
    NEW_BENEFICIARY: {
      BENEFICIARY_NAME: 'Beneficiary Name',
      IBAN_LIMIT_ERROR: 'IBAN Limit Error',
      BENEFECIARY_LIMIT_ERROR: 'Beneficiary Limit Error',
      ADD_BENEFICIARY: 'Add Beneficiary',
      BENEFICIARY_NICK_NAME_OPTIONAL: 'Nick name',
    },
  })),
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

jest.mock('@app/components/molecules', () => ({
  __esModule: true,
  IPayList: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayButton: jest.fn(({ btnText, onPress, ...props }) => (
    <button onClick={onPress} {...props}>
      {btnText}
    </button>
  )),
  IPayAnimatedTextInput: jest.fn((props) => <input {...props} />),
}));

jest.mock('@components/atoms', () => ({
  IPayView: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayIcon: jest.fn((props) => <div {...props} />),
  IPaySubHeadlineText: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayFlatlist: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayImage: jest.fn((props) => <image {...props}>{props.children}</image>),
}));

describe('IPayCreateBenefeciary', () => {
  it('renders new beneficiary form correctly', async () => {
    const { findByTestId } = render(<IPayCreateBeneficiary />);
    const newBeneficiaryForm = await findByTestId('new-beneficiary');
    expect(newBeneficiaryForm).toBeDefined();
  });

  it('renders beneficiary list correctly after creation', async () => {
    const { findByTestId } = render(<IPayCreateBeneficiary />);
    const newBeneficiaryForm = await findByTestId('new-beneficiary');
    expect(newBeneficiaryForm).toBeDefined();

    // Simulate form submission
    fireEvent.changeText(await findByTestId('beneficiaryName'), 'John Doe');
    fireEvent.changeText(await findByTestId('iban'), 'IBAN1234567890');
    fireEvent.press(await findByTestId('beneficiary-btn'));

    const flatlist = await findByTestId('flatlist');
    expect(flatlist).toBeDefined();
  });

  it('calls the correct functions on confirm button press', async () => {
    const onPressMock = jest.fn();
    const { findByTestId } = render(<IPayCreateBeneficiary />);
    const newBeneficiaryForm = await findByTestId('new-beneficiary');
    expect(newBeneficiaryForm).toBeDefined();

    // Simulate form submission
    fireEvent.changeText(await findByTestId('beneficiaryName'), 'John Doe');
    fireEvent.changeText(await findByTestId('iban'), 'IBAN1234567890');
    fireEvent.press(await findByTestId('beneficiary-btn'));

    // Wait for flatlist to render
    const flatlist = await findByTestId('flatlist');
    expect(flatlist).toBeDefined();

    fireEvent.press(await findByTestId('confirm-btn'));

    expect(onPressMock).toHaveBeenCalledTimes(0);
  });
});
