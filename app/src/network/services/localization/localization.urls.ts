import { BASE_URL } from 'react-native-config';

const LOCALIZATION_URLS = {
  getLocalizationChannelsUrl: `${BASE_URL}/localization/channels/PAYC/labels/i18n?locale={{lng}}`,
};

export default LOCALIZATION_URLS;
