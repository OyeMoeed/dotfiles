import { IPayText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { createRef } from 'react';
import IPayCalendarBottomSheet from './ipay-calendar-bottom-sheet.component';

jest.mock('@app/localization/hooks/localization.hook');
jest.mock('../ipay-calendar/ipay-calendar.component', () => 'IPayCalendar');

jest.mock('@app/components/organism', () => ({
  IPayBottomSheet: jest.fn().mockImplementation(({ children, ...props }) => (
    <IPayView {...props}>
      <IPayText>{props.heading}</IPayText>
      {children}
    </IPayView>
  )),
}));

jest.mock('../../atoms/ipay-view/ipay-view.component', () => 'IPayView');

describe('IPayCalendarBottomSheet', () => {
  const renderCalendarBottomSheet = (props = {}) => {
    const ref = createRef();
    return {
      ...render(<IPayCalendarBottomSheet ref={ref} {...props} />),
      ref,
    };
  };

  test('should render the IPayCalendarBottomSheet component', () => {
    renderCalendarBottomSheet();

    const bottomSheet = screen.getByText('Select Date');
    expect(bottomSheet).toBeTruthy();
  });

  test('should display custom heading when provided', () => {
    const customHeading = 'Custom Heading';
    renderCalendarBottomSheet({ heading: customHeading });

    expect(screen.getByText(customHeading)).toBeTruthy();
  });

  test('should call onDateSelected when a date is selected', () => {
    const mockOnDateSelected = jest.fn();
    renderCalendarBottomSheet({ onDateSelected: mockOnDateSelected });

    // Simulate date selection
    const selectedDate = '2024-06-10';
    fireEvent(screen.getByText('IPayCalendar'), 'onDateSelected', selectedDate);

    expect(mockOnDateSelected).toHaveBeenCalledTimes(1);
    expect(mockOnDateSelected).toHaveBeenCalledWith(selectedDate);
  });

  test('should call present method when ref is used', () => {
    const { ref } = renderCalendarBottomSheet();

    // Mock the present method
    ref.current.present = jest.fn();

    ref.current.present();

    expect(ref.current.present).toHaveBeenCalled();
  });

  test('should call close method when ref is used', () => {
    const { ref } = renderCalendarBottomSheet();

    // Mock the close method
    ref.current.close = jest.fn();

    ref.current.close();

    expect(ref.current.close).toHaveBeenCalled();
  });
});
