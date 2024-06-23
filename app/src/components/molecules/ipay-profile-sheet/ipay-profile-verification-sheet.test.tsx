import { fireEvent, render } from '@testing-library/react-native';
import IPayProfileVerificationSheet from './ipay-profile-verification-sheet.component';

// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => {
  return () => ({
    Identity_Verification: 'Identity Verification',
    Identity_Discription: 'Identity Description',
    verify: 'Verify',
  });
});


describe('ProfileVerificationSheet', () => {
  it('renders correctly with the given Counter Button', () => {
    // Act
    const { getByTestId } = render(
      <IPayProfileVerificationSheet
        onPress={() => console.log('pressedUp')}
        testID="ProfileVerificationSheet"
        verified={true}
      />,
    );

    const isShowIcon = getByTestId('ProfileVerificationSheet-base-view');
    fireEvent.press(isShowIcon);
  });
});
