import { fireEvent, render } from '@testing-library/react-native';
import IPayBannerAnimation from './ipay-banner-animation.component';

// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => {
  return () => ({
    Identity_Verification: 'Identity Verification',
    Identity_Discription: 'Identity Description',
    verify: 'Verify',
  });
});

describe('RNCounterButton', () => {
  it('renders correctly with the given Counter Button', () => {
    // Act
    const { getByTestId } = render(
      <IPayBannerAnimation
        onPressUp={() => console.log('pressedUp')}
        testID="isCountDownButton"
        onPressDown={() => console.log('PressedDown')}
        onVerify={()=>console.log('overlay')}
      />,
    );

    const isShowIcon = getByTestId('isCountDownButton-base-view');
    fireEvent.press(isShowIcon);
  });
});
