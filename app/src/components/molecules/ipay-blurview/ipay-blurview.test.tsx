// ConditionalBlurView.test.tsx
import { render } from '@testing-library/react-native';
import IPayBlurView from './ipay-blurview.component';

describe('IPayBlurView', () => {
  it('should not render BlurView when appState is "active"', () => {
    const { queryByTestId } = render(<IPayBlurView />);

    // BlurView should not be rendered
    expect(queryByTestId('blur-view')).toBeNull();
  });

  it('should render BlurView when appState is not "active"', () => {
    const { getByTestId } = render(<IPayBlurView testID="blur-view" />);

    // BlurView should be rendered
    expect(getByTestId('blur-view')).toBeTruthy();
  });

  it('should use default blur properties when not provided', () => {
    const { getByTestId } = render(<IPayBlurView testID="blur-view" />);

    // BlurView should have default properties
    const blurView = getByTestId('blur-view');
    expect(blurView.props.blurType).toBe('light');
    expect(blurView.props.blurAmount).toBe(10);
    expect(blurView.props.reducedTransparencyFallbackColor).toBe('white');
  });

  it('should use provided blur properties when specified', () => {
    const { getByTestId } = render(
      <IPayBlurView testID="blur-view" blurType="dark" blurAmount={20} reducedTransparencyFallbackColor="black" />,
    );

    // BlurView should have specified properties
    const blurView = getByTestId('blur-view');
    expect(blurView.props.blurType).toBe('dark');
    expect(blurView.props.blurAmount).toBe(20);
    expect(blurView.props.reducedTransparencyFallbackColor).toBe('black');
  });
});
