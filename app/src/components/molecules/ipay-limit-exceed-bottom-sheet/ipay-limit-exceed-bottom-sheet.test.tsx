import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import IPayLimitExceedBottomSheet from './ipay-limit-exceed-bottom-sheet.component';

jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  send_money: 'Send Money',
  no_remaining_spendings: 'No remaining spendings',
  reached_spending_limit: 'You have reached your spending limit',
  sar: 'SAR',
  not_able_to_send_amount: 'and are not able to send the amount',
  close: 'Close',
  continue: 'Continue',
}));

jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    error: {
      error500: '#ff0000',
    },
    primary: {
      primary800: '#00618D',
    },
  },
}));

jest.mock('@app/utilities/date-helper.util', () => ({
  formatDateAndTime: (date) => {
    // Mocked date formatting
    return date ? '08/03/2024' : '';
  },
}));

jest.mock('@app/utilities/date.const', () => ({
  ShortDate: 'DD/MM/YYYY',
}));

describe('IPayLimitExceedBottomSheet', () => {
  it('renders correctly', () => {
    const { getByText } = render(<IPayLimitExceedBottomSheet amount={100} date={new Date()} />);
    expect(getByText('Send Money')).toBeTruthy();
    expect(getByText('No remaining spendings')).toBeTruthy();
    expect(
      getByText('You have reached your spending limit 100 SAR and are not able to send the amount [08/03/2024]'),
    ).toBeTruthy();
  });

  it('calls handleContinue when the Continue button is pressed', () => {
    const handleContinue = jest.fn();
    const { getByText } = render(
      <IPayLimitExceedBottomSheet amount={100} date={new Date()} handleContinue={handleContinue} />,
    );

    fireEvent.press(getByText('Continue'));
    expect(handleContinue).toHaveBeenCalled();
  });

  it('calls close when the Close button is pressed', () => {
    const close = jest.fn();
    const { getByText } = render(<IPayLimitExceedBottomSheet amount={100} date={new Date()} close={close} />);

    fireEvent.press(getByText('Close'));
    expect(close).toHaveBeenCalled();
  });

  it('presents and closes the bottom sheet using ref methods', async () => {
    const ref = React.createRef();
    const { getByTestId } = render(<IPayLimitExceedBottomSheet ref={ref} amount={100} date={new Date()} />);

    // Simulate presenting the bottom sheet
    ref.current.present();
    await waitFor(() => {
      expect(getByTestId('limit-exceed-bottom-sheet')).toBeTruthy();
    });

    // Simulate closing the bottom sheet
    ref.current.close();
    await waitFor(() => {
      expect(getByTestId('limit-exceed-bottom-sheet')).toBeFalsy();
    });
  });
});
