import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IPayList from './ipay-list.component';
import images from '@app/assets/images';
import ArrowDownSVG from '@app/assets/svgs/arrow-down.icon';

describe('IPayList', () => {
  it('renders correctly with the given title and variant', () => {
    // Arrange
    const testTitle = 'Test Title'; // Directly using the string value
    const testVariant = 'white'; // Directly using the string value

    // Act
    const { getByTestId } = render(
      <IPayList
        onPress={() => console.log('pressed')}
        testID={'isShowIcon'}
        bgColor={testVariant}
        imageSource={images.dummyUrl}
        isShowIcon
        title={testTitle}
      />
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
        onPress={() => console.log('pressed Subtitle')}
        testID={'isShowIcon'}
        bgColor={testVariant}
        icon={<ArrowDownSVG />}
        isShowIcon
        title={Subtitle}
      />
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
        onPress={() => console.log('pressed CounterButton')}
        onPressDown={() => console.log('Press down')}
        onPressUp={() => 'Press Up'}
        testID={'isShowIcon'}
        bgColor={bgColor}
        isShowCounterButton
        title={title}
        subTitle={subTitle}
      />
    );

    const isShowIcon = getByTestId('isShowIcon');
    fireEvent.press(isShowIcon);
  });
});
