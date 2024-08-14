import images from '@app/assets/images';
import useTheme from '@app/styles/hooks/theme.hook';
import { render } from '@testing-library/react-native';
import IPayMerchantCard from './ipay-merchant-card.component';

jest.mock('@app/styles/hooks/theme.hook');

describe('IPayMerchantCard', () => {
  const mockTheme = {
    colors: {
      primary: {
        primary800: '#123456',
      },
      natural: {
        natural900: '#987654',
      },
    },
  };

  const merchantItem = {
    image: images.placeholderImage,
    title: 'Test Merchant',
  };

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(mockTheme);
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<IPayMerchantCard testID="merchant-card" item={merchantItem} />);
    const merchantCard = getByTestId('merchant-card');
    expect(merchantCard).toBeDefined();
  });

  it('displays the correct image', () => {
    const { getByTestId } = render(<IPayMerchantCard testID="merchant-card" item={merchantItem} />);
    const imageComponent = getByTestId('merchant-card-image');
    expect(imageComponent.props.image).toEqual(merchantItem.image);
  });

  it('displays the placeholder image when no image is provided', () => {
    const { getByTestId } = render(<IPayMerchantCard testID="merchant-card" item={{ title: 'No Image Merchant' }} />);
    const imageComponent = getByTestId('merchant-card-image');
    expect(imageComponent.props.image).toEqual(images.placeholderImage);
  });

  it('displays the correct title', () => {
    const { getByText } = render(<IPayMerchantCard testID="merchant-card" item={merchantItem} />);
    const titleText = getByText(merchantItem.title);
    expect(titleText).toBeDefined();
  });

  it('applies styles with the correct theme colors', () => {
    const { getByTestId } = render(<IPayMerchantCard testID="merchant-card" item={merchantItem} />);
    const cardContainer = getByTestId('merchant-card');
    const imageContainer = getByTestId('merchant-card-image-container');

    const styles = cardContainer.props.style;
    const imageStyles = imageContainer.props.style;

    expect(styles.backgroundColor).toEqual(mockTheme.colors.primary.primary800);
    expect(imageStyles.borderColor).toEqual(mockTheme.colors.natural.natural900);
  });
});
