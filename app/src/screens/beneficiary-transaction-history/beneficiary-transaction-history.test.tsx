import { render } from '@testing-library/react-native';
import React from 'react';
import BeneficiaryTransactionHistoryScreen from './beneficiary-transaction-history';

const MockIPayBottomSheet = React.forwardRef((props, ref) => <div {...props}>{props.children}</div>);

// Mock dependencies
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: () => ({
    COMMON: {
      TRANSACTION_HISTORY: 'Transactions History',
      SENT: 'Sent',
      RECEIVED: 'Received',
    },
    TRANSACTION_HISTORY: {
      TRANSACTION_DETAILS: 'Transaction Details',
    },
  }),
}));

jest.mock('@app/components/templates', () => ({
  __esModule: true,
  IPaySafeAreaView: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayTransactionHistory: jest.fn((props) => <div {...props} />),
}));

jest.mock('@app/components/atoms', () => ({
  IPayView: jest.fn(({ children }) => children),
  IPayPressable: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayIcon: jest.fn((props) => <div {...props} />),
  IPayFlatlist: jest.fn((props) => <div {...props} />),
  IPayFootnoteText: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

jest.mock('@app/components/organism', () => ({
  IPayBottomSheet: MockIPayBottomSheet,
}));

jest.mock('@app/components/molecules', () => ({
  IPayHeader: jest.fn((props) => <div {...props} />),
  IPayTabs: jest.fn(() => null),
  IPayButton: jest.fn((props) => (
    <button onClick={props.onPress} type="submit" data-variant={props.variant}>
      {props.btnText}
    </button>
  )),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: { primary500: '#123123' },
      natural: { natural900: '#000' },
      secondary: { secondary500: '#789789' },
      backgrounds: { greyOverlay: '#fff' },
    },
  }),
}));

describe('BeneficiaryTransactionHistoryScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<BeneficiaryTransactionHistoryScreen />);
    expect(getByTestId('transaction-section')).toBeDefined();
  });

  it('header renders correctly', () => {
    const { getByTestId } = render(<BeneficiaryTransactionHistoryScreen />);
    expect(getByTestId('transaction-header')).toBeTruthy();
  });

  it('transaction flatlist renders correctly', () => {
    const { getByTestId } = render(<BeneficiaryTransactionHistoryScreen />);
    expect(getByTestId('transaction-flatlist')).toBeDefined();
  });
});
