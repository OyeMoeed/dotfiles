// Import necessary modules
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { render } from '@testing-library/react-native';
import IPayDropdownComponent from './ipay-dropdown.component';

// Mock the modules
jest.mock('@app/localization/hooks/localization.hook');
jest.mock('@app/styles/hooks/theme.hook');

// Define mocked functions with proper typing
const mockUseLocalization = useLocalization as jest.MockedFunction<typeof useLocalization>;
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

// Mock data for testing
const mockData = [
  { id: 1, title: 'City Name 1' },
  { id: 2, title: 'City Name 2' },
  // Add more mock data as needed
];

// Mock useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => () => ({
  search: 'Search...',
  COMMON: {
    NO_RESULTS_FOUND: 'No results found',
  },
}));

describe('<IPayDropdownComponent />', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(
      <IPayDropdownComponent
        list={mockData}
        onSelectListItem={function (item: string): void {
          throw new Error('Function not implemented.');
        }}
        searchText={''}
        setSearchText={() => {}}
      />,
    );
    expect(getByTestId('test-select-city-base-view')).toBeTruthy();
  });

  test('displays no results message', () => {
    const { getByText } = render(
      <IPayDropdownComponent list={[]} onSelectListItem={() => {}} searchText={''} setSearchText={() => {}} />,
    );
    expect(getByText('No results found')).toBeTruthy();
  });
});
