import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import MoneyRequestStatus from '@app/enums/money-request-status.enum';
import { TransactionOperations } from '@app/enums/transaction-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { fireEvent, render } from '@testing-library/react-native';
import IPayRequestDetails from './ipay-request-detail.component';

jest.mock('@app/localization/hooks/localization.hook');
jest.mock('@app/styles/hooks/theme.hook');
jest.mock('@app/components/molecules/ipay-toast/context/ipay-toast-context');

describe('IPayRequestDetails Component', () => {
  const mockLocalization = {
    REQUEST_MONEY: {
      RECEIVED_REQUEST_FROM: 'Received Request From',
      SEND_REQUEST_TO: 'Send Request To',
      CANCEL: 'Cancel',
      PAID: 'Paid',
      PENDING: 'Pending',
      REJECTED: 'Rejected',
      PAY: 'Pay',
      REJECT: 'Reject',
      CANCEL_REQUEST: 'Cancel Request',
    },
    TOP_UP: {
      COPIED: 'Copied',
    },
  };

  const mockColors = {
    primary: {
      primary800: '#144667',
      primary500: '#12a1f0',
    },
    error: {
      error500: '#ff0000',
      error25: '#ffe5e5',
    },
    tertiary: {
      tertiary500: '#FFA500',
    },
    natural: {
      natural0: '#FFFFFF',
      natural100: '#F0F0F0',
      natural900: '#111111',
      natural700: '#777777',
    },
    critical: {
      critical800: '#FF4500',
      critical25: '#FFE5E5',
    },
    success: {
      success25: '#E5FFE5',
    },
  };

  const mockTransaction = {
    title: 'Ali',
    amount: '150',
    type: TransactionOperations.DEBIT,
    status: MoneyRequestStatus.PENDING,
    request_date: '2024-07-25T10:30:00',
    cancellation_date: '',
    payment_date: '',
    rejection_date: '',
    send_date: '',
    ref_number: 'REF123456',
  };

  const mockShowToast = jest.fn();

  beforeEach(() => {
    (useLocalization as jest.Mock).mockReturnValue(mockLocalization);
    (useTheme as jest.Mock).mockReturnValue({ colors: mockColors });
    (useToastContext as jest.Mock).mockReturnValue({ showToast: mockShowToast });
  });

  it('renders the component correctly', () => {
    const { getByTestId } = render(<IPayRequestDetails transaction={mockTransaction} />);
    const component = getByTestId('transaction-history-base-view');
    expect(component).toBeDefined();
  });

  it('displays the correct localization text for debit transactions', () => {
    const { queryByText } = render(<IPayRequestDetails transaction={mockTransaction} />);
    expect(queryByText(mockLocalization.REQUEST_MONEY.RECEIVED_REQUEST_FROM)).toBeDefined();
    expect(queryByText(mockTransaction.title)).toBeDefined();
    expect(queryByText('150 SAR')).toBeDefined();
  });

  it('displays the correct localization text for credit transactions', () => {
    const creditTransaction = { ...mockTransaction, type: TransactionOperations.CREDIT };
    const { queryByText } = render(<IPayRequestDetails transaction={creditTransaction} />);
    expect(queryByText(mockLocalization.REQUEST_MONEY.SEND_REQUEST_TO)).toBeDefined();
  });

  it('displays the correct status text and color', () => {
    const { queryByText, getByTestId } = render(<IPayRequestDetails transaction={mockTransaction} />);
    const statusText = queryByText(mockLocalization.REQUEST_MONEY.PENDING);
    const statusView = getByTestId('status-view');

    expect(statusText).toBeDefined();
    expect(statusView.props.style).toMatchObject({
      backgroundColor: mockColors.critical.critical25,
    });
  });

  it('copies the reference number when clicked', () => {
    const { getByText } = render(<IPayRequestDetails transaction={mockTransaction} />);
    const refNumberElement = getByText(mockTransaction.ref_number);
    fireEvent.press(refNumberElement);

    expect(mockShowToast).toHaveBeenCalledWith({
      title: mockLocalization.TOP_UP.COPIED,
      subTitle: mockTransaction.ref_number,
      containerStyle: expect.any(Object),
      leftIcon: expect.any(Object),
      toastType: 'success',
    });
  });

  it('displays the "Cancel Request" button for rejected transactions', () => {
    const rejectedTransaction = { ...mockTransaction, status: MoneyRequestStatus.REJECTED };
    const { queryByText } = render(<IPayRequestDetails transaction={rejectedTransaction} />);
    expect(queryByText(mockLocalization.REQUEST_MONEY.CANCEL_REQUEST)).toBeDefined();
  });

  it('displays the correct buttons for pending debit transactions', () => {
    const { queryByText } = render(<IPayRequestDetails transaction={mockTransaction} />);
    expect(queryByText(mockLocalization.REQUEST_MONEY.PAY)).toBeDefined();
    expect(queryByText(mockLocalization.REQUEST_MONEY.REJECT)).toBeDefined();
  });

  it('triggers onCloseBottomSheet when the "Cancel" button is pressed', () => {
    const mockOnCloseBottomSheet = jest.fn();
    const { getByText } = render(
      <IPayRequestDetails transaction={mockTransaction} onCloseBottomSheet={mockOnCloseBottomSheet} />,
    );
    const cancelButton = getByText(mockLocalization.REQUEST_MONEY.CANCEL_REQUEST);

    fireEvent.press(cancelButton);

    expect(mockOnCloseBottomSheet).toHaveBeenCalled();
  });

  it('triggers showActionSheet when the "Reject" button is pressed', () => {
    const mockShowActionSheet = jest.fn();
    const { getByText } = render(
      <IPayRequestDetails transaction={mockTransaction} showActionSheet={mockShowActionSheet} />,
    );
    const rejectButton = getByText(mockLocalization.REQUEST_MONEY.REJECT);

    fireEvent.press(rejectButton);

    expect(mockShowActionSheet).toHaveBeenCalled();
  });
});
