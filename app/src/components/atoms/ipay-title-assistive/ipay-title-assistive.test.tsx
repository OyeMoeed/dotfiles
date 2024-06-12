import { render } from '@testing-library/react-native';
import IPayTitleAssistive from './ipay-title-assistive.component';

describe('IPayTitleAssistive', () => {
  test('renders heading and text correctly', () => {
    const heading = 'Title';
    const text = 'This is some text.';
    const { getByText } = render(<IPayTitleAssistive heading={heading} text={text} />);

    // Assert that the heading and text are rendered correctly
    expect(getByText(heading)).toBeDefined();
    expect(getByText(text)).toBeDefined();
  });
});
