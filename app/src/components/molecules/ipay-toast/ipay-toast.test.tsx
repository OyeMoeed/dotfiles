import { IPayIcon } from '@app/components/atoms';
import colors from '@app/styles/colors.const';
import { fireEvent, render } from '@testing-library/react-native';
import IPayToast from './ipay-toast.component';

describe('IPayToast', () => {
  it('renders toast correctly with the given title and subTitle variant', () => {
    // Arrange
    const testTitle = 'Test Title'; // Directly using the string value
    const testSubTitle = 'Sub Title'; // Directly using the string value
    // Act
    const { getByTestId } = render(
      <IPayToast
        testID="IPayToastId"
        title={testTitle}
        borderColor={colors.primary.primary200}
        isShowSubTitle
        subTitle={testSubTitle}
        isShowDetail
        viewText="View"
        titleColor={colors.primary.primary500}
      />
    );

    const IPayToastId = getByTestId('IPayToastId-pressable');
    fireEvent.press(IPayToastId);
  });

  it('renders toast correctly with the given Icon and variant', () => {
    // Arrange
    const testTitle = 'Test Title'; // Directly using the string value
    const substring = 'Subtitle'; // Directly using the string value
    // Act
    const { getByTestId } = render(
      <IPayToast
        testID="IPayToastId"
        title={testTitle}
        borderColor={colors.primary.primary200}
        isShowSubTitle
        subTitle={substring}
        isShowLeftIcon
        leftIcon={<IPayIcon size={24} icon="arrow-left" />}
        isShowDetail
        viewText="View"
        titleColor={colors.primary.primary500}
      />
    );

    const IPayToastId = getByTestId('IPayToastId-pressable');
    fireEvent.press(IPayToastId);
  });
});
