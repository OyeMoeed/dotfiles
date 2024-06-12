import images from '@app/assets/images';
import { fireEvent, render } from '@testing-library/react-native';
import IPayList from './ipay-list.component';

describe('IPayList', () => {
  it('renders correctly with the given title and variant', () => {
    // Arrange
    const testTitle = 'Test Title'; // Directly using the string value
    const testVariant = 'white'; // Directly using the string value

    // Act
    const { getByTestId } = render(
      <IPayList
        onPress={() => console.log('pressed')}
        testID="isShowIcon"
        bgColor={testVariant}
        imageSource={images.logo}
        isShowIcon={false}
        title={testTitle}
        containerStyle={{ flex: 1 }}
        textStyle={{ color: 'white' }}
        subTextStyle={{ color: 'white' }}
        isShowSubTitle={false}
        subTitle="Adam Ahmed"
        isShowDetail={false}
        detailText="Copy"
        detailTextStyle={{ color: 'white' }}
      />,
    );

    const isShowIcon = getByTestId('isShowIcon-pressable');
    fireEvent.press(isShowIcon);
  });

  it('renders correctly with the given Subtitle and variant', () => {
    // Arrange
    const Subtitle = 'Test Subtitle'; // Directly using the string value
    const testVariant = 'white'; // Directly using the string value

    // Act
    const { getByTestId } = render(
      <IPayList
        onPress={() => console.log('pressed Subtitle')}
        testID="isShowIcon"
        bgColor={testVariant}
        icon={<ArrowDownIcon />}
        isShowIcon
        title={Subtitle}
      />,
    );

    const isShowIcon = getByTestId('isShowIcon-pressable');
    fireEvent.press(isShowIcon);
  });

  // it('renders correctly with the given counter-Button', () => {
  //   // Arrange
  //   const title = 'Counter-Button'; // Directly using the string value
  //   const bgColor = 'white'; // Directly using the string value
  //   const subTitle = 'SubTitle';

  //   // Act
  //   const { getByTestId } = render(
  //     <IPayList
  //       onPress={() => console.log('pressed CounterButton')}
  //       onPressDown={() => console.log('Press down')}
  //       onPressUp={() => 'Press Up'}
  //       testID="isShowIcon"
  //       bgColor={bgColor}
  //       isShowCounterButton
  //       title={title}
  //       subTitle={subTitle}
  //     />,
  //   );

  //   const isShowIcon = getByTestId('isShowIcon-pressable');
  //   fireEvent.press(isShowIcon);
  // });
});
