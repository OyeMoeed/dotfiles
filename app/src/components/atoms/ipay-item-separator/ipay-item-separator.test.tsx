import { render } from '@testing-library/react-native';
import IPayItemSeparator from './ipay-item-separator.component';
import { IPayItemSeparatorProps } from './ipay-item-separator.interface';

// Mock the IPayView component
jest.mock('../ipay-view/ipay-view.component', () => {
  return (props: any) => <div {...props} />;
});

describe('IPayItemSeparator', () => {
  const defaultProps: IPayItemSeparatorProps = {
    testID: 'test-separator',
    itemSeparatorStyle: { backgroundColor: 'red' },
  };

  it('renders correctly with default props', () => {
    const { getByTestId } = render(<IPayItemSeparator {...defaultProps} />);
    const separator = getByTestId('test-separator-item-separator');

    expect(separator).toBeTruthy();
  });

  it('applies the correct styles', () => {
    const { getByTestId } = render(<IPayItemSeparator {...defaultProps} />);
    const separator = getByTestId('test-separator-item-separator');

    expect(separator.props.style).toContainEqual({ backgroundColor: 'red' });
  });

  it('renders with custom itemSeparatorStyle', () => {
    const customStyle = { backgroundColor: 'blue', height: 2 };
    const { getByTestId } = render(<IPayItemSeparator {...defaultProps} itemSeparatorStyle={customStyle} />);
    const separator = getByTestId('test-separator-item-separator');

    expect(separator.props.style).toContainEqual(customStyle);
  });
});
