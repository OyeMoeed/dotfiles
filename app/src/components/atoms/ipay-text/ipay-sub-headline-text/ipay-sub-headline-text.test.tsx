import { render } from '@testing-library/react-native';
import IPaySubHeadlineText from './ipay-sub-headline-text.component';

describe('IPaySubHeadlineText Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<IPaySubHeadlineText text="Hello World" />);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <IPaySubHeadlineText>
        <IPaySubHeadlineText>Hello Children</IPaySubHeadlineText>
      </IPaySubHeadlineText>,
    );
    expect(getByText('Hello Children')).toBeTruthy();
  });

  it('renders with testID prop', () => {
    const { getByTestId } = render(<IPaySubHeadlineText testID="test-id" />);
    expect(getByTestId('test-id-sub-headline-text-base-text')).toBeTruthy();
  });

  it('renders with specified number of lines', () => {
    const { getByText } = render(<IPaySubHeadlineText text="Multiple Lines" numberOfLines={2} />);
    const textComponent = getByText('Multiple Lines');
    expect(textComponent.props.numberOfLines).toBe(2);
  });
});
