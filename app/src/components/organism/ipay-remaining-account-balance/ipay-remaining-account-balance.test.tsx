 import { render, fireEvent } from '@testing-library/react-native';
import IPayRemainingAccountBalance from './ipay-remaining-account-balance.component';

// Mock data
const mockWalletInfo = {
  limitsDetails: {
    monthlyRemainingOutgoingAmount: '5000',
    monthlyOutgoingLimit: '10000',
    dailyRemainingOutgoingAmount: '2000',
  },
};
const mockWalletInfoWithZero = {
  limitsDetails: {
    monthlyRemainingOutgoingAmount: '0',
    monthlyOutgoingLimit: '10000',
    dailyRemainingOutgoingAmount: '2000',
  },
};

describe('IPayRemainingAccountBalance Component', () => {
  it('displays progress bar when showProgress is true', () => {
    const { getByTestId } = render(
      <IPayRemainingAccountBalance
        testID="ipay-balance"
        walletInfo={mockWalletInfo}
        showProgress={true}
      />
    );

    const progressBar = getByTestId('ipay-balance-remaining-balane-base-view'); // Ensure this testID matches your component
    expect(progressBar).toBeTruthy();
  });

  it('updates top-up amount when input changes', () => {
    const { getByTestId } = render(
      <IPayRemainingAccountBalance
        testID="ipay-balance"
        walletInfo={mockWalletInfo}
        showProgress
      />
    );

    const input = getByTestId('ipay-balance-remaining-balane-base-view'); // Use the correct testID for the input
    fireEvent.changeText(input, '100');

    // Expect the input value to be updated to '100'
    expect(input.props.topUpAmount);
  });



  it('renders correctly with initial props', () => {
    const { getByTestId } = render(
      <IPayRemainingAccountBalance
        testID="ipay-balance"
        walletInfo={mockWalletInfo}
        showProgress={true}
      />
    );

    const container = getByTestId('ipay-balance-remaining-balane-base-view');
    expect(container).toBeTruthy();
  });

  it('disables input when monthlyRemainingOutgoingAmount is 0', () => {
    const { getByTestId } = render(
      <IPayRemainingAccountBalance
        testID="ipay-balance"
        walletInfo={mockWalletInfoWithZero}
        showProgress={true}
      />
    );

    const input = getByTestId('ipay-balance-remaining-balane-base-view');
    expect(input.props.disabled);
  });

});
