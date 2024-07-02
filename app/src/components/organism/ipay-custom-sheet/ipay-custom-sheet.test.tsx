import { IPayView } from '@app/components/atoms';
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
    useAnimatedGestureHandler: jest.fn(() => jest.fn()),
    useSharedValue: jest.fn().mockReturnValue({ value: 0 }),
    useAnimatedStyle: jest.fn().mockReturnValue({
      transform: [{ translateY: 1 }],
    }),
    withSpring: jest.fn(),
  };
});

jest.mock('@app/assets/svgs', () => ({
  LogoIcon: jest.fn((props) => <icon {...props} />),
}));

jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
}));

jest.mock('react-native-gesture-handler', () => ({
  PanGestureHandler: jest.fn((props) => <div {...props}>{props.children}</div>),
  ScrollView: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

jest.mock('@components/atoms', () => ({
  IPayLinearGradientView: jest.fn((props) => {
    return <div {...props}>{props.children}</div>;
  }),
  IPayView: jest.fn((props) => <div {...props}>{props.children}</div>),
  IPayAnimatedView: jest.fn((props) => <div {...props}>{props.children}</div>),
}));

describe('IPayCustomSheet', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <IPayCustomSheet testID="test-id">
        <IPayView />
      </IPayCustomSheet>,
    );

    expect(getByTestId('test-id')).toBeDefined();
  });

  it('renders gradient correctly', () => {
    const { getByTestId } = render(
      <IPayCustomSheet testID="test-id">
        <IPayView />
      </IPayCustomSheet>,
    );

    expect(getByTestId('test-id-gradient')).toBeDefined();
  });

  it('renders logo icon', () => {
    const { getByTestId } = render(
      <IPayCustomSheet testID="test-id">
        <IPayView />
      </IPayCustomSheet>,
    );

    expect(getByTestId('test-id-logo')).toBeDefined();
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <IPayCustomSheet testID="test-id">
        <IPayView testID="children" />
      </IPayCustomSheet>,
    );

    expect(getByTestId('children')).toBeDefined();
  });
});
