import { StyleProp, ViewStyle } from 'react-native';

export interface IPayNoResultProps {
  /**
   * testID for the component to test the element.
   */
  testID?: string;

  /**
   * message for the component display when no result is available.
   */
  message?: string;

  /**
   * icon name to change icon.
   */
  icon?: string;

  /**
   * showIcon to display icon.
   */
  showIcon?: boolean;

  /**
   * showEmptyBox to display empty box image.
   */
  showEmptyBox?: boolean;

  /**
   * displayInRow to display icon and text in row.
   */
  displayInRow?: boolean;

  /**
   * iconColor to customize color for icon.
   */
  iconColor?: string;

  /**
   * textColor to customize message text color.
   */
  textColor?: string;

  /**
   * containerStyle to provide custom style to container.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * size of icon.
   */
  iconSize?: number;
  iconViewStyles?: StyleProp<ViewStyle>;
}
