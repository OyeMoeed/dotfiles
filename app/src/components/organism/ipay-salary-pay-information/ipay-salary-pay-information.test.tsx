import { fireEvent, render } from '@testing-library/react-native';

import images from '@app/assets/images';
import IPayTransferInformation from './ipay-salary-pay-information.component';

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#0000ff',
    },
    natural: {
      natural900: '#444444',
      natural700: '#666666',
      natural500: '#888888',
    },
    critical: {
      critical800: '#ff0000',
    },
    error: {
      error500: '#000',
    },
    success: {
      success500: '#fff',
    },
    secondary: {
      secondary500: '#000',
    },
  },
}));

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  TRANSACTION_HISTORY: {
    NOTE: 'Note',
    TRANSFER_REASON: 'Transfer Reason',
  },
  COMMON: {
    OPTIONAL: 'Optional',
    REMOVE: 'Remove',
  },
  SEND_MONEY_FORM: {
    RECIPIENT: 'Recipient',
  },
  TRANSFER_SUMMARY: {
    ADAM_AHMAD: 'Adam Ahmad',
  },
  TOP_UP: {
    ENTER_AMOUNT: 'Enter Amount',
    LIMIT_REACHED: 'Limit Reached',
  },
  PROFILE: {
    REMOVE: 'Remove',
  },
}));

describe('IPayTransferInformation', () => {
  const mockProps = {
    testID: 'test',
    style: {},
    amount: 0,
    setAmount: jest.fn(),
    isEditable: true,
    openReason: jest.fn(),
    setSelectedItem: jest.fn(),
    selectedItem: '',
    notes: '',
    setNotes: jest.fn(),
    showRemoveFormOption: jest.fn(),
    showRemoveBtn: true,
    transferInfo: true,
    chipValue: '',
    transferInfoData: {
      icon: images.snb,
      title: 'Bank Title',
      bankName: 'Bank Name',
      accountNumber: '123456789',
    },
  };

  it('renders correctly', () => {
    const { getByTestId } = render(<IPayTransferInformation {...mockProps} />);
    expect(getByTestId('test-transfer-information-base-view')).toBeTruthy();
  });

  it('renders transfer information correctly', () => {
    const { getByText } = render(<IPayTransferInformation {...mockProps} />);
    expect(getByText('Bank Title')).toBeTruthy();
    expect(getByText(' | Bank Name')).toBeTruthy();
    expect(getByText('123456789')).toBeTruthy();
  });

  it('renders chip value correctly', () => {
    const chipValueProps = { ...mockProps, chipValue: 'Limit Reached' };
    const { getByText } = render(<IPayTransferInformation {...chipValueProps} />);
    expect(getByText('Limit Reached')).toBeTruthy();
  });

  it('triggers openReason callback when reason field is pressed', () => {
    const { getByText } = render(<IPayTransferInformation {...mockProps} />);
    const reasonField = getByText('Transfer Reason');
    fireEvent.press(reasonField);
    expect(mockProps.openReason).toHaveBeenCalled();
  });

  it('renders notes input and accepts input', () => {
    const { getByText } = render(<IPayTransferInformation {...mockProps} />);
    const notesInput = getByText('Note (Optional)');
    fireEvent.changeText(notesInput, 'Test Note');
    expect(mockProps.setNotes).toHaveBeenCalledWith('Test Note');
  });

  it('renders remove button and triggers callback when pressed', () => {
    const { getByText } = render(<IPayTransferInformation {...mockProps} />);
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);
    expect(mockProps.showRemoveFormOption).toHaveBeenCalled();
  });
});
