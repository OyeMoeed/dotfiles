import { render } from '@testing-library/react-native';
import useLocalization from '@app/localization/hooks/localization.hook';
import IPayAlert from '@app/components/atoms/ipay-alert/ipay-alert.component';
import IPayDelink from './ipay-delink.component';

// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the IPayAlert component
jest.mock('@app/components/atoms/ipay-alert/ipay-alert.component', () => jest.fn(() => null));

describe('IPayDelink', () => {
  const mockUseLocalization = useLocalization as jest.Mock;
  const mockIPayAlert = IPayAlert as jest.Mock;

  const defaultProps = {
    onClose: jest.fn(),
    visible: true,
    delink: jest.fn(),
  };

  beforeEach(() => {
    // Reset mocks before each test
    mockUseLocalization.mockReset();
    mockIPayAlert.mockReset();
  });

  it('renders correctly with given props', () => {
    const localizationText = {
      delink_title: 'Test Title',
      try_again_tittle: 'Test Message',
      try_again: 'Try Again',
      delink: 'Delink',
    };

    mockUseLocalization.mockReturnValue(localizationText);

    render(<IPayDelink {...defaultProps} />);

    expect(IPayAlert).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: defaultProps.visible,
        title: localizationText.delink_title,
        message: localizationText.try_again_tittle,
        type: 'sideByside',
        variant: 'destructive',
        primaryAction: {
          text: localizationText.try_again,
          onPress: defaultProps.onClose,
        },
        secondaryAction: {
          text: localizationText.delink,
          onPress: defaultProps.delink,
        },
      }),
      {},
    );
  });

  it('calls onClose when the primary action button is pressed', () => {
    const localizationText = {
      delink_title: 'Test Title',
      try_again_tittle: 'Test Message',
      try_again: 'Try Again',
      delink: 'Delink',
    };

    mockUseLocalization.mockReturnValue(localizationText);

    const { getByText } = render(<IPayDelink {...defaultProps} />);

    // Since IPayAlert is mocked to return null, we need to simulate the press directly
    // by invoking the onPress function from the props passed to IPayAlert mock
    const primaryActionProps = mockIPayAlert.mock.calls[0][0].primaryAction;
    primaryActionProps.onPress();

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls delink when the secondary action button is pressed', () => {
    const localizationText = {
      delink_title: 'Test Title',
      try_again_tittle: 'Test Message',
      try_again: 'Try Again',
      delink: 'Delink',
    };

    mockUseLocalization.mockReturnValue(localizationText);

    const { getByText } = render(<IPayDelink {...defaultProps} />);

    // Simulate the press directly by invoking the onPress function from the props passed to IPayAlert mock
    const secondaryActionProps = mockIPayAlert.mock.calls[0][0].secondaryAction;
    secondaryActionProps.onPress();

    expect(defaultProps.delink).toHaveBeenCalled();
  });

  it('renders alert with visibility set to false', () => {
    const localizationText = {
      delink_title: 'Test Title',
      try_again_tittle: 'Test Message',
      try_again: 'Try Again',
      delink: 'Delink',
    };

    mockUseLocalization.mockReturnValue(localizationText);

    render(<IPayDelink {...defaultProps} visible={false} />);

    // Ensure the IPayAlert is rendered but with visible set to false
    expect(IPayAlert).toHaveBeenCalledWith(
      expect.objectContaining({
        visible: false,
        title: localizationText.delink_title,
        message: localizationText.try_again_tittle,
        type: 'sideByside',
        variant: 'destructive',
        primaryAction: {
          text: localizationText.try_again,
          onPress: defaultProps.onClose,
        },
        secondaryAction: {
          text: localizationText.delink,
          onPress: defaultProps.delink,
        },
      }),
      {},
    );
  });
});
