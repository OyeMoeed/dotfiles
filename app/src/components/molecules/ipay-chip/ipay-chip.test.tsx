import { States as MockedEnum, States } from '@app/utilities/enums.util';
import { render } from '@testing-library/react-native';
import IPayChip from './ipay-chip.component';

// Import the mocked enum

// Mock the inputVariants enum
jest.mock('@app/utilities/enums.util', () => ({
  States: {
    WARNING: 'warning',
    NEUTRAL: 'neutral',
    SUCCESS: 'success',
    SEVERE: 'severe',
    NATURAL: 'natural',
    COLORED: 'colored',
  },
}));

describe('IPayChip', () => {
  it('renders correctly with textValue and imageSource', () => {
    const { getByTestId, getByText } = render(
      <IPayChip
        testID="chipTest-view-chip"
        textValue="Sample Chip"
        imageSource="https://i.ibb.co/7WxDcTH/Avatar-image-2.png"
        variant={MockedEnum.NATURAL}
      />,
    );

    expect(getByTestId('chipTest-view-chip-base-view')).toBeTruthy();
    expect(getByText('Sample Chip')).toBeTruthy();
  });

  it('renders correctly without imageSource', () => {
    const { queryByTestId } = render(
      <IPayChip testID="chipTest-view-chip" textValue="Sample Chip" variant={MockedEnum.NATURAL} />,
    );

    expect(queryByTestId('chipImage')).toBeNull();
  });

  it('applies the correct styles based on variant', () => {
    const { getByTestId } = render(
      <IPayChip testID="chipTest-view-chip" textValue="Test Chip" variant={States.SUCCESS} />,
    );

    const chipElement = getByTestId('chipTest-view-chip-base-view');

    // Flatten styles array
    const flattenedStyles = [].concat(...chipElement.props.style);

    expect(flattenedStyles).toContainEqual(
      expect.objectContaining({
        backgroundColor: expect.any(String),
      }),
    );
  });

  it('renders image correctly when imageSource is provided', () => {
    const imageSource = { uri: 'https://i.ibb.co/7WxDcTH/Avatar-image-2.png' };
    const { getByTestId } = render(
      <IPayChip testID="chipTest-image-view-chip" textValue="Test Chip" imageSource={imageSource} />,
    );

    const imageElement = getByTestId('chipTest-image-view-chip-base-view');

    expect(imageElement).toBeTruthy();
  });
  it('renders without icon when isShowIcon is false', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <IPayChip testID="showIcon-view-chip" textValue="Test Chip" isShowIcon={false} />,
    );

    const chipElement = getByTestId('showIcon-view-chip-base-view');
    const textElement = getByText('Test Chip');
    const iconElement = queryByTestId('shield-icon');

    expect(chipElement).toBeTruthy();
    expect(textElement).toBeTruthy();
    expect(iconElement).toBeNull();
  });
  it('renders correctly with default props', () => {
    const { getByTestId, getByText, queryByTestId } = render(
      <IPayChip testID="default-view-chip" textValue="Test Chip" />,
    );

    const chipElement = getByTestId('default-view-chip-base-view');
    const textElement = getByText('Test Chip');
    const iconElement = queryByTestId('shield-icon');

    expect(chipElement).toBeTruthy();
    expect(textElement).toBeTruthy();
  });
});
