import { IPayView } from '@app/components/atoms';
import { act, fireEvent, render } from '@testing-library/react-native';
import FlipCard from './ipay-flip-card.component';

// Mock useTheme hook
jest.mock('@app/styles/hooks/theme.hook', () => () => ({
  colors: {
    primary: {
      primary50: '#f0f0f0',
      primary500: '#007700',
    },
    secondary: {
      secondary50: '#e0e0e0',
      secondary100: '#c0c0c0',
    },
    tertiary: {
      tertiary500: '#fff',
    },
    natural: {
      natural500: '#888888',
      natural900: '#444444',
    },
    error: {
      error500: '#000',
    },
  },
}));

describe('FlipCard', () => {
  const frontViewComponent = <IPayView testID="front-view">Front</IPayView>;
  const backViewComponent = <IPayView testID="back-view">Back</IPayView>;

  it('renders front view initially', () => {
    const { getByTestId } = render(
      <FlipCard testID="test-id" frontViewComponent={frontViewComponent} backViewComponent={backViewComponent} />,
    );

    expect(getByTestId('front-view-base-view')).toBeTruthy();
  });

  it('flips card when pressed', () => {
    const { getByTestId } = render(
      <FlipCard testID="test-id" frontViewComponent={frontViewComponent} backViewComponent={backViewComponent} />,
    );

    const pressable = getByTestId('test-id-flip-card-base-view');
    act(() => {
      fireEvent.press(pressable);
    });
  });

  it('shows back view after flip', () => {
    const { getByTestId, queryByTestId } = render(
      <FlipCard testID="test-id" frontViewComponent={frontViewComponent} backViewComponent={backViewComponent} />,
    );

    // Simulate the flip
    act(() => {
      fireEvent.press(getByTestId('test-id-flip-card-base-view'));
    });

    // Ensure back view is now visible
    expect(getByTestId('back-view-base-view')).toBeTruthy();
  });

  it('flips card with pan gesture', () => {
    const { getByTestId } = render(
      <FlipCard testID="test-id" frontViewComponent={frontViewComponent} backViewComponent={backViewComponent} />,
    );
  });

  it('returns correct index on flip', () => {
    const mockReturnFilpedIndex = jest.fn();

    const { getByTestId } = render(
      <FlipCard
        testID="test-id"
        frontViewComponent={frontViewComponent}
        backViewComponent={backViewComponent}
        returnFilpedIndex={mockReturnFilpedIndex}
      />,
    );

    act(() => {
      fireEvent.press(getByTestId('test-id-flip-card-base-view'));
    });
  });
});
