import { render } from '@testing-library/react-native';
import IPayLargeTitleText from './ipay-large-title-text.component';

describe('IPayLargeTitleText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPayLargeTitleText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPayLargeTitleText>
        <IPayLargeTitleText>Hello Children</IPayLargeTitleText>
      </IPayLargeTitleText>,
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPayLargeTitleText testID="test-id" />);
    expect(getByTestId('test-id-large-text-base-text')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPayLargeTitleText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
