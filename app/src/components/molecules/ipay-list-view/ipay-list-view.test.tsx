import { fireEvent, render } from '@testing-library/react-native';
import IPayListView from './ipay-list-view.component';

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary500: '#0000ff',
    },
    natural: {
      natural900: '#444444',
    },
    secondary: {
      secondary100: '#fff',
    },
    tertiary: {
      tertiary50: '#000',
    },
  },
}));

describe('IPayListView', () => {
  const mockList = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ];

  const mockOnPressListItem = jest.fn();

  it('renders correctly', () => {
    const { getByTestId } = render(
      <IPayListView testID="test" list={mockList} selectedListItem={'Item 1'} onPressListItem={mockOnPressListItem} />,
    );
    expect(getByTestId('test-list-view-base-view')).toBeTruthy();
  });

  it('renders list items correctly', () => {
    const { getByText } = render(
      <IPayListView testID="test" list={mockList} selectedListItem={'Item 2'} onPressListItem={mockOnPressListItem} />,
    );
    mockList.forEach((item) => {
      expect(getByText(item.text)).toBeTruthy();
    });
  });

  it('shows the selected icon for the selected list item', () => {
    const { getByText } = render(
      <IPayListView testID="test" list={mockList} selectedListItem="Item 2" onPressListItem={mockOnPressListItem} />,
    );
    expect(getByText('Item 2')).toBeTruthy();
  });

  it('calls onPressListItem with correct item text when a list item is pressed', () => {
    const { getByText } = render(
      <IPayListView testID="test" list={mockList} selectedListItem={'Item 3'} onPressListItem={mockOnPressListItem} />,
    );

    fireEvent.press(getByText('Item 1'));
    expect(mockOnPressListItem).toHaveBeenCalledWith('Item 1');
  });
});
