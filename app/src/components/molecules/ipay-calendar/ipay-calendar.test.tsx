import { IPayDatePicker } from '@app/components/atoms';
import { IPayDatePickerProps } from '@app/components/atoms/ipay-date-picker/ipay-date-picker.interface';
import { fireEvent, render, screen } from '@testing-library/react-native';
import moment from 'moment';
import IPayCalendar from './ipay-calendar.component';

const renderIPayCalendar = (props = {}) => {
  const defaultProps = {
    onDateSelected: jest.fn(),
    ...props,
  };
  return render(<IPayCalendar {...defaultProps} />);
};

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: { primary: { primary500: '#123456' }, natural: { natural100: '#111111' }, primaryWithOpacity: '#12345680' },
  }),
}));

const ArrowLeft = () => <ArrowLeft />;
const ArrowRight = () => <ArrowRight />;

jest.mock('@app/assets/svgs', () => ({
  ArrowLeft,
  ArrowRight,
}));

const MockDatePicker = ({ onDateChange }: IPayDatePickerProps) => (
  <IPayDatePicker testID="dateTimePicker" onDateChange={onDateChange} />
);

jest.mock('@app/components/atoms', () => {
  const DatePicker = ({ onDateChange }: IPayDatePickerProps) => {
    // Mock implementation of the DatePicker component
    return <MockDatePicker onDateChange={onDateChange} />;
  };

  return {
    ...jest.requireActual('@app/components/atoms'), // Use the actual implementation for other components
    DatePicker, // Mock DatePicker component
  };
});

test('should render the IPayCalendar component', () => {
  renderIPayCalendar();

  const calendar = screen.getByTestId('calendar');
  expect(calendar).toBeTruthy(); // Assert the calendar exists
});

test('should render the initial date in the header', () => {
  renderIPayCalendar();

  const currentMonthYear = moment().format('MMMM YYYY');
  expect(screen.getByText(currentMonthYear)).toBeTruthy();
});

test('should call onDateSelected callback when a date is selected', () => {
  const mockOnDateSelected = jest.fn();
  renderIPayCalendar({ onDateSelected: mockOnDateSelected });

  // Simulate date selection
  const dateData = { dateString: moment().format('YYYY-MM-DD'), timestamp: moment().valueOf() };
  fireEvent.press(screen.getByText(moment().format('DD'))); // Adjust selector based on the implementation

  expect(mockOnDateSelected).toHaveBeenCalledTimes(1);
  expect(mockOnDateSelected).toHaveBeenCalledWith(moment(dateData.timestamp).toISOString());
});

test('should go to previous month when ArrowLeft is pressed', () => {
  renderIPayCalendar();

  const prevMonth = moment().subtract(1, 'month').format('MMMM YYYY');
  fireEvent.press(screen.getByText('ArrowLeft'));

  expect(screen.getByText(prevMonth)).toBeTruthy();
});

test('should go to next month when ArrowRight is pressed', () => {
  renderIPayCalendar();

  const nextMonth = moment().add(1, 'month').format('MMMM YYYY');
  fireEvent.press(screen.getAllByText('ArrowRight')[1]);

  expect(screen.getByText(nextMonth)).toBeTruthy();
});

test('should toggle date picker visibility when the month year text is pressed', () => {
  renderIPayCalendar();

  fireEvent.press(screen.getByText(moment().format('MMMM YYYY')));

  const datePicker = screen.queryByTestId('testID - dateTimePicker');
  expect(datePicker).toBeTruthy(); // Check if date picker is visible
});

test('should call onDateSelected when date is changed through the wheel picker', () => {
  const mockOnDateSelected = jest.fn();
  renderIPayCalendar({ onDateSelected: mockOnDateSelected });

  fireEvent.press(screen.getByText(moment().format('MMMM YYYY'))); // Open date picker

  // Simulate wheel picker date change
  const newDate = moment().add(1, 'month').format('YYYY-MM-DD');
  fireEvent(screen.getByTestId('dateTimePicker'), 'onDateChange', { date: newDate });

  expect(mockOnDateSelected).toHaveBeenCalledTimes(1);
  expect(mockOnDateSelected).toHaveBeenCalledWith(newDate);
});

test('should render marked dates correctly', () => {
  renderIPayCalendar();

  const today = moment().format('YYYY-MM-DD');
  const markedDate = screen.getByTestId(`calendar-marked-date-${today}`); // Adjust selector based on implementation

  expect(markedDate).toBeTruthy();
});
