/**
 * Defines a set of constants.
 */
import icons from '@app/assets/icons';
import images from '@app/assets/images';
import { BillStatus, CardTypes } from '@app/utilities/enums.util';
import Share from 'react-native-share';

const constants = {
  MOCK_API_RESPONSE: false,
  ENCRYPTIONS_KEYS: [],
  IDLE_SCREEN_WIDTH: 375,
  RESTART_DELAY_MILISECONDS: 100,
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
  ATM_CARD_DATA: { title: 'Adam Ahmed', cardNumber: '2222 3333 4444 5555', cardType: 'Signature Prepaid Card' },
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
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.78825, longitude: -122.4324 },
    },
    {
      type: 'Branch',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.79725, longitude: -122.4324 },
    },
    {
      type: 'Lobby',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.78825, longitude: -122.4414 },
    },
    {
      type: 'Car',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.79725, longitude: -122.4414 },
    },
    {
      type: 'Room',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.78825, longitude: -122.4234 },
    },
    {
      type: 'Branch',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.79725, longitude: -122.4234 },
    },
    {
      type: 'Lobby',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.77925, longitude: -122.4324 },
    },
    {
      type: 'Car',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.77925, longitude: -122.4414 },
    },
    {
      type: 'Room',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
      distance: '1.8',
      location: { latitude: 37.77925, longitude: -122.4234 },
    },
    {
      type: 'Branch',
      title: 'Al Takhassousi, Takassusi, Riyadh 11564',
      address: "Irqah Governerate St, 'Irqah, Riyadh 12543, Saudi Arabia",
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
  ATM_WITHDRAW_SUCCESS_DATA: [
    { id: 1, title: 'Transaction Type', subTitle: 'ATM Withdrawal', icon: '' },
    { id: 2, title: 'Ref. Number', subTitle: '21523325', icon: icons.copy },
    { id: 3, title: 'Transaction Date', subTitle: '16:20 - 08/03/2024', icon: '' },
  ],
  CITIES: [
    { id: 1, title: 'Riyadh' },
    { id: 2, title: 'Jeddah' },
    { id: 3, title: 'Makkah' },
    { id: 4, title: 'Madinah' },
    { id: 5, title: 'Dammam' },
    { id: 6, title: 'Al-Khobar' },
    { id: 7, title: 'Taif' },
    { id: 8, title: 'Tabuk' },
    { id: 9, title: 'Buraidah' },
    { id: 10, title: 'Najran' },
    { id: 11, title: 'Jizan' },
    { id: 12, title: 'Hail' },
    { id: 13, title: 'Abha' },
    { id: 14, title: 'Yanbu' },
    { id: 15, title: 'Khobar' },
    { id: 16, title: 'Qatif' },
    { id: 17, title: 'Ras Tanura' },
    { id: 18, title: 'Khobar' },
    { id: 19, title: 'Dhahran' },
    { id: 20, title: 'Qassim' },
    { id: 21, title: 'Jubail' },
    { id: 22, title: 'Bisha' },
    { id: 23, title: 'Al Kharj' },
    { id: 24, title: 'Arar' },
    { id: 25, title: 'Al Bahah' },
    { id: 26, title: 'Sakaka' },
    { id: 27, title: 'Jeddah' },
    { id: 28, title: 'Riyadh' },
    { id: 29, title: 'Makkah' },
    { id: 30, title: 'Madinah' },
  ],

  MOCK_CVV: '123',
  DUMMY_USER_CARD_DETAILS: {
    CARD_TYPE: CardTypes.SIGNATURE,
    CARD_LAST_FOUR_DIGIT: '1111',
    CARD_TYPE_NAME: 'Classic Debit Card',
    CARD_HOLDER_NAME: 'Adam Ahmed',
  },
  TRANSACTION_FILTERS: ['All', 'Paid', 'Refund', 'Rejected', 'Pending'],
  GIFT_CARD_DETAILS: [
    { id: 1, title: 'Status', subTitle: 'Unopened', icon: '' },
    { id: 2, title: 'Receiver Name', subTitle: 'Ahmed Mohamed', icon: '' },
    { id: 3, title: 'Receiver Number', subTitle: '+966 23583458735', icon: '' },
    { id: 4, title: 'Amount', subTitle: '400 SAR', icon: '' },
    { id: 5, title: 'Occasion', subTitle: 'New Baby', icon: '' },
    { id: 6, title: 'Ref. Number', subTitle: 'FTA35346', icon: icons.copy },
    { id: 7, title: 'Transfer Date', subTitle: '2024-03-08T16:20:00', icon: '' },
  ],
  BANK_DETAILS: {
    bankName: 'Saudi National Bank',
    title: 'Floyd Miles',
    accountNumber: 'SA380019000500000000263180002',
    icon: images.snb,
  },
  BENEFICIARY_DETAILS: [
    { title: 'Amount', subTitle: 3000 },
    { title: 'Beneficiary Nick Name ', subTitle: 'Miles', icon: '' },
    { title: 'Reason of Transfer', subTitle: 'Family and friends', icon: '' },
    { title: 'Fast conversion by', subTitle: 'Sarie', icon: images.sarie },
    { title: 'Note', subTitle: 'Hello My Dear friend hope you are doing well', icon: '' },
    { title: 'Ref. Number', subTitle: 'FTA35346', icon: icons.copy },
  ],
  OTHER_BILL_TYPES: [
    { id: 1, title: 'Government Payments (MOI)', icon: images.moiLogo },
    { id: 2, title: 'Traffic Violation', icon: icons.driving },
  ],
};
const SUPPORTED_CARD = ['visa', 'master', 'madaWhiteBG'];
const CARDS_MOCK_DATA = [
  {
    key: 1,
    cardType: 'master-card',
    text: 'Adam Ahmed',
    cardNumber: '7868 7646 0988 1250',
    subtitle: '**** **** **** 1250',
    expired: false,
  },
  {
    key: 3,
    cardType: 'master-card',
    text: 'Adam Ahmed',
    cardNumber: '7868 7646 0988 1250',
    subtitle: '**** **** **** 4400',
    expired: false,
  },
  {
    key: 2,
    cardType: 'mada',
    text: 'International Card',
    cardNumber: '7868 7646 0988 4400',
    subtitle: '**** **** **** 4400',
    expired: true,
  },
];

export { CARDS_MOCK_DATA, SUPPORTED_CARD };

const CARD_DATA = {
  classic: {
    features: [
      'Instant card issuance through the App.',
      'Accepted by Visa & Mada network.',
      'Free for life Card.',
      'Added to Apple Pay & Mada Pay.',
    ],
    fees: [
      { description: 'Annual fee', fee: '0 SAR' },
      { description: 'Replacement Fee', fee: '0 SAR' },
      { description: 'International transaction Fee', fee: '2.2 %' },
      { description: 'Dispute fee', fee: '50 SAR' },
    ],
  },
  platinum: {
    features: [
      'Instant card issuance through the App.',
      'Free card issuance Fee for the first Card.',
      'Instant Cashback 1.2% with no Cap.',
      'Competitive fee for international transactions',
      'Access to more than 25 international lounges via Dragon Pass',
      'Visa extended warrantee.',
    ],
    fees: [
      { description: 'Annual fee', fee: '0 SAR' },
      { description: 'Replacement Fee', fee: '30 SAR' },
      { description: 'International transaction Fee', fee: '1.9 %' },
      { description: 'Dispute fee', fee: '50 SAR' },
    ],
  },
  signature: {
    features: [
      'Instant card issuance through the App.',
      'Instant Cashback 1.6% with no Cap.',
      'Competitive fee for international transactions',
      'Access to more than 1000 international lounges via Dragon Pass',
      'Visa extended warrantee.',
    ],
    fees: [
      { description: 'Annual fee', fee: '300 SAR' },
      { description: 'Replacement Fee', fee: '150 SAR' },
      { description: 'International transaction Fee', fee: '1.85 %' },
      { description: 'Dispute fee', fee: '50 SAR' },
    ],
  },
};

const CARD_DATA_PHYSICAL_CARD = {
  classic: {
    features: [
      'Instant card issuance through the App.',
      'Accepted by Visa & Mada network.',
      'Free for life Card.',
      'Added to Apple Pay & Mada Pay.',
      'Annual fee: 0 SAR.',
      'Replacement fee: 0 SAR.',
      'International transaction fee: 2.2%.',
      'Dispute fee: 50 SAR.',
    ],
    fees: [
      { description: 'Issuance Fee', fee: '120 SAR' },
      { description: 'Replacement Fee', fee: '32 SAR' },
      { description: 'Annual Fee', fee: '48 SAR' },
      { description: 'Renewal Fee', fee: '12 SAR' },
      { description: 'International transaction Fee', fee: '9 SAR' },
    ],
  },
  platinum: {
    features: [
      'Instant card issuance through the App.',
      'Free card issuance Fee for the first Card.',
      'Instant Cashback 1.2% with no Cap.',
      'Competitive fee for international transactions',
      'Access to more than 25 international lounges via Dragon Pass',
      'Visa extended warrantee.',
    ],
    fees: [
      { description: 'Annual fee', fee: '0 SAR' },
      { description: 'Replacement Fee', fee: '30 SAR' },
      { description: 'International transaction Fee', fee: '1.9 %' },
      { description: 'Dispute fee', fee: '50 SAR' },
    ],
  },
  signature: {
    features: [
      'Instant card issuance through the App.',
      'Free card issuance Fee for the first Card.',
      'Instant Cashback 1.6% with no Cap.',
      'Competitive fee for international transactions',
      'Access to more than 1000 international lounges via Dragon Pass',
      'Visa extended warrantee.',
    ],
    fees: [
      { description: 'Annual fee', fee: '300 SAR' },
      { description: 'Replacement Fee', fee: '150 SAR' },
      { description: 'International transaction Fee', fee: '1.85 %' },
      { description: 'Dispute fee', fee: '50 SAR' },
    ],
  },
};
const ANIMATION_DURATION = {
  duration2000: 2000,
  duration1000: 1000,
  duration600: 600,
  duration500: 500,
  duration300: 300,
  duration200: 200,
  duration100: 100,
};
const CUSTOM_SNAP_POINT = {
  EXTRA_SMALL: ['1%', '35%'],
  SMALL: ['1%', '45%'],
  MEDIUM: ['1%', '50%'],
  LARGE: ['1%', '70%'],
  EXTRA_LARGE: ['1%', '95%'],
  FULL: ['1%', '100%'],
};

const SNAP_POINTS = {
  X_SMALL: ['1%', '35%'],
  SMALL: ['1%', '45%'],
  MEDIUM: ['1%', '50%'],
  MID_LARGE: ['1%', '70%'],
  MEDIUM_LARGE: ['1%', '95%'],
  LARGE: ['1%', '100%'],
};

// Countries data

const COUNTRIES_DATA = [
  { id: 1, text: 'Saudi Arabia' },
  { id: 2, text: 'Egypt' },
  { id: 3, text: 'United Arab Emirates' },
  { id: 4, text: 'Kuwait' },
  { id: 5, text: 'Bahrain' },
  { id: 6, text: 'Oman' },
  { id: 7, text: 'Qatar' },
  { id: 8, text: 'Jordan' },
  { id: 9, text: 'Lebanon' },
  { id: 10, text: 'Iraq' },
];
// Delivery Types data
export const TRANSFER_METHOD_DATA = [
  { id: 1, text: 'Digital Wallet' },
  { id: 2, text: 'Bank Transfer' },
  { id: 3, text: 'Cash Pickup' },
];

// Currencies data
export const CURRENCIES_DATA = [
  { id: 1, text: 'EGP' },
  { id: 2, text: 'USD' },
  { id: 3, text: 'SAR' },
];

const DURATIONS = {
  VERY_LONG: 2000,
  LONG: 1000,
  MEDIUM_LONG: 600,
  MEDIUM: 500,
  SHORT_MEDIUM: 300,
  SHORT: 200,
  VERY_SHORT: 100,
};
const PROGRESS_INCREMENT_FACTOR = {
  LONG: 0.1,
  MEDIUM: 0.833,
  SHORT: 0.5,
};
const INITIAL_TIMER = 120;

const ACTIVE_SADAD_BILLS = [
  {
    id: 1,
    billTitle: 'My Electricity Bill',
    vendor: '123 - Saudi electricity co.',
    vendorIcon: images.saudi_electricity_co,
    billAmount: '300',
    dueDate: '20/03/2024',
    billStatus: BillStatus.UNPAID,
    selected: false,
  },
  {
    id: 2,
    billTitle: 'Mobile Bill',
    vendor: '345 - Saudi Telecom - STC',
    vendorIcon: images.saudi_telecom_stc,
    billAmount: '400',
    dueDate: '20/03/2024',
    billStatus: BillStatus.UNPAID,
    selected: false,
  },
  {
    id: 3,
    billTitle: 'Wife Mobile Bill',
    vendor: '654 - Zain',
    vendorIcon: images.zain,
    billAmount: '340',
    dueDate: '14/03/2024',
    billStatus: BillStatus.UNPAID,
    selected: false,
  },
  {
    id: 4,
    billTitle: 'License',
    vendor: '574 - Madinah regional mun..',
    vendorIcon: images.madinah_regional_mun,
    billAmount: '0.00',
    dueDate: '20/03/2024',
    billStatus: BillStatus.PAID,
    selected: false,
  },
  {
    id: 5,
    billTitle: 'Insurance',
    vendor: '987 - Tawuniy',
    vendorIcon: images.tawuniy,
    billAmount: '0.00',
    dueDate: '20/03/2024',
    billStatus: BillStatus.PAID,
    selected: false,
  },
];

const TRAFFIC_VIOLATIONS = [
  //TODO will be replaced by API data, for now its dummy data
  {
    id: 1,
    billTitle: 'Traffic violation',
    violation_no: '124355653',
    vendorIcon: images.traffic,
    billAmount: '300',
    dueDate: '20/03/2024',
    billStatus: BillStatus.UNPAID,
    selected: false,
  },
  {
    id: 2,
    billTitle: 'Traffic violation',
    violation_no: '124355653',
    vendorIcon: images.traffic,
    billAmount: '400',
    dueDate: '20/03/2024',
    billStatus: BillStatus.UNPAID,
    selected: false,
  },
  {
    id: 3,
    billTitle: 'Traffic violation',
    violation_no: '124355653',
    vendorIcon: images.traffic,
    billAmount: '340',
    dueDate: '14/03/2024',
    billStatus: BillStatus.UNPAID,
    selected: false,
  },
];

const INACTIVEACTIVE_SADAD_BILLS = [
  {
    id: 1,
    billTitle: 'My Mobile',
    vendor: 'Zain',
    vendorIcon: images.zain,
    billAmount: '300',
    dueDate: '14/03/2024',
    billStatus: BillStatus.UNPAID,
    selected: false,
  },
];

const WALLET_TIERS = {
  BASIC: 'B',
  GOLD: 'G',
};

const CONTACT_NUMBER = '(+966) 920000670';
const VOILATOR_ID = '22321313';
const ALINMA_REFERENCE_NUM = '#IPAY789';
const SNAP_POINT = {
  X_SMALL: ['35%', '90%'],
  XS_SMALL: ['40%', '90%'],
  SMALL: ['45%', '90%'],
  MEDIUM: ['50%', '90%'],
  MEDIUM_LARGE: ['95%', '90%'],
  LARGE: ['100%', '100%'],
};

export {
  ACTIVE_SADAD_BILLS,
  ALINMA_REFERENCE_NUM,
  ANIMATION_DURATION,
  CARD_DATA,
  CARD_DATA_PHYSICAL_CARD,
  CONTACT_NUMBER,
  COUNTRIES_DATA,
  CUSTOM_SNAP_POINT,
  DURATIONS,
  INACTIVEACTIVE_SADAD_BILLS,
  INITIAL_TIMER,
  PROGRESS_INCREMENT_FACTOR,
  SNAP_POINT,
  SNAP_POINTS,
  TRAFFIC_VIOLATIONS,
  VOILATOR_ID,
  WALLET_TIERS,
};

export default constants;
