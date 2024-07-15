// Import necessary modules
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { render } from '@testing-library/react-native';
import IPaySelectListItemComponent from './ipay-select-list-item.component';

// Mock the modules
jest.mock('@app/localization/hooks/localization.hook');
jest.mock('@app/styles/hooks/theme.hook');

// Define mocked functions with proper typing
const mockUseLocalization = useLocalization as jest.MockedFunction<typeof useLocalization>;
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

// Mock data for testing
const mockData = [
  { id: 1, name: 'City Name 1' },
  { id: 2, name: 'City Name 2' },
  // Add more mock data as needed
];

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  search: 'Search...',
  COMMON: {
    NO_RESULTS_FOUND: 'No results found',
  },
}));

describe('<IPaySelectListItemComponent />', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<IPaySelectListItemComponent data={mockData} />);
    expect(getByTestId('test-select-city-base-view')).toBeTruthy();
  });

  test('displays no results message', () => {
    const { getByText } = render(<IPaySelectListItemComponent data={[]} onSelectListItem={() => {}} />);
    expect(getByText('No results found')).toBeTruthy();
  });
});
