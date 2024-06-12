import { render } from '@testing-library/react-native';
import IPayPickerButton from './ipay-picker-button.component';

// Mock the enum
jest.mock('@app/utilities/enums.util', () => ({
  dayPeriod: {
    AM: 'AM',
    PM: 'PM',
  },
}));

describe('PickerButton Component', () => {
  it('renders correctly with variant="date"', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IPayPickerButton testID="test-id" variant="date" date={new Date()} onPress={onPressMock} />,
    );
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders correctly with variant="time"', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IPayPickerButton testID="test-id" variant="time" date={new Date()} onPress={onPressMock} />,
    );
    expect(getByTestId('test-id')).toBeTruthy();
  });
  it('renders correctly with variant="date"', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IPayPickerButton testID="test-id" variant="date" date={new Date()} onPress={onPressMock} />,
    );
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders correctly with variant="time"', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IPayPickerButton testID="test-id" variant="time" date={new Date()} onPress={onPressMock} />,
    );
    expect(getByTestId('test-id')).toBeTruthy();
  });
  it('renders correctly with variant="date"', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IPayPickerButton testID="test-id" variant="date" date={new Date()} onPress={onPressMock} />,
    );
    expect(getByTestId('test-id')).toBeTruthy();
  });

  it('renders correctly with variant="time"', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <IPayPickerButton testID="test-id" variant="time" date={new Date()} onPress={onPressMock} />,
    );
    expect(getByTestId('test-id')).toBeTruthy();
  });
});
