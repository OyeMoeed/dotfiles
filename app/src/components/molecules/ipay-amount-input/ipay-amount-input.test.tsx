

import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import { fireEvent, render, screen } from '@testing-library/react';
import IPayAmountInput from './ipay-amount-input';

// Mock the hooks
jest.mock('@app/styles/hooks/theme.hook');
jest.mock('@app/localization/hooks/localization.hook');

describe('IPayAmountInput Component', () => {
  beforeEach(() => {
    // Mock theme hook to return a consistent theme
    (useTheme as jest.Mock).mockReturnValue({
      colors: {
        primary: {
          primary900: '#04334D',
        },
        natural: {
          natural300: '##BDBDBD',
        },
      },
    });

    // Mock localization hook to return the text "SAR"
    (useLocalization as jest.Mock).mockReturnValue({
      SAR: 'SAR',
    });
  });

  test('renders correctly with initial amount', () => {
    render(<IPayAmountInput amount="100" onAmountChange={() => { }} />);

    const inputElement = screen.getByTestId('amount-input');
    const currencyElement = screen.getByText('SAR');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('100'); // Check initial value
    expect(currencyElement).toBeInTheDocument();
  });

  test('applies dynamic styles based on the amount', () => {
    render(<IPayAmountInput amount="50" onAmountChange={() => { }} />);

    const inputElement = screen.getByTestId('amount-input');
    const currencyElement = screen.getByText('SAR');

    // Expect the input to have the primary color when amount is non-empty
    expect(inputElement).toHaveStyle('color: #04334D');
    // Expect the currency text to have the primary color when amount is non-empty
    expect(currencyElement).toHaveStyle('color: #04334D');
  });

  test('calls onAmountChange function when input value changes', () => {
    const onAmountChangeMock = jest.fn();
    render(<IPayAmountInput amount="" onAmountChange={onAmountChangeMock} />);

    const inputElement = screen.getByTestId('amount-input');

    // Simulate input change
    fireEvent.change(inputElement, { target: { value: '200' } });

    // Expect the change handler to be called with the new value
    expect(onAmountChangeMock).toHaveBeenCalledWith('200');
  });

  test('applies placeholder color when the amount is empty', () => {
    render(<IPayAmountInput amount="" onAmountChange={() => { }} />);

    const inputElement = screen.getByTestId('amount-input');
    const currencyElement = screen.getByText('SAR');

    // Expect the input to have the natural300 color when amount is empty
    expect(inputElement).toHaveStyle('color: #BDBDBD');
    // Expect the currency text to have the natural300 color when amount is empty
    expect(currencyElement).toHaveStyle('color: #BDBDBD');
  });
});
