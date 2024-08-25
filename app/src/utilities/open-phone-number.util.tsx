import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { Linking } from 'react-native';

/**
 * Opens a phone number URL if possible.
 *
 * @param {string} phoneNumber - The phone number to call.
 * @return {Promise<void>} - A promise that resolves when the URL is handled or rejects with an error.
 */
const openPhoneNumber = async (phoneNumber: string, colors, showToast, localizationText) => {
  const url = `tel:${phoneNumber}`;

  const renderToast = (title: string, subTitle?: string) => {
    showToast({
      title,
      subTitle,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  try {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      renderToast(localizationText.ERROR.PHONE_NUMBER_NOT_AVAILABE);
    } else {
      await Linking.openURL(url);
    }
  } catch (error) {
    renderToast(localizationText.ERROR.FAILED_TO_OPEN_NUMBER, error?.message);
  }
};

export default openPhoneNumber;
