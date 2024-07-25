import { fireEvent, render } from '@testing-library/react-native';
import IPaySadadBillDetailsBox from './ipay-sadad-bill-details-box.component';

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    NEW_SADAD_BILLS: {
      OVERPAID_BY: 'Overpaid By',
      AMOUNT_TO_BE_PAID: 'Amount to Be Paid',
      YOU_OVERPAYING: 'You are overpaying by',
    },
  })),
}));

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    colors: {
      natural: {
        natural900: '#333333',
        natural700: '#666666',
        natural500: '#999999',
      },
      primary: {
        primary800: '#007AFF',
        primary500: '#3399FF',
      },
      error: {
        error500: '#FF3B30',
      },
      tertiary: { tertiary50: '#F2FCE9' },
      secondary: {
        secondary10: '',
      },
      critical: {
        critical800: '',
      },
      success: {
        success500: '',
      },
    },
  })),
}));

describe('IPaySadadBillDetailsBox', () => {
  const mockItem = {
    overPaidAmount: 50,
    isOverPaid: true,
    title: 'Mock Title',
    companyDetails: 'Mock Company Details',
    companyImage: <></>,
    currency: 'USD',
    amountToPay: 100,
    isTransactionDeclined: false,
    declinedTitle: '',
    declinedMessage: '',
  };

  const mockProps = {
    actionBtnText: 'Action Button',
    onPress: jest.fn(),
    showActionBtn: true,
    testID: 'ipay-sadad-bill-details-box',
    item: mockItem,
    style: null,
  };

  it('renders correctly with overpaid information', () => {
    const { getByText } = render(<IPaySadadBillDetailsBox {...mockProps} />);

    const overpaidByLabel = getByText(/Overpaid By/);
    const amountToPayText = getByText(/Amount to Be Paid/);

    expect(overpaidByLabel).toBeTruthy();
    expect(amountToPayText).toBeTruthy();
  });

  it('renders correctly with declined transaction information', () => {
    const itemWithDecline = { ...mockItem, isTransactionDeclined: true };
    const propsWithDecline = { ...mockProps, item: itemWithDecline };

    const { getByText } = render(<IPaySadadBillDetailsBox {...propsWithDecline} />);

    const declinedTitle = getByText(itemWithDecline.declinedTitle);
    const declinedMessage = getByText(itemWithDecline.declinedMessage);

    expect(declinedTitle).toBeTruthy();
    expect(declinedMessage).toBeTruthy();
  });

  it('calls onPress function when action button is pressed', () => {
    const { getByText } = render(<IPaySadadBillDetailsBox {...mockProps} />);

    const actionButton = getByText(mockProps.actionBtnText);
    fireEvent.press(actionButton);

    expect(mockProps.onPress).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when showActionBtn is false', () => {
    const propsWithoutActionBtn = { ...mockProps, showActionBtn: false };
    const { queryByText } = render(<IPaySadadBillDetailsBox {...propsWithoutActionBtn} />);

    const actionButton = queryByText(propsWithoutActionBtn.actionBtnText);

    expect(actionButton).toBeNull();
  });
});
