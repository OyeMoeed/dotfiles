import { render } from '@testing-library/react-native';
import IPayPointRedemptionCard from './ipay-point-redemption-card.component';

// Mock the useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: '#0000',
      },
      secondary: {
        secondary300: '#0000',
      },
    },
  }),
}));

describe('IPayPointRedemptionCard', () => {
  const defaultProps = {
    testID: 'ipay-point-redemption-card',
    containerStyle: { backgroundColor: 'white' },
    points: 100,
    pointsStyle: { color: 'red' },
    headerStyle: { marginBottom: 10 },
    backgroundImageStyle: { opacity: 0.5 },
  };

  it('renders correctly without crashing', () => {
    const { getByTestId } = render(<IPayPointRedemptionCard {...defaultProps} />);
    const element = getByTestId('ipay-point-redemption-card');
    expect(element).toBeTruthy();
  });

  it('applies the correct styles and renders the correct elements', () => {
    const { getByTestId, getByText } = render(<IPayPointRedemptionCard {...defaultProps} />);

    const container = getByTestId('ipay-point-redemption-card');
    expect(container.props.style).toContainEqual(defaultProps.containerStyle);

    const headerText = getByText('Akthr Points Redemption');
    expect(headerText).toBeTruthy();

    const pointsText = getByText('100 Points');
    expect(pointsText.props.style).toContainEqual(defaultProps.pointsStyle);

    const yourPointsText = getByText('Your Points');
    expect(yourPointsText).toBeTruthy();

    const pointsValueText = getByText('The value of the points');
    expect(pointsValueText).toBeTruthy();

    const pointsValueAmount = getByText('100 SAR');
    expect(pointsValueAmount).toBeTruthy();
  });

  it('renders correctly without optional props', () => {
    const { getByTestId } = render(<IPayPointRedemptionCard testID="ipay-point-redemption-card" points={100} />);
    const element = getByTestId('ipay-point-redemption-card');
    expect(element).toBeTruthy();
  });

  it('renders the points section only when points prop is provided', () => {
    const { queryByText } = render(<IPayPointRedemptionCard testID="ipay-point-redemption-card" />);
    const pointsText = queryByText('100 Points');
    expect(pointsText).toBeNull();
  });

  it('renders with a custom testID', () => {
    const { getByTestId } = render(<IPayPointRedemptionCard {...defaultProps} testID="custom-card" />);
    const element = getByTestId('custom-card');
    expect(element).toBeTruthy();
  });
});
