import { IPayFootnoteText } from '@components/atoms/index';
import { render } from '@testing-library/react-native';
import IPayPaginatedFlatList from './ipay-paginated-flatlist.component';
import usePaginatedFetch from './ipay-paginated-flatlist.hook';

// Mock hooks
jest.mock('@app/styles/hooks/theme.hook');
jest.mock('./ipay-paginated-flatlist.hook');

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: '#0000',
      },
      secondary: {
        secondary300: '#0000',
      },
      natural: {
        natural900: '#000000',
      },
      error: {
        error500: '#FF0000',
      },
    },
  }),
}));

// Mocked data for testing
const mockData = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
];
const mockFetchData = jest.fn();
const mockRenderItem = ({ item }) => <IPayFootnoteText text={item.name} />;
const mockKeyExtractor = (item) => item.id;

const setup = (hookStateOverrides = {}) => {
  const defaultHookState = {
    data: mockData,
    loading: false,
    error: null,
    loadMoreData: jest.fn(),
    refreshData: jest.fn(),
    hasMore: true,
  };

  const mergedHookState = { ...defaultHookState, ...hookStateOverrides };
  usePaginatedFetch.mockReturnValue(mergedHookState);

  return render(
    <IPayPaginatedFlatList
      testID="activity-indicator"
      fetchData={mockFetchData}
      renderItem={mockRenderItem}
      keyExtractor={mockKeyExtractor}
    />,
  );
};

describe('<IPayPaginatedFlatList />', () => {
  it('renders correctly with data', () => {
    const { getByText } = setup();

    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
  });

  it('shows loading indicator in footer when loading', () => {
    const { getByTestId } = setup({ loading: true });

    expect(getByTestId('activity-indicator-paginated-flatlist')).toBeTruthy();
  });

  it('displays error message when error occurs', () => {
    const { getByText } = setup({ error: { message: 'An error occurred' } });

    expect(getByText('An error occurred')).toBeTruthy();
  });
});
