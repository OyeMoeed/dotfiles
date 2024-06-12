import { fireEvent, render } from '@testing-library/react-native';
import IPayBalanceBox from './ipay-balancebox.comonent';

// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => {
  return () => ({
    Identity_Verification: 'Identity Verification',
    Identity_Discription: 'Identity Description',
    verify: 'Verify',
  });
});

describe('IPayBalanceBox', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <IPayBalanceBox
        testID="IPayBalanceBox"
        balance="4,200"
        totalBalance="30,0000"
        walletInfoPress={() => console.log('IPayBalanceBox')}
        topUpPress={() => console.log('Top up')}
        quickAction={() => console.log('quick Action')}
      />
    );
    const IPayBalanceBoxId = getByTestId('IPayBalanceBox-base-view');
    fireEvent.press(IPayBalanceBoxId);
  });
});
