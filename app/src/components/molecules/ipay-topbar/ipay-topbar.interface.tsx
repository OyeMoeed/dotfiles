import { variants } from '@app/utilities/enums.util';
import { ImageProps, TextStyle, ViewStyle } from 'react-native';

/**
 * Props for the RNList component.
 */
export interface IPayTopbarProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;
  /**
   * The caption Text.
   */
  captionText?:string;
  /**
   * user Name.
   */
  userName?:string;
   /**
   * user Profile.
   */
  userProfile?:string;

}