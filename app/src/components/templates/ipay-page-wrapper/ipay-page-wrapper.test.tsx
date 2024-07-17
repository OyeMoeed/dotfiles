import { IPayImage, IPayView } from '@app/components/atoms';
import { IPayHeader } from '@app/components/molecules';
import { render } from '@testing-library/react-native';
import IPayPageWrapper from './ipay-page-wrapper.component';

// Mock assets
jest.mock('@app/assets/images', () => ({
  logo: 'logo-image', // replace with actual image component if needed
}));

// Mock styles
jest.mock('./ipay-page-wrapper.style', () => () => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyles: {
    width: 100,
    height: 50,
  },
}));

describe('IPayPageWrapper Component', () => {
  test('renders correctly with children', () => {
    const { getByTestId, getByText } = render(
      <IPayPageWrapper testID="test">
        <IPayHeader />
        <IPayImage image="sample-image" />
        <IPayPageWrapper>
          <IPayView />
        </IPayPageWrapper>
      </IPayPageWrapper>,
    );

    // Check if the main container is rendered
    const mainContainer = getByTestId('test-page-wrapper-safe-area-view-linear-gradient');
    expect(mainContainer).toBeTruthy();

    // Check if the children are rendered
    const header = getByTestId('test-page-wrapper-safe-area-view-linear-gradient');
    expect(header).toBeTruthy();
  });

  test('renders logo in the header', () => {
    const { getByTestId } = render(
      <IPayPageWrapper testID="test">
        <IPayPageWrapper>
          <IPayHeader />
        </IPayPageWrapper>
      </IPayPageWrapper>,
    );

    const logoImage = getByTestId('test-page-wrapper-safe-area-view-linear-gradient');
    expect(logoImage).toBeTruthy();
  });

  test('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <IPayPageWrapper testID="test" style={customStyle}>
        <IPayView />
      </IPayPageWrapper>,
    );

    const mainContainer = getByTestId('test-page-wrapper-safe-area-view-linear-gradient');
    expect(mainContainer.props.style).toContainEqual(customStyle);
  });
});
