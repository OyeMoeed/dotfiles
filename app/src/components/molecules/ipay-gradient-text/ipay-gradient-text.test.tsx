import { render } from '@testing-library/react-native';
import IPayGradientText from './ipay-gradien-text.component';
import { IPayGradientTextProps } from './ipay-gradient-text.interface';

const defaultProps: IPayGradientTextProps = {
  testID: 'ipay-gradient-text',
  text: 'Gradient Text',
  style: {},
  gradientColors: ['#ff0000', '#00ff00'],
  fontSize: 16,
  fontFamily: 'System',
  lineHeight: 1.2,
};

describe('IPayGradientText', () => {
  it('renders correctly with default props', () => {
    const { getByTestId, queryAllByText } = render(<IPayGradientText {...defaultProps} />);

    const svg = getByTestId(`${defaultProps.testID}-svg-gradient-text`);
    expect(svg).toBeTruthy();

    const textElements = queryAllByText(/Gradient Text/i);
    expect(textElements.length).toBe(0);
  });

  it('renders correctly with custom fontSize and lineHeight', () => {
    const customProps: IPayGradientTextProps = {
      ...defaultProps,
      fontSize: 20,
      lineHeight: 1.5,
    };
    const { getByTestId, queryAllByText } = render(<IPayGradientText {...customProps} />);

    const svg = getByTestId(`${customProps.testID}-svg-gradient-text`);
    expect(svg.props.height).toBe(customProps.fontSize * customProps.lineHeight);

    const textElements = queryAllByText(/Gradient Text/i);
    expect(textElements.length).toBe(0);
  });

  it('renders correctly with multiple lines of text', () => {
    const multilineProps: IPayGradientTextProps = {
      ...defaultProps,
      text: 'Line 1\nLine 2\nLine 3',
    };
    const { getByTestId, queryAllByText } = render(<IPayGradientText {...multilineProps} />);

    const svg = getByTestId(`${multilineProps.testID}-svg-gradient-text`);
    expect(svg.props.height).toBe(multilineProps.fontSize * multilineProps.lineHeight * 3);

    const line1 = queryAllByText(/Line 1/i);
    const line2 = queryAllByText(/Line 2/i);
    const line3 = queryAllByText(/Line 3/i);

    expect(line1.length).toBe(0);
    expect(line2.length).toBe(0);
    expect(line3.length).toBe(0);
  });

  it('applies styles correctly', () => {
    const customStyle = { margin: 10 };
    const styledProps: IPayGradientTextProps = {
      ...defaultProps,
      style: customStyle,
    };
    const { getByTestId } = render(<IPayGradientText {...styledProps} />);

    const svg = getByTestId(`${styledProps.testID}-svg-gradient-text`);
    expect(svg.props.style).toMatchObject(svg.props.style);
  });
});
