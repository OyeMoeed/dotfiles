import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { fireEvent, render } from '@testing-library/react-native';
import InternationalTransferSuccessScreen from './international-transfer-success.screen'; // Adjust the path as necessary

jest.mock('@app/constants/use-constants');
jest.mock('@app/navigation/navigation-service.navigation');

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: { primary500: '#000', primary450: '#111' },
    natural: { natural0: '#fff' },
    tertiary: { tertiary500: '#222' },
    secondary: { secondary100: '#ffffff' },
    backgrounds: { backdrop: 'green' },
  },
}));

jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  TOP_UP: { TRANSFER_SUCCESSFUL: 'Transfer Successfully' },
  COMMON: { SAR: 'SAR', SHARE: 'Share', HOME: 'Home', DONE: 'Done' },
  INTERNATIONAL_TRANSFER: {
    VAT_INVOICE_WAS_NOT_CREATED: 'VAT invoice was not created',
    PLEASE_TRY_AGAIN_LATER: 'Please try again later',
  },
  TRANSACTION_HISTORY: { VAT_INVOICE: 'VAT Invoice' },
}));

describe('InternationalTransferSuccessScreen', () => {
  useConstantData.mockReturnValue({
    internationalTransferData: [
      {
        label: 'AMOUNT_TO',
        value: '100 SAR',
        icon: 'someIcon',
        image: 'someImage',
      },
    ],
  });

  it('renders the success screen correctly', () => {
    const { getByText } = render(<InternationalTransferSuccessScreen />);

    // Check if the success message is displayed
    expect(getByText('50 SAR')).toBeTruthy();
  });

  it('opens VAT invoice alert when the VAT Invoice button is pressed', () => {
    const { getByText } = render(<InternationalTransferSuccessScreen />);

    const vatInvoiceButton = getByText('VAT Invoice');
    fireEvent.press(vatInvoiceButton);

    // Check if the VAT invoice alert is visible
    expect(getByText('VAT invoice was not created')).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('navigates to the home screen when the Home button is pressed', () => {
    const { getByText } = render(<InternationalTransferSuccessScreen />);

    const homeButton = getByText('Home');
    fireEvent.press(homeButton);

    expect(navigate).toHaveBeenCalledWith(ScreenNames.HOME);
  });

  it('closes the VAT invoice alert when the Done button is pressed', () => {
    const { getByText, queryByText } = render(<InternationalTransferSuccessScreen />);

    const vatInvoiceButton = getByText('VAT Invoice');
    fireEvent.press(vatInvoiceButton);

    const doneButton = getByText('Done');
    fireEvent.press(doneButton);

    // Check if the VAT invoice alert is closed
    expect(queryByText('VAT invoice was not created')).toBeNull();
  });
});
