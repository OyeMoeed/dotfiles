import { BASE_URL } from 'react-native-config';

const baseUrl = BASE_URL || 'https://uat.alinmapay.com.sa/v2/alinmapay';

const LOCALIZATION_URLS = {
  getLocalizationChannelsUrl: `${baseUrl}/localization/channels/PAYC/labels/i18n?locale={{lng}}`,
};

export default LOCALIZATION_URLS;
