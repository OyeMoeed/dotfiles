import { LocalizationChannelsProps } from './localization-channels.interface';

const getLocalizationChannels = async ({ url, callback }: LocalizationChannelsProps): Promise<void> =>
  fetch(url)
    .then((response) => response.text()) // Get the response as text
    .then((data) => {
      try {
        const parsedData = JSON.parse(data).labels; // Parse the cleaned JSON
        callback(null, parsedData); // Pass parsed data to i18next
      } catch (error) {
        callback(error, false); // Handle JSON parsing errors
      }
    })
    .catch((error) => callback(error, false)); // Handle fetch errors

export default getLocalizationChannels;
