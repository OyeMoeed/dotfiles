import { fireEvent, render } from '@testing-library/react-native';
import IPayRearrangeSheet from './ipay-re-arrange-sheet.component';

// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => {
  return () => ({
    Identity_Verification: 'Identity Verification',
    Identity_Discription: 'Identity Description',
    verify: 'Verify',
  });
});

describe('IPayRearrangeSheet', () => {
  it('renders correctly with the given RearrangeSheet', () => {
    // Act
    const { getByTestId } = render(<IPayRearrangeSheet testID="IPayRearrangeSheet" />);

    const isShowIcon = getByTestId('IPayRearrangeSheet-base-view');
    fireEvent.press(isShowIcon);
  });
});
