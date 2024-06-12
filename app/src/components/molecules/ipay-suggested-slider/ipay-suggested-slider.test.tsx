import { render } from '@testing-library/react-native';
import IPaySuggestedSlider from './ipay-suggested-slider.component';


// Mock the useLocalization hook
jest.mock('@app/localization/hooks/localization.hook', () => {
  return () => ({
    Identity_Verification: 'Identity Verification',
    Identity_Discription: 'Identity Description',
    verify: 'Verify',
  });
});

describe('IPaySuggestedSlider', () => {
  it('renders topbar correctly with the given title and variant', () => {
  
    // Act
    const { getByTestId } = render(
      <IPaySuggestedSlider
        testID="IPaySuggestedSliderId"
        onPressUp={() => console.log('onPress')}
        onPressDown={() => console.log('onPress Down')}
      />,
    );

    const IPaySuggestedSliderId = getByTestId('IPaySuggestedSliderId-base-view');
    expect(IPaySuggestedSliderId).toBeDefined();
  });
});
