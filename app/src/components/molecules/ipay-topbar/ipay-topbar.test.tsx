import images from '@app/assets/images';
import { render } from '@testing-library/react-native';
import IPayTopbar from './ipay-topbar.component';

describe('IPayTopbar', () => {
  it('renders topbar correctly with the given title and variant', () => {
    // Arrange
    const testTitle = 'Test Title'; // Directly using the string value
    const userName = 'Adam'; // Directly using the string value
    const userProfile = images.profile;
    // Act
    const { getByTestId } = render(
      <IPayTopbar testID="IPayTopbarId" captionText={testTitle} userName={userName} userProfile={userProfile} />
    );

    const IPayTopbarId = getByTestId('IPayTopbarId-base-view');
    expect(IPayTopbarId).toBeDefined();
  });
});
