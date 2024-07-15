import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IPayAccountBalance from './ipay-account-balance.component';
import useTheme from '@app/styles/hooks/theme.hook';
import useLocalization from '@app/localization/hooks/localization.hook';

// Mock hooks
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@app/localization/hooks/localization.hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('IPayAccountBalance', () => {
  const balance = '100.00';
  const onPressTopup = jest.fn();
  const colors = {
    primary: {
      primary500: '#00BAFE',
    },
    natural: {
      natural4: '#000000',
    },
  };
  const localizationText = {
    HOME: {
      ACCOUNT_BALANCE: 'Account Balance',
    },
    COMMON: {
      TOP_UP: 'Top Up',
      IPaySafeAreaView: 'Safe Area',
    },
  };

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ colors });
    (useLocalization as jest.Mock).mockReturnValue(localizationText);
  });

  it('renders the component correctly', () => {
    const { getByTestId, getByText } = render(<IPayAccountBalance balance={balance} onPressTopup={onPressTopup} />);

    expect(getByTestId('account-balance-component-base-view')).toBeTruthy();
    expect(getByText('Account Balance')).toBeTruthy();
    expect(getByTestId('balance-text-sub-headline-text-base-text').props.children).toBe(balance);
    expect(getByText('Safe Area')).toBeTruthy();
    expect(getByText('Top Up')).toBeTruthy();
  });

  it('displays the correct balance', () => {
    const { getByTestId } = render(<IPayAccountBalance balance={balance} onPressTopup={onPressTopup} />);

    expect(getByTestId('balance-text-sub-headline-text-base-text').props.children).toBe(balance);
  });

  it('calls onPressTopup when the top-up button is pressed', () => {
    const { getByTestId } = render(<IPayAccountBalance balance={balance} onPressTopup={onPressTopup} />);

    fireEvent.press(getByTestId('topup-button-pressable'));
    expect(onPressTopup).toHaveBeenCalled();
  });
});
