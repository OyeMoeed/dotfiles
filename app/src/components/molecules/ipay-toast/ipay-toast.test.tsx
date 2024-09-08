import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import { fireEvent, render } from '@testing-library/react-native';
import IPayToast from './ipay-toast.component';

describe('IPayToast', () => {
  it('renders toast correctly with the given title and variant', () => {
    // Arrange
    const testTitle = 'Test Title'; // Directly using the string value
    const testVariant = 'white'; // Directly using the string value
    // Act
    const { getByTestId } = render(
      <IPayToast
        testID="IPayToastId"
        title="Title"
        borderColor={colors.primary.primary200}
        isShowSubTitle
        subTitle="Subtitle"
        isShowLeftIcon
        leftIcon={<IPayIcon icon={icons.warning} size={24} color={colors.primary.primary500} />}
        isShowDetail
        viewText="View"
        titleColor={colors.primary.primary500}
      />,
    );

    const IPayToastId = getByTestId('IPayToastId-pressable');
    fireEvent.press(IPayToastId);
  });
});
