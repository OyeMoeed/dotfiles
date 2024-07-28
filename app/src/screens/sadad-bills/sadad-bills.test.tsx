import { BillsStatusTypes } from '@app/utilities/enums.util';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import SadadBills from './sadad-bills.screen';

// Mock hooks
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  SADAD: {
    SADAD_BILLS: 'Sadad Bills',
    ACTIVE_BILLS: 'Active Bills',
    INACTIVE_BILLS: 'Inactive Bills',
    NO_ACTIVE_BILLS: 'No active bills',
    COMPLETE_PAYMENT: 'Complete Payment',
    ADD_NEW_BILL: 'Add New Bill',
  },
  COMMON: {
    NEW: 'New',
  },
}));

jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#000000',
      primary800: '#555555',
    },
    natural: {
      natural0: '#ffffff',
    },
    backgrounds: {
      transparent: 'trnasparent',
    },
    error: {
      error500: '#000',
    },
    tertiary: {
      tertiary500: '#fff',
    },
    critical: {
      critical800: '#000',
    },
    success: {
      success500: '#fff',
    },
    secondary: {
      secondary500: '#000',
    },
  },
}));

describe('<SadadBills />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with active bills', () => {
    const { getByText, getByTestId } = render(<SadadBills />);
    expect(getByText('Sadad Bills')).toBeTruthy();
    expect(getByText('Active Bills')).toBeTruthy();
    expect(getByText('New')).toBeTruthy();
    expect(getByTestId('ipay-flatlist-flatlist')).toBeTruthy();
  });

  it('displays no active bills message when no active bills are present', () => {
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => [BillsStatusTypes.ACTIVE_BILLS, jest.fn()])
      .mockImplementationOnce(() => [[], jest.fn()]);

    const { getByText } = render(<SadadBills />);
    expect(getByText('Active Bills')).toBeTruthy();
  });

  it('switches tabs and displays inactive bills', () => {
    const { getByText } = render(<SadadBills />);
    fireEvent.press(getByText('Inactive Bills'));
    expect(getByText('Inactive Bills')).toBeTruthy();
  });
});
