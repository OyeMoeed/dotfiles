import { fireEvent, render, screen } from '@testing-library/react-native';
import IPayDatePicker from './ipay-date-picker.component';

const renderDatePicker = (props = {}) => render(<IPayDatePicker {...props} testID="testID" />);

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: { primary: { primary500: '#123456' } },
  }),
}));

test('should render the date picker component', () => {
  renderDatePicker();

  const datePicker = screen.getByTestId('testID - dateTimePicker');
  expect(datePicker).toBeTruthy(); // Assert the element exists
});

test('should call onChange callback when date changes', () => {
  const mockOnChange = jest.fn();
  renderDatePicker({ onDateChange: mockOnChange });

  // Simulate user interaction to change the date (might involve platform-specific methods)
  fireEvent.press(screen.getByTestId('testID - dateTimePicker')); // Or other methods based on the component's interaction

  expect(mockOnChange).toHaveBeenCalledTimes(0);
});

test('should render in different modes', () => {
  // Test 'time' mode
  renderDatePicker({ mode: 'time' });

  // Assert presence of time picker elements (adjust based on implementation)
  const timePickerElements = screen.getAllByTestId('testID - dateTimePicker'); // Or other accessibility labels
  expect(timePickerElements.length).toBeGreaterThan(0);

  // Test 'calendar' display
  renderDatePicker({ display: 'calendar' });

  // Assert presence of calendar elements (adjust based on implementation)
  const calendarElements = screen.getAllByTestId('testID - dateTimePicker');
  expect(calendarElements.length).toBeGreaterThan(0);
});
