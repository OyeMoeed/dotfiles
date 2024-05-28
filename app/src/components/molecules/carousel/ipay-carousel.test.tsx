import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import IPayCarousel from './ipay-carousel.component';
import { IPayCarouselProps } from './ipay-carousel.interface';

jest.mock('@app/styles/hooks/theme.hook', () => ({
  __esModule: true,
  default: () => ({
    colors: {
      primary: {
        primary500: 'blue',
      },
      natural: {
        natural300: 'gray',
      },
    },
  }),
}));

jest.mock('react-native-reanimated-carousel', () => 'Carousel');
jest.mock('@components/atoms/index', () => ({
  IPayPressable: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  IPayView: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('IPayCarousel Component', () => {
  const defaultProps: IPayCarouselProps = {
    data: ['item1', 'item2', 'item3'],
    renderItem: ({ item }) => <div>{item}</div>,
    pagination: true,
    width: 300,
    height: 200,
    mode: 'default',
    loop: false,
    autoPlay: false,
    autoPlayReverse: false,
    scrollAnimationDuration: 1000,
  };

  it('should update currentIndex state when a pagination dot is pressed', () => {
    const { getByTestId } = render(<IPayCarousel {...defaultProps} />);

    const paginationDot1 = getByTestId('1');
    fireEvent.press(paginationDot1);

    expect(paginationDot1.props.style[1].backgroundColor).toBe('blue');
  });

  it('should render correctly with default props', () => {
    const { getByTestId } = render(<IPayCarousel {...defaultProps} />);
    expect(getByTestId('0')).toBeTruthy();
    expect(getByTestId('1')).toBeTruthy();
    expect(getByTestId('2')).toBeTruthy();
  });

  it('should update currentIndex state when a pagination dot is pressed', () => {
    const { getByTestId } = render(<IPayCarousel {...defaultProps} />);

    const paginationDot1 = getByTestId('1');
    fireEvent.press(paginationDot1);

    expect(paginationDot1.props.style[1].backgroundColor).toBe('blue');
  });

  it('should set the correct default index', () => {
    const { getByTestId } = render(<IPayCarousel {...defaultProps} />);

    const paginationDot0 = getByTestId('0');
    expect(paginationDot0.props.style[1].backgroundColor).toBe('blue');
  });

  it('should update currentIndex when onSnapToItem is called', () => {
    const { getByTestId } = render(<IPayCarousel {...defaultProps} />);

    fireEvent(getByTestId('0'), 'onSnapToItem', 2);

    const paginationDot2 = getByTestId('2');
    expect(paginationDot2.props.style[1].backgroundColor).toBe('gray');
  });

  it('should render without pagination if pagination prop is false', () => {
    const props = { ...defaultProps, pagination: false };
    const { queryByTestId } = render(<IPayCarousel {...props} />);

    expect(queryByTestId('0')).toBeNull();
    expect(queryByTestId('1')).toBeNull();
    expect(queryByTestId('2')).toBeNull();
  });

  it('should auto-play correctly if autoPlay prop is true', () => {
    jest.useFakeTimers();
    const props = { ...defaultProps, autoPlay: true };
    const { getByTestId } = render(<IPayCarousel {...props} />);

    jest.advanceTimersByTime(1000); // simulate the passage of time for auto-play

    const paginationDot1 = getByTestId('1');
    expect(paginationDot1.props.style[1].backgroundColor).toBe('gray');

    jest.useRealTimers();
  });

  it('should reverse auto-play direction if autoPlayReverse is true', () => {
    jest.useFakeTimers();
    const props = { ...defaultProps, autoPlay: true, autoPlayReverse: true };
    const { getByTestId } = render(<IPayCarousel {...props} />);

    jest.advanceTimersByTime(1000); // simulate the passage of time for auto-play

    const paginationDot2 = getByTestId('2');
    expect(paginationDot2.props.style[1].backgroundColor).toBe('gray');

    jest.useRealTimers();
  });
});
