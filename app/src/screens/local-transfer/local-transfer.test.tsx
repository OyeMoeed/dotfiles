import { render } from '@testing-library/react-native';
import LocalTransferScreen from './local-transfer.screen';

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    HOME: {
      LOCAL_TRANSFER: 'Local Transfer',
    },
    COMMON: {
      HISTORY: 'History',
    },
    LOCAL_TRANSFER: {
      NO_BENEFECIARIES: "You don't have any beneficiaries added",
      ADD_NEW_BENEFICIARY: 'Add New Beneficiary',
    },
  }),
}));

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: { primary500: '#123123', priamry800: '#0612d8' },
      natural: { natural900: '#000' },
    },
  }),
}));

jest.mock('@app/components/atoms', () => ({
  IPayPressable: jest.fn((props) => <div {...props} />),
  IPayView: jest.fn((props) => <div {...props} />),
  IPayIcon: jest.fn((props) => <div {...props} />),
  IPaySubHeadlineText: jest.fn((props) => <div {...props} />),
}));
jest.mock('@app/components/molecules', () => ({
  IPayHeader: jest.fn((props) => <div {...props} />),
  IPayNoResult: jest.fn((props) => <div {...props} />),
  IPayButton: jest.fn((props) => <button {...props} />),
}));

jest.mock('@app/components/templates', () => ({
  IPaySafeAreaView: jest.fn((props) => <div {...props} />),
}));

jest.mock('@app/localization/hooks/localization.hook');

describe('LocalTransferScreen', () => {
  it('renders header correctly', () => {
    const { getByTestId } = render(<LocalTransferScreen />);
    expect(getByTestId('local-transfer-ipay-header')).toBeDefined();
  });

  it('renders no result correctly', () => {
    const { getByTestId } = render(<LocalTransferScreen />);
    expect(getByTestId('no-result')).toBeTruthy();
  });
});
