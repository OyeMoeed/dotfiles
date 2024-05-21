import { render } from '@testing-library/react-native';
import React from 'react';

import RNText from '../text/rn-base-text/rn-text.component';
import IPayLinerGradientView from './ipay-linear-gradient.component';

jest.mock('@app/styles/theming/theme.hook');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('IPayLinerGradientView', () => {
  const mockColors = {
    gradient1: ['#000000', '#ffffff']
  };

  //   beforeEach(() => {
  //     (useTheme as jest.Mock).mockReturnValue({ colors: mockColors });
  //   });

  test('renders correctly with default props', () => {
    const { getByText } = render(
      <IPayLinerGradientView>
        <RNText>Test Child</RNText>
      </IPayLinerGradientView>
    );

    expect(getByText('Test Child')).toBeDefined();
  });

  test('renders correctly with custom gradientColors', () => {
    const customColors = ['#ff0000', '#00ff00'];
    const { getByTestId } = render(
      <IPayLinerGradientView testID="linear-gradient" gradientColors={customColors}>
        <RNText>Test Child</RNText>
      </IPayLinerGradientView>
    );

    const linearGradient = getByTestId('linear-gradient');
    expect(linearGradient.props.colors).toEqual(customColors);
  });

  test('applies correct default start and end points', () => {
    const { getByTestId } = render(
      <IPayLinerGradientView testID="linear-gradient">
        <RNText>Test Child</RNText>
      </IPayLinerGradientView>
    );

    const linearGradient = getByTestId('linear-gradient');
    expect(linearGradient.props.start).toEqual({ x: 0, y: 1 });
    expect(linearGradient.props.end).toEqual({ x: 1, y: 1 });
  });

  test('applies custom start and end points', () => {
    const customStart = { x: 0.5, y: 0.5 };
    const customEnd = { x: 1, y: 0 };

    const { getByTestId } = render(
      <IPayLinerGradientView testID="linear-gradient" start={customStart} end={customEnd}>
        <RNText>Test Child</RNText>
      </IPayLinerGradientView>
    );

    const linearGradient = getByTestId('linear-gradient');
    expect(linearGradient.props.start).toEqual(customStart);
    expect(linearGradient.props.end).toEqual(customEnd);
  });

  test('applies custom locations', () => {
    const customLocations = [0.1, 0.9];

    const { getByTestId } = render(
      <IPayLinerGradientView testID="linear-gradient" locations={customLocations}>
        <RNText>Test Child</RNText>
      </IPayLinerGradientView>
    );

    const linearGradient = getByTestId('linear-gradient');
    expect(linearGradient.props.locations).toEqual(customLocations);
  });

  test('applies custom styles', () => {
    const customStyle = { padding: 10 };

    const { getByTestId } = render(
      <IPayLinerGradientView testID="linear-gradient" style={customStyle}>
        <RNText>Test Child</RNText>
      </IPayLinerGradientView>
    );

    const linearGradient = getByTestId('linear-gradient');
    expect(linearGradient.props.style).toContainEqual(customStyle);
  });
});
