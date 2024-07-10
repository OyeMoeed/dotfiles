
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import IPayCardIssuanceConfirmation from './ipay-card-issuance-confirmation-details.component';

// Mocking the localization and theme hooks
jest.mock('@app/localization/hooks/localization.hook');
jest.mock('@app/styles/hooks/theme.hook');

describe('IPayCardIssuanceConfirmation Component', () => {
  beforeEach(() => {
    // Setting up mock data for localization and theme
    useLocalization.mockReturnValue({
      HOLDERS_NAME: 'Holder\'s Name',
      Adam_Ahmed: 'Adam Ahmed',
      CARD_TYPE: 'Card Type',
      MADA_DEBIT_CARD: 'MADA Debit Card',
      ISSUANCE_FEE: 'Issuance Fee',
      HUNDERED_SAR: '100 SAR',
      terms_and_conditions_text: 'I agree to the Terms and Conditions',
      confirm: 'Confirm',
    });

    useTheme.mockReturnValue({
      colors: {
        natural: {
          natural300: '#cccccc',
        },
        primary: {
          primary500: '#ff0000',
        },
      },
    });
  });

  it('renders correctly', () => {
    // Rendering the component
    const { asFragment } = render(<IPayCardIssuanceConfirmation />);
    // Creating a snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct information', () => {
    // Rendering the component
    render(<IPayCardIssuanceConfirmation /> / >);

    // Checking if text content is displayed correctly
    expect(screen.getByText('Holder\'s Name')).toBeInTheDocument();
    expect(screen.getByText('Adam Ahmed')).toBeInTheDocument();
    expect(screen.getByText('Card Type')).toBeInTheDocument();
    expect(screen.getByText('MADA Debit Card')).toBeInTheDocument();
    expect(screen.getByText('Issuance Fee')).toBeInTheDocument();
    expect(screen.getByText('100 SAR')).toBeInTheDocument();
    expect(screen.getByText('I agree to the Terms and Conditions')).toBeInTheDocument();
  });

  it('calls openTermsRef when the terms and conditions are clicked', () => {
    // Mocking the ref method
    const showTermsAndConditionsMock = jest.fn();
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { showTermsAndConditions: showTermsAndConditionsMock } });

    // Rendering the component
    render(<IPayCardIssuanceConfirmation />);

    // Simulating a click on the terms and conditions pressable
    fireEvent.click(screen.getByText('I agree to the Terms and Conditions'));

    // Verifying the function call
    expect(showTermsAndConditionsMock).toHaveBeenCalled();
  });

  it('renders the confirm button', () => {
    // Rendering the component
    render(<IPayCardIssuanceConfirmation />);

    // Checking if the confirm button is rendered
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});
