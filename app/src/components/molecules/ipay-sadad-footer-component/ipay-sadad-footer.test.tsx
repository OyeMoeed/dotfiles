import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { fireEvent, render } from '@testing-library/react-native';
import SadadFooterComponent from './ipay-sadad-footer.component';

// Mock hooks
jest.mock('@app/styles/hooks/theme.hook', () => jest.fn());
jest.mock('@app/localization/hooks/localization.hook', () => jest.fn());

const mockUseTheme = useTheme as jest.Mock;
const mockUseLocalization = useLocalization as jest.Mock;

describe('SadadFooterComponent', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      colors: {
        primary: {
          primary500: '#007700',
          primary800: '#005500',
        },
        natural: {
          natural900: '#000000',
        },
        appGradient: {
          gradientPrimary10: ['#ffffff', '#000000'],
        },
      },
    });

    mockUseLocalization.mockReturnValue({
      COMMON: {
        SAR: 'SAR',
      },
      SADAD: {
        SELECTED_BILLS: 'Selected Bills',
      },
      LOCAL_TRANSFER: {
        TOTAL_AMOUNT: 'Total Amount',
      },
    });
  });

  it('renders correctly with the selected items count and total amount', () => {
    const { getByText } = render(
      <SadadFooterComponent
        testID="sadad-footer"
        totalAmount="150"
        selectedItemsCount={2}
        btnText="Proceed"
        btnDisabled={false}
        onPressBtn={() => {}}
      />,
    );

    expect(getByText('2')).toBeTruthy();
    expect(getByText('Selected Bills')).toBeTruthy();
    expect(getByText('Total Amount')).toBeTruthy();
    expect(getByText('150 SAR')).toBeTruthy();
    expect(getByText('Proceed')).toBeTruthy();
  });

  it('renders correctly without the selected items count', () => {
    const { queryByText } = render(
      <SadadFooterComponent
        testID="sadad-footer"
        totalAmount="150"
        selectedItemsCount={0}
        btnText="Proceed"
        btnDisabled={false}
        onPressBtn={() => {}}
      />,
    );

    expect(queryByText('Selected Bills')).toBeNull();
    expect(queryByText('Total Amount')).toBeTruthy();
    expect(queryByText('150 SAR')).toBeTruthy();
    expect(queryByText('Proceed')).toBeTruthy();
  });

  it('renders correctly without the total amount', () => {
    const { queryByText } = render(
      <SadadFooterComponent
        testID="sadad-footer"
        totalAmount=""
        selectedItemsCount={2}
        btnText="Proceed"
        btnDisabled={false}
        onPressBtn={() => {}}
      />,
    );

    expect(queryByText('2')).toBeTruthy();
    expect(queryByText('Selected Bills')).toBeTruthy();
    expect(queryByText('Total Amount')).toBeNull();
    expect(queryByText('150 SAR')).toBeNull();
    expect(queryByText('Proceed')).toBeTruthy();
  });

  it('handles button press', () => {
    const onPressBtnMock = jest.fn();
    const { getByText } = render(
      <SadadFooterComponent
        testID="sadad-footer"
        totalAmount="150"
        selectedItemsCount={2}
        btnText="Proceed"
        btnDisabled={false}
        onPressBtn={onPressBtnMock}
      />,
    );

    fireEvent.press(getByText('Proceed'));
    expect(onPressBtnMock).toHaveBeenCalled();
  });
});
