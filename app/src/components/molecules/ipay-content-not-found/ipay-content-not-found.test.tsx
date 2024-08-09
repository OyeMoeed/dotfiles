import { render } from '@testing-library/react-native';
import IPayContentNotFound from './ipay-content-not-found.component';
import { ContentNotFoundProps } from './ipay-content-not-found.interface';

// Mock components and hooks
jest.mock('@app/components/atoms', () => ({
  IPayView: jest.fn((props) => <div {...props} data-testid={`${props['data-testid']}`} />),
  IPayTitle2Text: jest.fn((props) => <div {...props} data-testid={`${props['data-testid']}`} />),
  IPayCaption1Text: jest.fn((props) => <div {...props} data-testid={`${props['data-testid']}`} />),
}));

jest.mock('@app/components/molecules', () => ({
  IPayButton: jest.fn(({ btnText, onPress, ...props }) => (
    <button onClick={onPress} {...props}>
      {btnText}
    </button>
  )),
}));

jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary900: '#ff0000',
    },
    critical: {
      critical800: '#ff0000', // Mocking critical800 color
    },
    natural: {
      natural700: '#888888', // Mocking natural700 color
      natural0: '#fff',
      natural900: '#fff',
    },
    success: {
      success500: '#00ff00', // Mocking success500 color
    },
    secondary: {
      secondary500: '#0000ff', // Mocking secondary500 color
    },
    // Add more mock colors as needed
  },
}));

const mockProps: ContentNotFoundProps = {
  title: 'Mock Title',
  message: 'Mock Message',
  onBtnPress: jest.fn(),
  icon: <div data-testid="mock-icon">Icon</div>,
  btnText: 'Mock Button',
  btnStyle: { backgroundColor: 'blue' },
  isShowButton: true,
};

describe('IPayContentNotFound', () => {
  const testID = 'test-id';

  it('renders title and message correctly', () => {
    const { getByTestId } = render(<IPayContentNotFound testID={testID} {...mockProps} />);

    expect(getByTestId(`${testID}-title`)).toBeTruthy();
    expect(getByTestId(`${testID}-message`)).toBeTruthy();
  });

  it('renders button with correct text and style if isShowButton is true', () => {
    const { getByTestId } = render(<IPayContentNotFound testID={testID} {...mockProps} />);

    expect(getByTestId(`${testID}-button`)).toBeTruthy();
  });

  it('does not render button if isShowButton is false', () => {
    const { queryByTestId } = render(
      <IPayContentNotFound testID={testID} {...{ ...mockProps, isShowButton: false }} />,
    );

    expect(queryByTestId(`${testID}-button`)).toBeNull();
  });
});
