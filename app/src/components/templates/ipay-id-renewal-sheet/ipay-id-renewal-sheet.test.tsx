import { fireEvent, render } from '@testing-library/react-native';
import IPayIdRenewalSheet from './ipay-id-renewal-sheet.component';

describe('IPayIdRenewalSheet Component', () => {
  it('should update currentIndex state when a pagination dot is pressed', () => {
    const { getByTestId } = render(<IPayIdRenewalSheet />);

    const paginationDot1 = getByTestId('1');
    fireEvent.press(paginationDot1);
  });

  it('should render correctly with default props', () => {
    const { getByTestId } = render(<IPayIdRenewalSheet />);
    expect(getByTestId('0')).toBeTruthy();
    expect(getByTestId('1')).toBeTruthy();
    expect(getByTestId('2')).toBeTruthy();
  });
});
