import { IPayScrollView, IPayView } from '@app/components/atoms';
import { render } from '@testing-library/react-native';
import IPayCustomSheet from './ipay-custom-sheet.component';

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: { primary500: '#123123' },
      secondary: { secondary300: '#123456' },
      natural: { natural100: '#fff' },
    },
  }),
}));

jest.mock('@app/utilities/constants', () => ({
  isIosOS: true,
}));

jest.mock('react-native-size-matters', () => ({
  verticalScale: jest.fn((value) => value),
}));

jest.mock('react-native-reanimated', () => {
  const reanimated = jest.requireActual('react-native-reanimated');
  return {
    ...reanimated,
    View: jest.fn((props) => <div {...props}>{props.children}</div>),
    useSharedValue: jest.fn().mockReturnValue({ value: 0 }),
    useAnimatedStyle: jest.fn().mockReturnValue({
      transform: [{ translateY: 1 }],
    }),
    withSpring: jest.fn(),
  };
});

jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
}));

jest.mock('@app/assets/svgs', () => ({
  LogoIcon: jest.fn((props) => <icon {...props} />),
}));

jest.mock('react-native-gesture-handler', () => {
  const Gesture = {
    Pan: jest.fn(() => {
      const gesture = {
        onChange: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
      };
      return gesture;
    }),
  };

  return {
    GestureDetector: jest.fn((props) => <div {...props}>{props.children}</div>),
    Gesture,
  };
});

jest.mock('@components/atoms', () => ({
  IPayLinearGradientView: jest.fn((props) => {
    return <div {...props}>{props.children}</div>;
  }),
  IPayView: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayAnimatedView: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayScrollView: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

describe('IPayCustomSheet', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <IPayCustomSheet testID="test-id">
        <IPayView />
      </IPayCustomSheet>,
    );

    expect(getByTestId('test-id-animated')).toBeDefined();
  });

  it('renders gradient correctly', () => {
    const { getByTestId } = render(
      <IPayCustomSheet testID="test-id">
        <IPayView />
      </IPayCustomSheet>,
    );

    expect(getByTestId('test-id-gradient')).toBeDefined();
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <IPayCustomSheet testID="test-id-base-view">
        <IPayScrollView testID="children" />
      </IPayCustomSheet>,
    );

    expect(getByTestId('children')).toBeDefined();
  });
});
