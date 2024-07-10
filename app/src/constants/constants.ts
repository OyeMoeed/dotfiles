/**
 * Defines a set of constants.
 */
import Share from 'react-native-share';

const constants = {
  MOCK_API_RESPONSE: true,
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
  OTP_CELL_COUNT: 4,
  DIALER_DATA: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'],
  FORGET_PASSWORD_COMPONENTS: {
    USER_IDENTITY: 'User Identity',
    CONFIRM_OTP: 'Confirm OTP',
    CREATE_PASSCODE: 'Create Passcode',
    CONFIRM_PASSCODE: 'Confirm Passcode',
  },
  TERMS_AND_CODITIONS_DUMMY_TEXT: `“Terms and Conditions” is the document governing the contractual relationship between the provider of a service and its user. On the web, this document is often also called “Terms of Service” (ToS), “Terms of Use”, EULA (“End-User License Agreement”), “General Conditions” or “Legal Notes”.
  
The Terms and Conditions are nothing other than a contract in which the owner clarifies the conditions of use of its service. Some quick examples are the use of the content (copyright) , the rules that users must follow while interacting with one another on the website / app and, finally, rules related to the cancellation or suspension of a user’s account etc.
  
Particular emphasis should be given to the limitation of liability clauses (and disclaimers) , for example the case of malfunctions of the app or website.
The Terms and Conditions are nothing other than a contract in which the owner clarifies the conditions of use of its service. Some quick examples are the use of the content (copyright) , the rules that users must follow while interacting with one another on the website / app and, finally, rules related to the cancellation or suspension of a user’s account etc.
  
Particular emphasis should be given to the limitation of liability clauses (and disclaimers) , for example the case of malfunctions of the app or website.
The Terms and Conditions are nothing other than a contract in which the owner clarifies the conditions of use of its service. Some quick examples are the use of the content (copyright) , the rules that users must follow while interacting with one another on the website / app and, finally, rules related to the cancellation or suspension of a user’s account etc.
  
Particular emphasis should be given to the limitation of liability clauses (and disclaimers) , for example the case of malfunctions of the app or website.
The Terms and Conditions are nothing other than a contract in which the owner clarifies the conditions of use of its service. Some quick examples are the use of the content (copyright) , the rules that users must follow while interacting with one another on the website / app and, finally, rules related to the cancellation or suspension of a user’s account etc.
  
Particular emphasis should be given to the limitation of liability clauses (and disclaimers) , for example the case of malfunctions of the app or website.
The Terms and Conditions are nothing other than a contract in which the owner clarifies the conditions of use of its service. Some quick examples are the use of the content (copyright) , the rules that users must follow while interacting with one another on the website / app and, finally, rules related to the cancellation or suspension of a user’s account etc.
  
Particular emphasis should be given to the limitation of liability clauses (and disclaimers) , for example the case of malfunctions of the app or website.
The Terms and Conditions are nothing other than a contract in which the owner clarifies the conditions of use of its service. Some quick examples are the use of the content (copyright) , the rules that users must follow while interacting with one another on the website / app and, finally, rules related to the cancellation or suspension of a user’s account etc.
  
Particular emphasis should be given to the limitation of liability clauses (and disclaimers) , for example the case of malfunctions of the app or website.
The Terms and Conditions are nothing other than a contract in which the owner clarifies the conditions of use of its service. Some quick examples are the use of the content (copyright) , the rules that users must follow while interacting with one another on the website / app and, finally, rules related to the cancellation or suspension of a user’s account etc.
  
Particular emphasis should be given to the limitation of liability clauses (and disclaimers) , for example the case of malfunctions of the app or website.
  
  
The Terms and Conditions therefore, represent the document that helps in dealing with problems or preventing them in the first place. Because of that, the Terms and Conditions are fundamental in many cases in order to mount an adequate and proper defense represent the document that helps in  `,

  FAQ_ITEMS: [
    {
      question: 'Can I recover my passcode?',
      answer:
        'You cannot retrieve passwords due to safety and security reasons for the account owner. However, you can reset your password by verifying your identity.',
    },
    {
      question: 'Can I recover my passcode?',
      answer:
        'You cannot retrieve passwords due to safety and security reasons for the account owner. However, you can reset your password by verifying your identity.',
    },
    {
      question: 'Can I recover my passcode?',
      answer:
        'You cannot retrieve passwords due to safety and security reasons for the account owner. However, you can reset your password by verifying your identity.',
    },
    {
      question: 'Can I recover my passcode?',
      answer:
        'You cannot retrieve passwords due to safety and security reasons for the account owner. However, you can reset your password by verifying your identity.',
    },
    {
      question: 'Can I recover my passcode?',
      answer:
        'You cannot retrieve passwords due to safety and security reasons for the account owner. However, you can reset your password by verifying your identity.',
    },
  ],

  DUMMY_USERLOCATION: {
    district: 'Al Olaya',
    city: 'Riyadh',
    country: 'SA',
    latitude: '24.7136256',
    longitude: '46.6812928',
  },
  DIALER_ARRAY: ['1', '2', '3', '4'],
  INITIAL_TIMER: 60,
  ANIMATION_DURATIONS: {
    duration2000: 2000,
    duration1000: 1000,
    duration600: 600,
    duration500: 500,
    duration300: 300,
    duration200: 200,
    duration100: 100,
  },

  SAMPLE_DATA: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 5, name: 'Eve' },
  ],
  HELP_CENTER_TABS: ['All FAQ', 'Account', 'Top-up', 'Money Transfer', 'Others'],
  MOBILE_NUMBER_LENGTH: 10,
  IQAMA_ID_NUMBER_LENGTH: 10,
  months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  QUICK_AMOUNT_CARD: [
    { value: 50, text: '50' },
    { value: 100, text: '100' },
    { value: 500, text: '500' },
  ],
  QUICK_AMOUNT_ATM: [
    { value: 200, text: '200' },
    { value: 500, text: '500' },
    { value: 1000, text: '1000' },
  ],
  INITIAL_REGION: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  NEAREST_ATMS: [
    {
      type: 'Car',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.78825, longitude: -122.4324 },
    },
    {
      type: 'Branch',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.79725, longitude: -122.4324 },
    },
    {
      type: 'Lobby',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.78825, longitude: -122.4414 },
    },
    {
      type: 'Car',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.79725, longitude: -122.4414 },
    },
    {
      type: 'Room',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.78825, longitude: -122.4234 },
    },
    {
      type: 'Branch',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.79725, longitude: -122.4234 },
    },
    {
      type: 'Lobby',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.77925, longitude: -122.4324 },
    },
    {
      type: 'Car',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.77925, longitude: -122.4414 },
    },
    {
      type: 'Room',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.77925, longitude: -122.4234 },
    },
    {
      type: 'Branch',
      address: 'Al Takhassousi, Takassusi, Riyadh 11564',
      distance: '1.8',
      location: { latitude: 37.76925, longitude: -122.4324 },
    },
  ],
  ATM_WITHDRAWAL_TUTORIALS: [
    { id: 1, title: 'Select the instant withdrawal option from the ATM', url: 'CwFD_Eb_0Qo' },
    { id: 2, title: 'Open the app and choose the ATM option', url: 'TokPjUE9M1w' },
    { id: 3, title: 'Scan the QR Code displayed on the ATM', url: 'CwFD_Eb_0Qo' },
    { id: 4, title: 'The transaction will be processed and executed', url: 'CwFD_Eb_0Qo' },
  ],
};

export default constants;
