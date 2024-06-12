/**
 * Defines a set of constants.
 */
import Share from 'react-native-share';

const constants = {
  ENCRYPTIONS_KEYS: [],
  IDLE_SCREEN_WIDTH: 375,
  IDLE_SCREEN_HEIGHT: 812,
  XS_MAX_SCREEN_WIDTH: 414,
  XS_MAX_SCREEN_HEIGHT: 896,
  NETWORK_CONNECTION_ERROR: 408,
  CAROUSEL_DUMMY_DATA: [
    { color: 'red' },
    { color: 'blue' },
    { color: 'green' },
    { color: 'yellow' },
    { color: '#0073AB' },
    { color: 'orange' },
  ],
  BUTTON_TYPES: {
    PRIMARY: 'primary',
    OUTLINE: 'outline',
    LINK_BUTTON: 'link-button',
  },
  SHARE_OPTION: {
    subject: 'Wa',
    message: 'some message',
    title: 'AlinmaPay',
    url: 'AlinmaPay',
    social: Share.Social.WHATSAPP,
    whatsAppNumber: '9199999999', // country code + phone number
    filename: 'test', // only for base64 file in Android
  },
  SAMPLE_DATA: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 5, name: 'Eve' },
  ],
};

export default constants;
