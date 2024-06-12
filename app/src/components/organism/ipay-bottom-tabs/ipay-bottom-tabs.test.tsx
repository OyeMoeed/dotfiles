import { fireEvent, render } from '@testing-library/react-native';
import IPayBottomTabs from './ipay-bottom-tabs.component';

describe('IPayBottomTabs', () => {
  const description = 'description';
  const state = 1;
  const navigation = 'Home';
  it('display bottom Tabs', () => {
    const { getByTestId } = render(<IPayBottomTabs testID="IPayBottomTabs" descriptors={description} state={state} />);
    expect(description).toBeTruthy();
    const IPayBottomTabsId = getByTestId('IPayBottomTabs-base-view');
    fireEvent.press(IPayBottomTabsId);
  });
  it('renders correctly', () => {
    const { getByTestId } = render(
      <IPayBottomTabs testID="IPayBottomTabs" descriptors={description} state={state} navigation={navigation} />,
    );
    expect(description).toBeTruthy();
    const IPayBottomTabsId = getByTestId('IPayBottomTabs-base-view');
    fireEvent.press(IPayBottomTabsId);
  });
});
