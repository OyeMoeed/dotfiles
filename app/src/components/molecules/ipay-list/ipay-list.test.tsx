import images from '@app/assets/images';
import { fireEvent, render } from '@testing-library/react-native';
import IPayList from './ipay-list.component';
import { IPayIcon } from '@app/components/atoms';

describe('IPayList', () => {
  it('renders correctly with the given title and variant', () => {
    // Arrange
    const testTitle = 'Test Title'; // Directly using the string value
    const testVariant = 'white'; // Directly using the string value

    // Act
    const { getByTestId } = render(
      <IPayList
        onPress
        testID="isShowIcon"
        bgColor={testVariant}
        imageSource={images.dummyUrl}
        isShowIcon
        title={testTitle}
      />,
    );

    const isShowIcon = getByTestId('isShowIcon');
    fireEvent.press(isShowIcon);
  });

  it('renders correctly with the given Subtitle and variant', () => {
    // Arrange
    const Subtitle = 'Test Subtitle'; // Directly using the string value
    const testVariant = 'white'; // Directly using the string value

    // Act
    const { getByTestId } = render(
      <IPayList
        onPress
        testID="isShowIcon"
        bgColor={testVariant}
        icon={<IPayIcon icon='arrow-down' />}
        isShowIcon
        title={Subtitle}
      />,
    );

    const isShowIcon = getByTestId('isShowIcon');
    fireEvent.press(isShowIcon);
  });

  it('renders correctly with the given counter-Button', () => {
    // Arrange
    const title = 'Counter-Button'; // Directly using the string value
    const bgColor = 'white'; // Directly using the string value
    const subTitle = 'SubTitle';

    // Act
    const { getByTestId } = render(
      <IPayList
        onPress
        onPressDown,
        onPressUp,
        testID="isShowIcon"
        bgColor={bgColor}
        isShowCounterButton
        title={title}
        subTitle={subTitle}
      />,
    );

    const isShowIcon = getByTestId('isShowIcon');
    fireEvent.press(isShowIcon);
  });
});
