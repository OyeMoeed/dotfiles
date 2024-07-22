import { render } from '@testing-library/react-native';
import IPayGradientList from './ipay-gradient-list.component';

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

describe('IPayGradientList Component', () => {
  const mockProps = {
    leftIcon: <></>,
    title: 'Sample Title',
    subtitle: 'Sample Subtitle',
    rightIcon: <></>,
    titleStyle: {},
    subTitleStyle: {},
  };

  it('renders title and subtitle correctly', () => {
    const { getByText } = render(<IPayGradientList {...mockProps} />);

    // Assert that title and subtitle are rendered
    const titleElement = getByText('Sample Title');
    const subtitleElement = getByText('Sample Subtitle');

    expect(titleElement).toBeDefined();
    expect(subtitleElement).toBeDefined();
  });

  it('renders left and right icons when provided', () => {
    const leftIcon = <icon testID="left-icon" />;
    const rightIcon = <icon testID="right-icon" />;
    const { getByTestId } = render(<IPayGradientList {...mockProps} leftIcon={leftIcon} rightIcon={rightIcon} />);

    // Assert that left and right icons are rendered
    const leftIconElement = getByTestId('left-icon');
    const rightIconElement = getByTestId('right-icon');

    expect(leftIconElement).toBeDefined();
    expect(rightIconElement).toBeDefined();
  });
});
