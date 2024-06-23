import { fireEvent, render } from '@testing-library/react-native';
import IPayBalanceBox from './ipay-balancebox.comonent';

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
    const IPayBalanceBoxId = getByTestId('IPayBalanceBox');
    fireEvent.press(IPayBalanceBoxId);
  });
});
