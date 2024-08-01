import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNText component.
 */
export interface IPayLatestOfferCardProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;
  /**
   * object types receive from api
   */
  offer?: {
    imageUrlEn: string;
    titleEn: string;
    termsEn: string;
    termsDetailsEn: string;
  } | null;
  /**
   * indicator of last element in a list
   */
  isLastItem?: boolean;
  /**
   * prop for handling container styles
   */
  containerStyle?: StyleProp<ViewStyle>;
  offStyles?: StyleProp<TextStyle>;
  /**
   * prop for handling offer image styles
   */
  offerImageStyle?: ImageStyle;
  /**
   * props for handling separator image styles
   */
  lineImageStyle?: ImageStyle;
  /**
   * prop for handling child container style of component
   */
  childContainerStyle?: StyleProp<ViewStyle>;
  /**
   * props for handling interaction
   */
  onPress?: () => void;
  /**
   * props for showing special offer chip
   */
  isSpecialOffer?: boolean;
}
